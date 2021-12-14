import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import classes from "@/Layout.module.css";

interface LayoutProps {
  preview?: boolean;
  siteConfig?: any;
  children?: React.ReactNode;
}

const Layout = ({ preview, siteConfig, children, ...rest }: LayoutProps) => {
  if (siteConfig?.config == null) {
    console.error("Missing config");

    return <div>Missing config</div>;
  }

  const { config, favicons } = siteConfig;
  const { name, mainNavigation, footerNavigation, footerText, logo } = config;

  return (
    <>
      <head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, viewport-fit=cover"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={favicons.appleIconUrl}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={favicons.thirtyIconUrl}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={favicons.sixIconUrl}
        />
      </head>
      <>
        <Header name={name} logo={logo} navItems={mainNavigation} />
        <Sidebar navItems={mainNavigation} />
        <div className={classes.content} {...rest}>
          {children}
        </div>
        <Footer navItems={footerNavigation} text={footerText} />
        {preview && (
          <a className={classes.exitPreviewButton} href="/api/exit-preview">
            Exit Preview
          </a>
        )}
      </>
    </>
  );
};

export default Layout;
