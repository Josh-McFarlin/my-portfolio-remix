import React from "react";
import SanityImage from "../../../../SanityImage";
import styles from "./Skill.module.scss.json";

interface SkillProps {
  name?: string;
  image?: object;
}

const Skill: React.FC<SkillProps> = ({ name, image }) => (
  <div className={styles.root}>
    {image && (
      <div className={styles.skillImage}>
        <SanityImage
          className={styles.image}
          src={image}
          width={26}
          height={22}
          objectFit="contain"
          placeholder="empty"
        />
      </div>
    )}
    {name && <p className={styles.skillText}>{name}</p>}
  </div>
);

Skill.defaultProps = {
  name: null,
  image: null,
};

export default Skill;
