import React from "react";
import { usePageData } from "~/utils/remix";

interface PropTypes {
  siteConfig: {
    name: string;
    mainNavigation: any;
    footerNavigation: any;
    footerText: any;
    logo: any;
  };
}

const Seo: React.FC<PropTypes> = ({ siteConfig }) => {
  const page = usePageData();

  if (!page) {
    return null;
  }

  const title = page?.title
    ? `${siteConfig.name} | ${page.title}`
    : siteConfig.name;
  const robots = page.disallowRobots ? "noindex,nofollow" : "index,follow";

  return (
    <>
      <title>{title}</title>
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      {page?.description && (
        <meta name="description" content={page.description} />
      )}
      <meta name="description" content={page.description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={page.description} />
      {page?.description && (
        <meta property="og:description" content={page.description} />
      )}
      {page?.openGraphImages?.map((image) => (
        <React.Fragment key={image.url}>
          <meta property="og:image" content={image.url} />
          <meta property="og:image:alt" content={image.alt} />
          <meta property="og:image:width" content={image.width.toString()} />
          <meta property="og:image:height" content={image.height.toString()} />
        </React.Fragment>
      ))}
    </>
  );
};

export default Seo;
