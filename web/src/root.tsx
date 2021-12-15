import React from "react";
import type { ErrorBoundaryComponent, LoaderFunction } from "remix";
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
import { getSiteConfig } from "~/utils/sanity/actions/siteConfig";

export function links() {
  return [
    { rel: "stylesheet", href: stylesUrl },
    { rel: "stylesheet", href: normalizeUrl },
    { rel: "stylesheet", href: AppCss },
    { rel: "stylesheet", href: ColorCSS },
    { rel: "stylesheet", href: ComponentCSS },
    { rel: "stylesheet", href: ModulesCSS },
  ];
}

export const loader: LoaderFunction = async ({ request }) => {
  const requestUrl = new URL(request?.url);
  const preview =
    requestUrl?.searchParams?.get("preview") === SANITY_PREVIEW_SECRET;

  const siteConfig = await getSiteConfig(preview);

  return {
    preview,
    siteConfig,
  };
};

export default function App() {
  const { preview, siteConfig } = useLoaderData();

  return (
    <Document
      title={siteConfig?.config?.name || "Portfolio"}
      preview={preview}
      siteConfig={siteConfig}
    >
      <Layout preview={preview} siteConfig={siteConfig}>
        <Outlet />
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
      <p>
        Replace this UI with what you want users to see when your app throws
        uncaught errors.
      </p>
    </Document>
  );
};
