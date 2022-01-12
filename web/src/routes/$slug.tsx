import React from "react";
import type { ActionFunction, LoaderFunction } from "remix";
import { useLoaderData } from "remix";
import RenderSections from "~/components/cms/RenderSections";
import RenderResume from "~/components/RenderResume";
import { getSiteFavicons } from "~/utils/sanity/actions/siteConfig";
import { getPage } from "~/utils/sanity/actions/page";
import { usePreviewSubscription } from "~/utils/sanity/utils";

export const loader: LoaderFunction = async ({ request, params }) => {
  const requestUrl = new URL(request?.url);
  const preview =
    requestUrl?.searchParams?.get("preview") === SANITY_PREVIEW_SECRET;

  const favicons = await getSiteFavicons(preview, SANITY_API_TOKEN);
  const page = await getPage(params?.slug, preview, SANITY_API_TOKEN);

  return {
    environment: NODE_ENV,
    preview,
    favicons,
    page,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  // console.log("formData", formData);

  const botField = formData.get("bf")?.toString() || "";
  if (botField.length > 0) {
    // Silently ignore bots
    return {
      success: true,
    };
  }

  const errors = {};

  if (errors) {
    const values = Object.fromEntries(formData);

    return {
      success: false,
      errors,
      values,
    };
  }

  return {
    success: true,
  };
};

const SlugPage = () => {
  const { preview, page } = useLoaderData();
  const { data: pageData } = usePreviewSubscription(page.query, {
    preview,
    params: page.queryParams,
    initialData: page.data,
  });

  const { content = [], resume } = pageData;

  if (content) {
    return <RenderSections sections={content} />;
  } else if (resume) {
    return <RenderResume {...resume} />;
  }

  return null;
};

export default SlugPage;
