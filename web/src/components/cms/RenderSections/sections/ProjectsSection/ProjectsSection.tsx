import React from "react";
import Project from "./Project";
import styles from "./ProjectsSection.module.scss.json";

interface ProjectsSectionProps {
  heading?: string;
  projects: object[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  heading,
  projects,
}) => (
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
