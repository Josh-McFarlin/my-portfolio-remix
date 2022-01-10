import React from "react";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import styles from "./CSSSidebar.module.scss.json";

interface SidebarProps {
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

const CSSSidebar: React.FC<SidebarProps> = ({ navItems = [] }) => (
  <nav className={styles.root}>
    <div className={styles.background}>
      <MenuToggle />
      <Navigation navItems={navItems} />
    </div>
  </nav>
);

export default CSSSidebar;
