import React from "react";

import styles from "./SectionHeader.module.scss.json";

interface SectionHeaderProps {
  header: string;
  align?: string;
  size?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  header,
  align,
  size,
}) => (
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
