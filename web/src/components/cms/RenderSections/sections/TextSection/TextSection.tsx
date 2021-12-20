import React from "react";
import BlockContent from "../../../BlockContent";
import styles from "./TextSection.module.scss.json";

interface TextSectionProps {
  heading: string;
  label?: string;
  text: object[];
}

const TextSection: React.FC<TextSectionProps> = ({
  heading,
  label = "",
  text,
}) => (
  <div className={styles.root}>
    <section className={styles.section}>
      <div className={styles.label}>{label}</div>
      <h1 className={styles.heading}>{heading}</h1>
      {text && <BlockContent className={styles.textContainer} blocks={text} />}
    </section>
  </div>
);

export default TextSection;
