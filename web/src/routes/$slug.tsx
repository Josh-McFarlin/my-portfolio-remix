import React from "react";
import { useLoaderData } from "remix";
import Layout from "~/components/Layout";
import RenderSections from "~/components/cms/RenderSections";
import RenderResume from "~/components/RenderResume";
import { getSiteConfig } from "~/utils/sanity/actions/siteConfig";
import { getPage } from "~/utils/sanity/actions/page";

export async function loader({ request, params }) {
  const requestUrl = new URL(request?.url);
  const queryParams = { slug: params.slug };
  const preview =
    requestUrl?.searchParams?.get("preview") === SANITY_PREVIEW_SECRET;

  const siteConfig = await getSiteConfig(preview);
  const page = await getPage(params?.slug, preview);

  return {
    preview,
    queryParams: preview ? queryParams : null,
    siteConfig,
    page,
  };
}

const SlugPage = () => {
  const { preview, siteConfig, page } = useLoaderData();

  const { content = [], resume } = page;

  return (
    <Layout preview={preview} siteConfig={siteConfig}>
      {content && <RenderSections sections={content} />}
      {resume && <RenderResume {...resume} />}
    </Layout>
  );
};

export default SlugPage;
