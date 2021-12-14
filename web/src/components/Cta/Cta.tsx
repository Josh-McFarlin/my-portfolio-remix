import React from "react";
import { Link } from "remix";
import urls from "../../utils/urls";
import styles from "~/styles/Cta.module.json";

interface ctaProps {
  title: string;
  route?: {
    slug?: {
      current?: string
    }
  };
  link?: string;
}

const cta = ({
  title,
  route,
  link
}: ctaProps) => {
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

cta.defaultProps = {
  route: null,
  link: null,
};

export default cta;
