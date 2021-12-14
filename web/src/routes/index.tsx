import React from "react";
import { useLoaderData } from "remix";
import stylesUrl from "../styles/index.css";
import Layout from "~/components/Layout";
import RenderSections from "~/components/cms/RenderSections";
import RenderResume from "~/components/RenderResume";
import { getSiteConfig } from "~/utils/sanity/actions/siteConfig";
import { getPage } from "~/utils/sanity/actions/page";

export function meta() {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!",
  };
}

export function links() {
  return [{ rel: "stylesheet", href: stylesUrl }];
}

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

const IndexPage = () => {
  const { preview, siteConfig, page } = useLoaderData();

  const { content = [], resume } = page;

  return (
    <Layout preview={preview} siteConfig={siteConfig}>
      {content && <RenderSections sections={content} />}
      {resume && <RenderResume {...resume} />}
    </Layout>
  );
};

export default IndexPage;
