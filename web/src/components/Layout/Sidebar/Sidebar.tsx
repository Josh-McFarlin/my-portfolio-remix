import React from "react";
import { motion, useCycle } from "framer-motion";
import MenuToggle from "./MenuToggle";
import Navigation from "./Navigation";
import styles from "@/Sidebar.module.css";

const sidebarVariants = {
  open: {
    background: "rgba(0, 0, 0, 0.3)",
  },
  closed: {
    background: "rgba(0, 0, 0, 0)",
    transition: {
      delay: 0.8,
    },
  },
};

const backgroundVariants = {
  open: {
    clipPath: `circle(calc(200vh + 0px) at calc(100% - 40px) 40px)`,
    boxShadow: "-5px 0px 20px 5px rgba(0, 0, 0, 0.4)",
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  },
  closed: {
    clipPath: "circle(calc(0vh + 30px) at calc(100% - 40px) 40px)",
    boxShadow: "-5px 0px 20px 5px rgba(0, 0, 0, 0)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
      delay: 0.3,
    },
  },
};

interface SidebarProps {
  navItems?: unknown[];
}

const Sidebar: React.FC<SidebarProps> = ({ navItems = [] }) => {
  const [isOpen, toggleOpen] = useCycle(false, true);

  return (
    <motion.nav
      className={styles.root}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <motion.div className={styles.background} variants={backgroundVariants}>
        <MenuToggle toggle={toggleOpen} />
        <Navigation navItems={navItems} toggle={toggleOpen} />
      </motion.div>
    </motion.nav>
  );
};

export default Sidebar;
