import React from "react";
import BlockContent from "../../../BlockContent";
import styles from "./School.module.scss.json";

interface SchoolProps {
  name: string;
  location: string;
  startYear: string;
  endYear: string;
  description: object[];
  completedCourses: string[];
  currentCourses: string[];
}

const School = ({
  name,
  location,
  startYear,
  endYear,
  description,
  completedCourses,
  currentCourses,
}: SchoolProps) => (
  <div className={styles.root}>
    <section className={styles.school}>
      <h2 className={styles.heading}>{name}</h2>
      <div className={styles.details}>
        {`${new Date(startYear).getUTCFullYear()} - ${new Date(
          endYear
        ).getUTCFullYear()} in ${location}`}
      </div>
      {description && <BlockContent blocks={description} />}
      {completedCourses && (
        <div>
          <div className={styles.details}>Completed Courses</div>
          <ul>
            {completedCourses.map((course) => (
              <li key={course} className={styles.details}>
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}
      {currentCourses && (
        <div>
          <div className={styles.details}>Current Courses</div>
          <ul>
            {currentCourses.map((course) => (
              <li key={course} className={styles.details}>
                {course}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  </div>
);

export default School;
