import React from "react";
import styles from "./CSSMenuToggle.module.scss.json";

const MenuToggle: React.FC = () => (
  <details className={styles.root}>
    <summary>
      <div className={styles.barContainer}>
        <div className={styles.bar} />
        <div className={styles.bar} />
        <div className={styles.bar} />
      </div>
    </summary>
  </details>
);

export default MenuToggle;
