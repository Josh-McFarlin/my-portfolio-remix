import React from "react";
import BlockContent from "../../../BlockContent";
import styles from "~/styles/TextSection.module.json";

interface TextSectionProps {
  heading: string;
  label?: string;
  text: object[];
}

const TextSection = ({
  heading,
  label,
  text
}: TextSectionProps) => (
  <div className={styles.root}>
    <section className={styles.section}>
      <div className={styles.label}>{label}</div>
      <h1 className={styles.heading}>{heading}</h1>
      {text && <BlockContent className={styles.textContainer} blocks={text} />}
    </section>
  </div>
);

TextSection.defaultProps = {
  label: "",
};

export default TextSection;
