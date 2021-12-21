import React from "react";
import { useOutletContext } from "react-router-dom";
import RenderSections from "~/components/cms/RenderSections";
import RenderResume from "~/components/RenderResume";

const IndexPage = () => {
  const [page] = useOutletContext<any[]>();

  const { content = [], resume } = page;

  if (content) {
    return <RenderSections sections={content} />;
  } else if (resume) {
    return <RenderResume {...resume} />;
  }

  return null;
};

export default IndexPage;
