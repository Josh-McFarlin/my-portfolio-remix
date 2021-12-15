import { groq } from "@sanity/groq-store";
import { getClient, imageBuilder } from "../client";
import { convertSlug } from "../utils";

const pageData = groq`
  ...,
  content[] {
    ...,
    cta {
      ...,
      route->
    },
    ctas[] {
      ...,
      route->
    },
    text[] {
      ...,
      markDefs[] {
        ...,
        _type == "internalLink" => {
          "slug": *[_id == ^._ref][0].slug,
        }
      }
    }
  }
`;

const frontPageQuery = groq`
  *[_id == "global-config"] | order(_updatedAt desc) {
    ...select(
      $preview == true =>
        *[_id == "drafts." + ^.frontpage._ref || _id == ^.frontpage._ref] | order(_updatedAt desc) {
          ${pageData},
        }[0],
      *[_id == ^.frontpage._ref] {
        ${pageData},
      }[0],
    )
  }[0]
`;

const pageQuery = groq`
  *[_type == "route" && slug.current == $slug] {
    ...select(
      $preview == true =>
        *[_id == "drafts." + ^.page._ref || _id == ^.page._ref] | order(_updatedAt desc) {
          ${pageData},
        }[0],
      *[_id == ^.page._ref] {
        ${pageData},
      }[0],
    )
  }[0]
`;

export const getPage = async (
  slug = "/",
  preview = false,
  previewToken?: string
): Promise<{
  query: string;
  queryParams: Record<any, any>;
  data: any;
}> => {
  const fixedSlug = convertSlug(slug);
  const client = getClient(preview, previewToken);

  const query = slug === "/" ? frontPageQuery : pageQuery;
  const queryParams = slug === "/" ? { preview } : { slug: fixedSlug, preview };

  const data = await client.fetch(query, queryParams);

  const openGraphImages = data.openGraphImage
    ? [
        {
          url: imageBuilder
            .image(data.openGraphImage)
            .width(800)
            .height(600)
            .url(),
          width: 800,
          height: 600,
          alt: data.title ?? "Missing Title",
        },
        {
          // Facebook recommended size
          url: imageBuilder
            .image(data.openGraphImage)
            .width(1200)
            .height(630)
            .url(),
          width: 1200,
          height: 630,
          alt: data.title ?? "Missing Title",
        },
        {
          // Square 1:1
          url: imageBuilder
            .image(data.openGraphImage)
            .width(600)
            .height(600)
            .url(),
          width: 600,
          height: 600,
          alt: data.title ?? "Missing Title",
        },
      ]
    : [];

  return {
    query,
    queryParams,
    data: {
      slug: fixedSlug,
      ...data,
      openGraphImages,
    },
  };
};
