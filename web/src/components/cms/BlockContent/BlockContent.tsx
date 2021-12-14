import React from "react";
import BlockContentPure from "@sanity/block-content-to-react";
import client from "../../../utils/sanity/client";
import InternalLink from "./InternalLink";
import EmbedHTML from "./EmbedHTML";
import Figure from "./Figure";

const { projectId, dataset } = client.config();

interface BlockContentProps {
  blocks?: any;
  className?: string;
}

const BlockContent = ({
  blocks,
  className,
  ...rest
}: BlockContentProps) => {
  if (!blocks) {
    // console.error('Missing blocks');
    return null;
  }

  return (
    <BlockContentPure
      blocks={blocks}
      projectId={projectId}
      dataset={dataset}
      className={className}
      renderContainerOnSingleChild
      serializers={{
        marks: {
          internalLink: InternalLink,
        },
        types: {
          embedHTML: EmbedHTML,
          figure: Figure,
        },
      }}
      {...rest}
    />
  );
};

export default BlockContent;
