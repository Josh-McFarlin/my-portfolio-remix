import React from "react";
import Job from "./Job";
import styles from "./WorkExperience.module.scss.json";

interface WorkExperienceProps {
  heading: string;
  jobs: {
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate: string;
    description: object[];
  }[];
}

const WorkExperience: React.FC<WorkExperienceProps> = ({ heading, jobs }) => (
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
