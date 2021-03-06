import React from "react";
import { Link } from "remix";
import urls from "../../utils/urls";
import styles from "./Cta.module.scss.json";

interface CtaProps {
  title: string;
  route?: {
    slug?: {
      current?: string;
    };
  };
  link?: string;
}

const Cta: React.FC<CtaProps> = ({ title, route, link }) => {
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

export default Cta;
