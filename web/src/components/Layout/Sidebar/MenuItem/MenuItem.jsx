import React from "react";
import clsx from "clsx";
import { motion } from "framer-motion";
import { Link, useLocation, useSearchParams } from "remix";
import PropTypes from "prop-types";
import Icon from "../../../cms/RenderSections/sections/Icon";
import urls from "../../../../utils/urls";
import styles from "~/styles/MenuItem.module.json";

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

const conditionalJoin = (slug) => {
  if (slug === undefined) return undefined;

  return typeof slug === "string" ? slug : slug.join("/");
};

const MenuItem = ({ item, toggle }) => {
  const { slug, title, link, icon } = item;
  const location = useLocation();
  const [query] = useSearchParams();

  let isActive = false;
  if ("slug" in item && item.slug != null) {
    isActive =
      (location.pathname === urls.pages.sanityPage() &&
        conditionalJoin(query.get("slug")) === item.slug.current) ||
      location.pathname === item.slug.current;
  }

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
            <Icon type={icon} className={styles.icon} />
            <p className={styles.text}>{title}</p>
          </div>
        </a>
      ) : (
        <Link
          to={urls.pages.sanityPage(item.slug.current)}
          prefetch={item.prefetch ? "intent" : "none"}
        >
          <div className={clsx(styles.container, isActive && styles.active)}>
            <Icon type={icon} className={styles.icon} />
            <p className={styles.text}>{title}</p>
          </div>
        </Link>
      )}
    </motion.div>
  );
};

MenuItem.propTypes = {
  item: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default MenuItem;
