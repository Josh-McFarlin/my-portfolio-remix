import React from "react";
import clsx from "clsx";
import { Link, useLocation, useSearchParams } from "remix";
import urls from "../../../utils/urls";
import styles from "./Header.module.scss.json";
import { convertSlug } from "~/utils/sanity/utils";

interface HeaderProps {
  name: string;
  navItems?: {
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
    link?: string;
    prefetch?: boolean;
  }[];
}

const Header: React.FC<HeaderProps> = ({
  name = "Missing name",
  navItems = [],
}) => {
  const location = useLocation();
  const [query] = useSearchParams();

  const isRouteActive = (item: string | { slug?: { current: string } }) => {
    if (typeof item === "string") return item === location.pathname;

    return (
      item.slug != null && convertSlug(query.get("slug")) === item.slug.current
    );
  };

  return (
    <div className={styles.root}>
      <h1 className={styles.branding}>
        <Link to={urls.pages.index()} title={name}>
          <h1 className={styles.title}>{name}</h1>
        </Link>
      </h1>
      <nav className={styles.nav}>
        <ul className={styles.navItems}>
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
                    prefetch={item.prefetch ? "render" : "intent"}
                  >
                    {title}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
