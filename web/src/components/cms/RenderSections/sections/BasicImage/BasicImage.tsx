import React from "react";
import clsx from "clsx";
import SanityImage from "../../../SanityImage";
import styles from "./BasicImage.module.scss.json";

interface BasicImageProps {
  image: any;
  circular?: boolean;
  width?: number;
  maxWidth?: number;
  height?: number;
  maxHeight?: number;
}

const BasicImage: React.FC<BasicImageProps> = ({
  image,
  circular = false,
  width,
  maxWidth,
  height,
  maxHeight,
}) => {
  if (image.image == null) {
    return null;
  }

  const contStyle = {
    borderRadius: circular ? "50%" : 0,
    width: `${width}vw`,
    height: `${height}vh`,
    maxWidth: maxWidth,
    maxHeight: maxHeight,
  };

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <div className={styles.imageContainer} style={contStyle}>
          <SanityImage
            className={clsx(styles.image, circular && styles.circular)}
            src={image}
            layout="fill"
            sizes={`${maxWidth ? `(max-width: ${maxWidth}px) ` : ""}${width}vw`}
          />
        </div>
      </section>
    </div>
  );
};

export default BasicImage;
