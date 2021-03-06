import React from "react";
import Skill from "./Skill";
import styles from "./SkillSet.module.scss.json";

interface SkillSetProps {
  heading: string;
  skills: {
    name?: string;
    image?: object;
  }[];
}

const SkillSet: React.FC<SkillSetProps> = ({ heading, skills }) => (
  <div className={styles.root}>
    <section className={styles.section}>
      <h1 className={styles.heading}>{heading}</h1>
      <div className={styles.skillsList}>
        {skills.map((data) => (
          <Skill key={data.name} {...data} />
        ))}
      </div>
    </section>
  </div>
);

export default SkillSet;
