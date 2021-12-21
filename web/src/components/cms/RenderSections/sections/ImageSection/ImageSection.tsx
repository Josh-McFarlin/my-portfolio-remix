import React from "react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import BlockContent from "../../../BlockContent";
import Cta from "../../../../Cta";
import SanityImage from "../../../SanityImage";
import styles from "./ImageSection.module.scss.json";

interface ImageSectionProps {
  heading: string;
  label: string;
  text: unknown[];
  image: SanityImageSource;
  backgroundImage: string;
  tagline: string;
  cta: {
    _key: string;
    title: string;
    route?: {
      slug?: {
        current?: string;
      };
    };
    link?: string;
  };
}

const ImageSection = ({
  heading,
  label,
  text,
  image,
  cta,
}: ImageSectionProps) => {
  if (image == null) {
    return null;
  }

  return (
    <div className={styles.root}>
      <figure className={styles.content}>
        <SanityImage src={image} className={styles.image} alt={heading} />
        <figcaption>
          <div className={styles.caption}>
            <div className={styles.captionBox}>
              <div className={styles.label}>{label}</div>
              <h2 className={styles.title}>{heading}</h2>
              {text && <BlockContent blocks={text} />}
              {cta && cta.route && <Cta {...cta} />}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
};

export default ImageSection;
