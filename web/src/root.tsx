import React from "react";
import type {
  ErrorBoundaryComponent,
  LoaderFunction,
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

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: normalizeUrl },
    { rel: "stylesheet", href: AppCss },
    { rel: "stylesheet", href: ColorCSS },
    { rel: "stylesheet", href: ComponentCSS },
    { rel: "stylesheet", href: ModulesCSS },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      crossOrigin: "anonymous",
      href: "https://fonts.gstatic.com",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap",
    },
  ];
};

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

export const CatchBoundary: React.FC = () => {
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
};

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request?.url);
  const preview =
    requestUrl?.searchParams?.get("preview") === SANITY_PREVIEW_SECRET;

  const favicons = await getSiteFavicons(preview, SANITY_API_TOKEN);
  const siteConfig = await getSiteConfig(preview, SANITY_API_TOKEN);

  return {
    environment: NODE_ENV,
    preview,
    favicons,
    siteConfig,
  };
};

const App: React.FC = () => {
  const { environment, preview, favicons, siteConfig } = useLoaderData();
  const { data: siteConfigData } = usePreviewSubscription(siteConfig.query, {
    preview,
    params: siteConfig.queryParams,
    initialData: siteConfig.data,
  });

  return (
    <Document
      environment={environment}
      title={siteConfig?.name || "Portfolio"}
      lang={siteConfig?.lang || "en"}
      favicons={favicons}
      siteConfig={siteConfigData}
    >
      <Layout preview={preview} siteConfig={siteConfigData}>
        <Outlet />
      </Layout>
    </Document>
  );
};

export default App;
