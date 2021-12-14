import React from "react";
import Project from "./Project";
import styles from "~/styles/ProjectsSection.module.json";

interface ProjectsSectionProps {
  heading?: string;
  projects: object[];
}

const ProjectsSection = ({
  heading,
  projects
}: ProjectsSectionProps) => (
  <div className={styles.root}>
    <section className={styles.section}>
      {heading != null && <h1 className={styles.title}>{heading}</h1>}
      <div className={styles.projectList}>
        {projects.map((data) => (
          <Project key={data.name} {...data} />
        ))}
      </div>
    </section>
  </div>
);

ProjectsSection.defaultProps = {
  heading: null,
};

export default ProjectsSection;
