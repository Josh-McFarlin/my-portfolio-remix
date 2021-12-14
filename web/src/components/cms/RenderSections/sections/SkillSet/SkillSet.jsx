import React from "react";
import PropTypes from "prop-types";
import Skill from "./Skill";
import styles from "~/styles/SkillSet.module.json";

const SkillSet = ({ heading, skills }) => (
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

SkillSet.propTypes = {
  heading: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SkillSet;
