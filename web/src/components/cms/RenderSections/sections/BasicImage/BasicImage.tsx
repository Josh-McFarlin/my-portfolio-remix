import React from "react";
import clsx from "clsx";
import SanityImage from "../../../SanityImage";
import styles from "~/styles/BasicImage.module.json";

interface BasicImageProps {
  image: object;
  circular?: boolean;
  width?: number;
  maxWidth?: number;
  height?: number;
  maxHeight?: number;
}

const BasicImage = (props: BasicImageProps) => {
  if (props.image.image == null) {
    return null;
  }

  const contStyle = {
    borderRadius: props.circular ? "50%" : 0,
    width: `${props.width}vw`,
    height: `${props.height}vh`,
    maxWidth: props.maxWidth,
    maxHeight: props.maxHeight,
  };

  return (
    <div className={styles.root}>
      <section className={styles.section}>
        <div className={styles.imageContainer} style={contStyle}>
          <SanityImage
            className={clsx(styles.image, props.circular && styles.circular)}
            src={props.image}
            layout="fill"
            sizes={`${
              props.maxWidth ? `(max-width: ${props.maxWidth}px) ` : ""
            }${props.width}vw`}
          />
        </div>
      </section>
    </div>
  );
};

BasicImage.defaultProps = {
  circular: false,
  width: null,
  height: null,
  maxWidth: null,
  maxHeight: null,
};

export default BasicImage;
