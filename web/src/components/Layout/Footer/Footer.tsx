import React from "react";
import { Link, useLocation, useSearchParams } from "remix";
import BlockContent from "../../cms/BlockContent";
import urls from "../../../utils/urls";
import styles from "./Footer.module.scss.json";

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

  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.items}>
          {navItems.map((item) => {
            const isActive =
              location.pathname === "/LandingPage" &&
              query.get("slug") === item.slug.current;

            return (
              <li key={item._id} className={styles.item}>
                <Link
                  to={urls.pages.sanityPage(item.slug.current)}
                  prefetch={item.prefetch ? "intent" : "none"}
                >
                  <a data-is-active={isActive ? "true" : "false"}>
                    {item.title}
                  </a>
                </Link>
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
