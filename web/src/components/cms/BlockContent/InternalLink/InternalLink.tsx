import React from "react";
import { Link } from "remix";
import urls from "../../../../utils/urls";

interface PropTypes {
  mark: any;
}

const InternalLink: React.FC<PropTypes> = ({ mark, children }) => {
  const { slug } = mark;

  if (slug == null) return <a>{children}</a>;

  return (
    <Link to={urls.pages.sanityPage(slug.current)}>
      <a>{children}</a>
    </Link>
  );
};

export default InternalLink;
