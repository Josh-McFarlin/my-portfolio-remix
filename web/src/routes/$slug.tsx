import React from "react";
import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import RenderSections from "~/components/cms/RenderSections";
import RenderResume from "~/components/RenderResume";
import { getPage } from "~/utils/sanity/actions/page";

export const loader: LoaderFunction = async ({ request, params }) => {
  const requestUrl = new URL(request?.url);
  const queryParams = { slug: params.slug };
  const preview =
    requestUrl?.searchParams?.get("preview") === SANITY_PREVIEW_SECRET;

  const page = await getPage(params?.slug, preview);

  return {
    preview,
    queryParams: preview ? queryParams : null,
    page,
  };
};

const SlugPage = () => {
  const { page } = useLoaderData();

  const { content = [], resume } = page;

  if (content) {
    return <RenderSections sections={content} />;
  } else if (resume) {
    return <RenderResume {...resume} />;
  }

  return null;
};

export default SlugPage;
