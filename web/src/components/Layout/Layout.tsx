import React from "react";
import { Link } from "remix";
import Header from "./Header";
import Footer from "./Footer";
import CSSSidebar from "./CSSSidebar";
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
      <CSSSidebar navItems={mainNavigation} />
      <div className={classes.content} {...rest}>
        {children}
      </div>
      <Footer navItems={footerNavigation} text={footerText} />
      {preview && (
        <Link className={classes.exitPreviewButton} to="/" reloadDocument>
          Exit Preview
        </Link>
      )}
    </>
  );
};

export default Layout;
