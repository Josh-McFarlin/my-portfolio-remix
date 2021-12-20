import { groq } from "@sanity/groq-store";
import { getClient, imageBuilder } from "../client";

const siteConfigQuery = groq`
    *[_id == "global-config"] {
      ...,
      mainNavigation[] {
        ...,
        ...*[_type == "route" && _id == ^._ref] {
          ...,
          "title": page->title
        }[0]
      },
      footerNavigation[] {
        ...,
        ...*[_type == "route" && _id == ^._ref] {
          ...,
          "title": page->title
        }[0]
      }
    }[0]
  `;

const siteConfigParams = {};

export const getSiteConfig = async (
  preview = false,
  previewToken?: string
): Promise<{
  query: string;
  queryParams: Record<any, any>;
  data: {
    name: string;
    lang?: string;
    mainNavigation: any;
    footerNavigation: any;
    footerText: any;
    logo: any;
  };
}> => {
  const config = await getClient(preview, previewToken).fetch(
    siteConfigQuery,
    siteConfigParams
  );

  return {
    query: siteConfigQuery,
    queryParams: siteConfigParams,
    data: config,
  };
};

export const getSiteFavicons = async (
  preview = false,
  previewToken?: string
): Promise<{
  query: string;
  queryParams: Record<any, any>;
  data: {
    appleIconUrl: string;
    thirtyIconUrl: string;
    sixIconUrl: string;
  };
}> => {
  const config = await getClient(preview, previewToken).fetch(
    siteConfigQuery,
    siteConfigParams
  );

  const favicons = {
    appleIconUrl: imageBuilder
      .image(config?.favicon)
      .width(180)
      .height(180)
      .format("png")
      .url(),
    thirtyIconUrl: imageBuilder
      .image(config?.favicon)
      .width(32)
      .height(32)
      .fit("clip")
      .format("png")
      .url(),
    sixIconUrl: imageBuilder
      .image(config?.favicon)
      .width(16)
      .height(16)
      .fit("clip")
      .format("png")
      .url(),
  };

  return {
    query: siteConfigQuery,
    queryParams: siteConfigParams,
    data: favicons,
  };
};
