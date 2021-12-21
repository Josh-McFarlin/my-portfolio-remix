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
  siteConfig?: {
    name: string;
    mainNavigation: any;
    footerNavigation: any;
    footerText: any;
    logo: any;
  };
  page?: {
    title: string;
    description: string;
    disallowRobots: boolean;
    content: any[];
    resume: any;
    config: any;
    socialLinks: any[];
    slug: string;
    openGraphImages: {
      url: string;
      alt: string;
      width: number;
      height: number;
    }[];
  };
}

const Document: React.FC<PropTypes> = ({
  children,
  environment = "development",
  title,
  lang = "en",
  favicons = {},
  siteConfig,
  page,
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
      {siteConfig && page ? (
        <Seo siteConfig={siteConfig} page={page} />
      ) : (
        <title>{title}</title>
      )}
      <Meta />
      <Links />
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
