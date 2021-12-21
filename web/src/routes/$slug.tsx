import React from "react";
import { useOutletContext } from "react-router-dom";
import type { ActionFunction } from "remix";
import RenderSections from "~/components/cms/RenderSections";
import RenderResume from "~/components/RenderResume";

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
  const [page] = useOutletContext<any[]>();

  const { content = [], resume } = page;

  if (content) {
    return <RenderSections sections={content} />;
  } else if (resume) {
    return <RenderResume {...resume} />;
  }

  return null;
};

export default SlugPage;
