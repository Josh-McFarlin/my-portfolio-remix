import React from "react";
import MenuItem from "./MenuItem";
import styles from "./CSSNavigation.module.scss.json";

interface NavigationProps {
  navItems: {
    _id: string;
    title: string;
    slug?: {
      current: string;
    };
    link?: string;
    prefetch?: boolean;
  }[];
}

const Navigation: React.FC<NavigationProps> = ({ navItems }) => (
  <div className={styles.root}>
    {navItems.map((item) => (
      <MenuItem key={item._id} item={item} />
    ))}
  </div>
);

export default Navigation;
