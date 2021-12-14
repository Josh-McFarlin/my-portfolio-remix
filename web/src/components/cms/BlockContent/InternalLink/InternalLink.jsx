import React from "react";
import PropTypes from "prop-types";
import { Link } from "remix";
import urls from "../../../../utils/urls";

const InternalLink = ({ mark, children }) => {
  const { slug } = mark;

  if (slug == null) return <a>{children}</a>;

  return (
    <Link to={urls.pages.sanityPage(slug.current)}>
      <a>{children}</a>
    </Link>
  );
};

InternalLink.PropTypes = {
  mark: PropTypes.any,
  children: PropTypes.node,
};

export default InternalLink;
