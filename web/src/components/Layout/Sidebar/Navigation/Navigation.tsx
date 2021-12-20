import React from "react";
import { motion } from "framer-motion";
import MenuItem from "../MenuItem";
import * as styles from "@/Navigation.module.css";

const variants = {
  open: {
    pointerEvents: "auto" as const,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  closed: {
    pointerEvents: "none" as const,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

interface NavigationProps {
  navItems?: {
    title: string;
    slug?: {
      current: string;
    };
    link?: string;
    icon?: string;
    prefetch?: boolean;
  }[];
  toggle: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ navItems = [], toggle }) => (
  <motion.div className={styles.root} variants={variants}>
    {navItems.map((item) => (
      <MenuItem item={item} key={item._id} toggle={toggle} />
    ))}
  </motion.div>
);

export default Navigation;
