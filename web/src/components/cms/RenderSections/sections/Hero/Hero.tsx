import React from "react";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import BlockContent from "../../../BlockContent";
import Cta from "../../../../Cta";
import SanityImage from "../../../SanityImage";
import styles from "./Hero.module.scss.json";

interface HeroProps {
  heading: string;
  backgroundImage: SanityImageSource;
  tagline: unknown[];
  ctas: {
    _key: string;
    title: string;
    route?: {
      slug?: {
        current?: string;
      };
    };
    link?: string;
  }[];
}

const Hero: React.FC<HeroProps> = ({
  heading,
  backgroundImage,
  tagline,
  ctas,
}) => (
  <div className={styles.root}>
    <div className={styles.content}>
      <h1 className={styles.title}>{heading}</h1>
      <div className={styles.tagline}>
        {tagline && <BlockContent blocks={tagline} />}
      </div>
      {ctas && (
        <div className={styles.ctas}>
          {ctas.map((cta) => (
            <Cta key={cta._key} {...cta} />
          ))}
        </div>
      )}
    </div>
    <div className={styles.background}>
      <SanityImage src={backgroundImage} layout="fill" objectFit="cover" />
    </div>
  </div>
);

export default Hero;
