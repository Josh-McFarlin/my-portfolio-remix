import React from "react";
import BlockContent from "../../../BlockContent";
import Cta from "../../../../Cta";
import SanityImage from "../../../SanityImage";
import styles from "./Hero.module.scss.json";

interface HeroProps {
  heading: string;
  backgroundImage: object;
  tagline: unknown[];
  ctas: object[];
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
            <Cta {...cta} key={cta._key} />
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
