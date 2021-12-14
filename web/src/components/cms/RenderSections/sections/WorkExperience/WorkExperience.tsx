import React from "react";
import Job from "./Job";
import styles from "@/WorkExperience.module.css";

interface WorkExperienceProps {
  heading: string;
  jobs: object[];
}

const WorkExperience = ({ heading, jobs }: WorkExperienceProps) => (
  <div className={styles.root}>
    <section className={styles.workExperience}>
      <h1 className={styles.heading}>{heading}</h1>
      <div>
        {jobs.map((data) => (
          <Job key={data.company + data.position} {...data} />
        ))}
      </div>
    </section>
  </div>
);

export default WorkExperience;
