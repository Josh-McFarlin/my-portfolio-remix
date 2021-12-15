import React from "react";
import type { LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import RenderSections from "~/components/cms/RenderSections";
import RenderResume from "~/components/RenderResume";
import { getPage } from "~/utils/sanity/actions/page";
import { usePreviewSubscription } from "~/utils/sanity/utils";

export const loader: LoaderFunction = async ({ request, params }) => {
  const requestUrl = new URL(request?.url);
  const preview =
    requestUrl?.searchParams?.get("preview") === SANITY_PREVIEW_SECRET;

  const { data, query, queryParams } = await getPage(
    params?.slug,
    preview,
    SANITY_API_TOKEN
  );

  return {
    environment: NODE_ENV,
    preview,
    data,
    query: preview ? query : null,
    queryParams: preview ? queryParams : null,
  };
};

const SlugPage = () => {
  const { preview, data, query, queryParams } = useLoaderData();
  const { data: page } = usePreviewSubscription(query, {
    preview,
    params: queryParams,
    initialData: data,
  });

  const { content = [], resume } = page;

  if (content) {
    return <RenderSections sections={content} />;
  } else if (resume) {
    return <RenderResume {...resume} />;
  }

  return null;
};

export default SlugPage;
