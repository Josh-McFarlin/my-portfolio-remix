import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import classes from "./Layout.module.scss.json";

interface PropTypes {
  preview?: boolean;
  siteConfig?: {
    name: string;
    mainNavigation: any;
    footerNavigation: any;
    footerText: any;
    logo: any;
  };
}

const Layout: React.FC<PropTypes> = ({
  preview = false,
  siteConfig,
  children,
  ...rest
}) => {
  if (siteConfig == null) {
    console.error("Missing config");

    return <div>Missing config</div>;
  }

  const { name, mainNavigation, footerNavigation, footerText } = siteConfig;

  return (
    <>
      <Header name={name} navItems={mainNavigation} />
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
