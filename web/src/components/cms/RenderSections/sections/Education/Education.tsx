import React from "react";

import School from "./School";
import styles from "./Education.module.scss.json";

interface EducationProps {
  heading: string;
  schools: object[];
}

const Education: React.FC<EducationProps> = ({ heading, schools }) => (
  <div className={styles.root}>
    <section className={styles.education}>
      <h1 className={styles.heading}>{heading}</h1>
      <div>
        {schools.map((data) => (
          <School key={data.name + data.startYear} {...data} />
        ))}
      </div>
    </section>
  </div>
);

export default Education;
