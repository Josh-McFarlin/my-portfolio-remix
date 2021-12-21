import React from "react";
import BlockContent from "../../../../BlockContent";
import SanityImage from "../../../../SanityImage";
import styles from "./Project.module.scss.json";

interface ProjectProps {
  name: string;
  tags?: string[];
  description: unknown[];
  image: object;
  links?: {
    title: string;
    href: string;
  }[];
}

const Project: React.FC<ProjectProps> = ({
  name,
  tags = [],
  description,
  image,
  links = [],
}) => (
  <div className={styles.root}>
    <div className={styles.imageContainer}>
      <SanityImage
        className={styles.image}
        src={image}
        layout="fill"
        objectFit="cover"
      />
    </div>
    <div className={styles.content}>
      <h1 className={styles.title}>{name}</h1>
      {description && <BlockContent blocks={description} />}
      {tags.length > 0 && (
        <div className={styles.tagsContainer}>
          {tags.map((tag) => (
            <div key={tag} className={styles.tag}>
              {tag}
            </div>
          ))}
        </div>
      )}
      {links && (
        <div className={styles.linkContainer}>
          {links.map((data) => (
            <a
              key={data.title}
              className={styles.button}
              href={data.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data.title}
            </a>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default Project;
