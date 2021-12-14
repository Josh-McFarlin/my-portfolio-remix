import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useSearchParams } from "remix";
import BlockContent from "../../cms/BlockContent";
import urls from "../../../utils/urls";
import styles from "~/styles/Footer.module.json";

const Footer = ({ navItems, text }) => {
  const location = useLocation();
  const [query] = useSearchParams();

  if (navItems.length === 0 && text == null) {
    return null;
  }

  return (
    <div className={styles.root}>
      <nav>
        <ul className={styles.items}>
          {navItems &&
            navItems.map((item) => {
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

Footer.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      slug: PropTypes.shape({
        current: PropTypes.string,
      }).isRequired,
    })
  ),
  text: PropTypes.arrayOf(PropTypes.object),
};

Footer.defaultProps = {
  navItems: [],
  text: null,
};

export default Footer;
