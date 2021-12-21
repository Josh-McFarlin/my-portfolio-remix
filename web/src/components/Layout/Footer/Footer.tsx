import React from "react";
import { Link, useLocation, useSearchParams } from "remix";
import clsx from "clsx";
import BlockContent from "../../cms/BlockContent";
import urls from "../../../utils/urls";
import styles from "./Footer.module.scss.json";
import { convertSlug } from "~/utils/sanity/utils";

interface FooterProps {
  navItems?: {
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
    link?: string;
    prefetch?: boolean;
  }[];
  text?: object[];
}

const Footer: React.FC<FooterProps> = ({ navItems = [], text }) => {
  const location = useLocation();
  const [query] = useSearchParams();

  if (navItems.length === 0 && text == null) {
    return null;
  }

  const isRouteActive = (item: string | { slug?: { current: string } }) => {
    if (typeof item === "string") return item === location.pathname;

    return (
      item.slug != null && convertSlug(query.get("slug")) === item.slug.current
    );
  };

  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.items}>
          {navItems.map((item) => {
            const { slug, title, link, _id } = item;

            return (
              <li
                key={_id}
                className={clsx(
                  styles.navItem,
                  isRouteActive(item) && styles.active
                )}
              >
                {slug == null ? (
                  <a href={link} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                ) : (
                  <Link
                    to={urls.pages.sanityPage(slug.current)}
                    prefetch={item.prefetch ? "intent" : "none"}
                  >
                    {title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
      <div className={styles.text}>
        <BlockContent blocks={text} />
      </div>
    </div>
  );
};

export default Footer;
