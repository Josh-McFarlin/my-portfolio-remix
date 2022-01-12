import React from "react";
import { Links, LiveReload, Meta, Scripts } from "remix";
import Seo from "../Seo";

interface PropTypes {
  environment?: "development" | "production";
  title: string;
  lang?: string;
  favicons?: {
    appleIconUrl: string;
    thirtyIconUrl: string;
    sixIconUrl: string;
  };
  siteConfig?: any;
  pageData?: any;
}

const Document: React.FC<PropTypes> = ({
  children,
  environment = "development",
  title,
  lang = "en",
  favicons = {},
  siteConfig = {
    name: "Portfolio",
  },
  pageData = {
    disallowRobots: false,
  },
}) => (
  <html lang={lang ?? "en"}>
    <head>
      <meta charSet="utf-8" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, viewport-fit=cover"
      />
      <link rel="icon" href="/favicon.png" type="image/png" />
      {favicons?.appleIconUrl != null && (
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={favicons?.appleIconUrl}
        />
      )}
      {favicons?.thirtyIconUrl != null && (
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={favicons?.thirtyIconUrl}
        />
      )}
      {favicons?.sixIconUrl != null && (
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={favicons?.sixIconUrl}
        />
      )}
      <title>{title}</title>
      <Meta />
      <Links />
      <Seo siteConfig={siteConfig} page={pageData} />
    </head>
    <body>
      {children}
      <Scripts />
      <noscript>
        <style>{`
          .hideNoJS { display: none; }
        `}</style>
      </noscript>
      {environment === "development" && <LiveReload />}
    </body>
  </html>
);

export default Document;
