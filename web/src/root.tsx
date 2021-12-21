import React from "react";
import type {
  ErrorBoundaryComponent,
  LoaderFunction,
  MetaFunction,
  LinksFunction,
} from "remix";
import { useCatch, useLoaderData } from "remix";
import { Outlet } from "react-router-dom";
// eslint-disable-next-line import/extensions,import/no-unassigned-import
import "focus-visible/dist/focus-visible.min.js";
import normalizeUrl from "normalize.css";
import stylesUrl from "./styles/global.css";
import AppCss from "./styles/App.css";
import ColorCSS from "./styles/Colors.css";
import ComponentCSS from "./styles/Components.css";
import ModulesCSS from "./styles/modules.css";
import Document from "~/components/Document";
import Layout from "~/components/Layout";
import {
  getSiteConfig,
  getSiteFavicons,
} from "~/utils/sanity/actions/siteConfig";
import { usePreviewSubscription } from "~/utils/sanity/utils";
import { getPage } from "~/utils/sanity/actions/page";

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: normalizeUrl },
    { rel: "stylesheet", href: AppCss },
    { rel: "stylesheet", href: ColorCSS },
    { rel: "stylesheet", href: ComponentCSS },
    { rel: "stylesheet", href: ModulesCSS },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
    },
  ];
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const requestUrl = new URL(request?.url);
  const preview =
    requestUrl?.searchParams?.get("preview") === SANITY_PREVIEW_SECRET;

  const favicons = await getSiteFavicons(preview, SANITY_API_TOKEN);
  const siteConfig = await getSiteConfig(preview, SANITY_API_TOKEN);
  const page = await getPage(params?.slug, preview, SANITY_API_TOKEN);

  return {
    environment: NODE_ENV,
    preview,
    favicons,
    siteConfig,
    page,
  };
};

export const meta: MetaFunction = ({ data }: { data: any | undefined }) => {
  if (!data) {
    return {
      title: "Portfolio",
    } as any;
  }

  const { siteConfig, page } = data;

  const title = `${siteConfig.data.name} | ${page.data.title}`;
  const robots = page.data.disallowRobots ? "noindex,nofollow" : "index,follow";

  return {
    title,
    robots,
    googlebot: robots,
    description: page.data.description,
    "og:title": title,
    "og:description": page.description,
    "og:image": page.data.openGraphImages.map((i) => i.url),
    "og:image:alt": page.data.openGraphImages.map((i) => i.alt || ""),
    "og:image:width": page.data.openGraphImages.map((i) => i.width),
    "og:image:height": page.data.openGraphImages.map((i) => i.height),
  };
};

export default function App() {
  const { environment, preview, favicons, siteConfig, page } = useLoaderData();
  const { data: siteConfigData } = usePreviewSubscription(siteConfig.query, {
    preview,
    params: siteConfig.queryParams,
    initialData: siteConfig.data,
  });
  const { data: pageData } = usePreviewSubscription(page.query, {
    preview,
    params: page.queryParams,
    initialData: page.data,
  });

  return (
    <Document
      environment={environment}
      title={siteConfig?.name || "Portfolio"}
      lang={siteConfig?.lang || "en"}
      favicons={favicons}
    >
      <Layout preview={preview} siteConfig={siteConfigData}>
        <Outlet context={[pageData, siteConfigData]} />
      </Layout>
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  switch (caught.status) {
    case 401:
    case 404: {
      return (
        <Document title={`${caught.status} ${caught.statusText}`}>
          <h1>
            {caught.status} {caught.statusText}
          </h1>
        </Document>
      );
    }
    default: {
      throw new Error(
        `Unexpected caught response with status: ${caught.status}`
      );
    }
  }
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
      <p>An error has occurred, please try again later!</p>
    </Document>
  );
};
