import React from "react";
import BlockContent from "../../../../BlockContent";
import styles from "~/styles/Job.module.json";

interface JobProps {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: object[];
}

const Job = ({
  company,
  position,
  location,
  startDate,
  endDate,
  description
}: JobProps) => {
  const startForm = new Date(startDate);
  const endForm = new Date(endDate);

  const onlyMonth = {
    month: "long",
    timeZone: "UTC",
  };

  const monYear = {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  };

  let startMonth;
  let startMonYear;
  try {
    startMonth = new Intl.DateTimeFormat("en-US", onlyMonth).format(startForm);
    startMonYear = new Intl.DateTimeFormat("en-US", monYear).format(startForm);
  } catch (e) {
    console.log("DT Error", e);
  }

  let dateString;
  let endMonYear;
  if (endDate == null) {
    dateString = `${startMonYear} - Present`;
  } else {
    try {
      endMonYear = new Intl.DateTimeFormat("en-US", monYear).format(endForm);
    } catch (e) {
      console.log("DT Error", e);
    }

    dateString =
      startForm.getUTCFullYear() === endForm.getUTCFullYear()
        ? `${startMonth} - ${endMonYear}`
        : `${startMonYear} - ${endMonYear}`;
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
