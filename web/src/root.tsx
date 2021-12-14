import React from "react";
import type { ErrorBoundaryComponent } from "remix";
import { Meta, Links, Scripts, LiveReload, useCatch } from "remix";
import { Outlet } from "react-router-dom";
// eslint-disable-next-line import/extensions,import/no-unassigned-import
import "focus-visible/dist/focus-visible.min.js";

import normalizeUrl from "normalize.css";
import stylesUrl from "./styles/global.css";
import AppCss from "./styles/App.css";
import ColorCSS from "./styles/Colors.css";
import ComponentCSS from "./styles/Components.css";
import ModulesCSS from "./styles/modules.css";

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

const Document: React.FC<{ title?: string }> = ({ children, title }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <link rel="icon" href="/favicon.png" type="image/png" />
      {title ? <title>{title}</title> : null}
      <Meta />
      <Links />
    </head>
    <body>
      {children}
      <Scripts />
      {NODE_ENV === "development" && <LiveReload />}
    </body>
  </html>
);

export default function App() {
  return (
    <Document>
      <Outlet />
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
