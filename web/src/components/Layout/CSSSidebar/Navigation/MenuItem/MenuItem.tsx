import React from "react";
import clsx from "clsx";
import { Link } from "remix";
import styles from "./CSSMenuItem.module.scss.json";
import Icon from "~/components/cms/RenderSections/sections/Icon";
import urls from "~/utils/urls";

interface MenuItemProps {
  item: {
    title: string;
    slug?: {
      current: string;
    };
    link?: string;
    icon?: string;
    prefetch?: boolean;
  };
  className?: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, className }) => {
  const { title, slug, link, icon } = item;

  return (
    <div className={clsx(styles.root, className)}>
      {slug == null ? (
        <a
          className={styles.container}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={styles.container}>
            {icon != null && <Icon type={icon} className={styles.icon} />}
            <p className={styles.text}>{title}</p>
          </div>
        </a>
      ) : (
        <Link
          to={urls.pages.sanityPage(slug.current)}
          prefetch={item.prefetch ? "intent" : "none"}
        >
          <div className={styles.container}>
            {icon != null && <Icon type={icon} className={styles.icon} />}
            <p className={styles.text}>{title}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MenuItem;
