import React from "react";
import dayjs from "dayjs";
import BlockContent from "../../../../BlockContent";
import styles from "./Job.module.scss.json";

interface JobProps {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  description: object[];
}

const Job = ({
  company,
  position,
  location,
  startDate,
  endDate,
  description,
}: JobProps) => {
  const start = dayjs(startDate);
  // May 2017 - Present
  let dateString: string = `${start.format("MMM YYYY")} - Present`;

  if (endDate != null) {
    const end = dayjs(endDate);

    if (start.year() === end.year()) {
      // May - Oct 2017
      dateString = `${start.format("MMM")} - ${end.format("MMM YYYY")}`;
    } else {
      // May 2017 - Dec 2019
      dateString = `${start.format("MMM YYYY")} - ${end.format("MMM YYYY")}`;
    }
  }

  return (
    <div className={styles.root} id={`work-${company}`}>
      <section className={styles.job}>
        <h2 className={styles.heading}>
          {position} @ {company}
        </h2>
        <div className={styles.details}>
          {dateString}
          {location && ` in ${location}`}
        </div>
        {description && <BlockContent blocks={description} />}
      </section>
    </div>
  );
};

export default Job;
