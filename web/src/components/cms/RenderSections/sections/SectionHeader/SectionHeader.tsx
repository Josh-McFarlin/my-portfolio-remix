import React from "react";

import clsx from "clsx";
import styles from "./SectionHeader.module.scss.json";

interface SectionHeaderProps {
  header: string;
  align?: string;
  size?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  header,
  align = "left",
  size = "md",
}) => (
  <div className={styles.root}>
    <section className={styles.section}>
      <h1 className={clsx(styles.header, size, align)}>{header}</h1>
    </section>
  </div>
);

export default SectionHeader;
