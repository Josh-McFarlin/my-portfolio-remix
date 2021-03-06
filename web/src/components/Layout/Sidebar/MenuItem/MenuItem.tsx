import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Link, useLocation, useSearchParams } from "remix";
import styles from "./MenuItem.module.scss.json";
import Icon from "~/components/cms/RenderSections/sections/Icon";
import urls from "~/utils/urls";
import { convertSlug } from "~/utils/sanity/utils";

const variants = {
  open: {
    x: 0,
    opacity: 1,
    display: "block",
    transition: {
      x: {
        stiffness: 5,
        velocity: -100,
      },
    },
  },
  closed: {
    x: 100,
    opacity: 0,
    display: "none",
    transition: {
      x: {
        stiffness: 5,
      },
      display: {
        delay: 0.3,
      },
    },
  },
};

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
  toggle: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, toggle }) => {
  const { title, slug, link, icon } = item;
  const location = useLocation();
  const [query] = useSearchParams();

  const isActive =
    item.slug != null &&
    (convertSlug(query.get("slug")) === item.slug.current ||
      location.pathname === item.slug.current);

  return (
    <motion.div className={styles.root} variants={variants} onClick={toggle}>
      {slug == null ? (
        <a
          className={clsx(styles.container, isActive && styles.active)}
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
          <div className={clsx(styles.container, isActive && styles.active)}>
            {icon != null && <Icon type={icon} className={styles.icon} />}
            <p className={styles.text}>{title}</p>
          </div>
        </Link>
      )}
    </motion.div>
  );
};

export default MenuItem;
