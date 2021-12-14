import React from "react";

import School from "./School";
import styles from "@/Education.module.css";

interface EducationProps {
  heading: string;
  schools: object[];
}

const Education = ({ heading, schools }: EducationProps) => (
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
