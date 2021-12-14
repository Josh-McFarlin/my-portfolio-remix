import React from "react";
import clsx from "clsx";
import { Link, useLocation, useSearchParams } from "remix";
import urls from "../../../utils/urls";
import styles from "@/Header.module.css";

const conditionalJoin = (slug) => {
  if (slug === undefined) return "";

  return typeof slug === "string" ? slug : slug.join("/");
};

interface HeaderProps {
  name: string;
  navItems?: {
    title?: string;
    slug?: {
      current?: string;
    };
  }[];
}

const Header = ({ name = "Missing name", navItems }: HeaderProps) => {
  const location = useLocation();
  const [query] = useSearchParams();

  const isRouteActive = (item) => {
    if (typeof item === "string") return item === location.pathname;

    let isActive = false;
    if ("slug" in item && item.slug != null) {
      isActive =
        location.pathname === urls.pages.sanityPage() &&
        conditionalJoin(query.get("slug")) === item.slug.current;
    }

    return isActive;
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
          {navItems &&
            navItems.map((item) => {
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
                      to={urls.pages.sanityPage(item.slug.current)}
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
    </div>
  );
};

Header.defaultProps = {
  navItems: [],
};

export default Header;
