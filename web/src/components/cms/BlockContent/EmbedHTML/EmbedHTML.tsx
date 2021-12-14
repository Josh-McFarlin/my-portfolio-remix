import React from "react";

interface EmbedHTMLProps {
  node?: any;
}

const EmbedHTML = ({
  node
}: EmbedHTMLProps) => (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: node.html }} />
);

export default EmbedHTML;
