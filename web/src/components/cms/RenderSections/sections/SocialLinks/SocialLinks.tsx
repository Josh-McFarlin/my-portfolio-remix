import React from "react";
import { Icon as IconifyIcon } from "@iconify/react";
import classes from "./SocialLinks.module.scss.json";

interface TextSectionProps {
  linkedIn?: string;
  gitHub?: string;
  twitter?: string;
  instagram?: string;
}

const TextSection = ({
  linkedIn,
  gitHub,
  twitter,
  instagram,
}: TextSectionProps) => (
  <div className={classes.root}>
    <section className={classes.section}>
      {linkedIn && (
        <a
          className={classes.link}
          href={linkedIn}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconifyIcon
            className={classes.logo}
            icon="ion:logo-linkedin"
            fontSize="30px"
          />
        </a>
      )}
      {gitHub && (
        <a
          className={classes.link}
          href={gitHub}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconifyIcon
            className={classes.logo}
            icon="ion:logo-github"
            fontSize="30px"
          />
        </a>
      )}
      {twitter && (
        <a
          className={classes.link}
          href={twitter}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconifyIcon
            className={classes.logo}
            icon="ion:logo-twitter"
            fontSize="30px"
          />
        </a>
      )}
      {instagram && (
        <a
          className={classes.link}
          href={instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconifyIcon
            className={classes.logo}
            icon="ion:logo-instagram"
            fontSize="30px"
          />
        </a>
      )}
    </section>
  </div>
);

export default TextSection;
