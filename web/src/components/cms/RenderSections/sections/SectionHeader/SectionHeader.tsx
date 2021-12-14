import React from "react";

import styles from "@/SectionHeader.module.css";

interface SectionHeaderProps {
  header: string;
  align?: string;
  size?: string;
}

const SectionHeader = ({ header, align, size }: SectionHeaderProps) => (
  <div className={styles.root}>
    <section className={styles.section}>
      <h1 className={styles[`header-${size}`]} align={align}>
        {header}
      </h1>
    </section>
  </div>
);

SectionHeader.defaultProps = {
  align: "left",
  size: "md",
};

export default SectionHeader;
