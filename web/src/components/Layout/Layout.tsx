import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import classes from "@/Layout.module.css";

interface PropTypes {
  preview?: boolean;
  siteConfig?: {
    config: {
      name: string;
      mainNavigation: any;
      footerNavigation: any;
      footerText: any;
      logo: any;
    };
  };
}

const Layout: React.FC<PropTypes> = ({
  preview = false,
  siteConfig,
  children,
  ...rest
}) => {
  if (siteConfig?.config == null) {
    console.error("Missing config");

    return <div>Missing config</div>;
  }

  const { config } = siteConfig;
  const { name, mainNavigation, footerNavigation, footerText, logo } = config;

  return (
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
  );
};

export default Layout;
