import React from "react";
import PropTypes from "prop-types";
import { Link } from "remix";
import urls from "../../utils/urls";
import styles from "~/styles/Cta.module.json";

const cta = ({ title, route, link }) => {
  if (route && route.slug && route.slug.current) {
    return (
      <Link to={urls.pages.sanityPage(route.slug.current)}>
        <a className={styles.button}>{title}</a>
      </Link>
    );
  }

  if (link) {
    return (
      <a className={styles.button} href={link}>
        {title}
      </a>
    );
  }

  return <a className={styles.button}>{title}</a>;
};

cta.propTypes = {
  title: PropTypes.string.isRequired,
  route: PropTypes.shape({
    slug: PropTypes.shape({
      current: PropTypes.string,
    }),
  }),
  link: PropTypes.string,
};

cta.defaultProps = {
  route: null,
  link: null,
};

export default cta;
