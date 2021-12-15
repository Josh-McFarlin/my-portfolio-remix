import React from "react";
import clsx from "clsx";
import type { UseNextSanityImageOptions } from "next-sanity-image";
import { useInView } from "react-intersection-observer";
import { useNextSanityImage } from "next-sanity-image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "~/utils/sanity/client";
import styles from "@/SanityImage.module.css";

type PropTypes = React.HTMLProps<HTMLImageElement> & {
  src: SanityImageSource;
  options?: UseNextSanityImageOptions;
  layout?: "responsive" | "intrinsic" | "fixed" | "fill";
  objectFit?: "fill" | "contain" | "cover";
  sizes?: string;
};

const SanityImage: React.FC<PropTypes> = ({
  className,
  src,
  options,
  layout,
  objectFit,
  sizes,
  ...rest
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0,
  });
  const imageProps = useNextSanityImage(client, src, options);
  const [imageSrc, setImageSrc] = React.useState<string>(
    imageProps?.blurDataURL || ""
  );
  const [isBlurred, setIsBlurred] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (imageProps != null && inView) {
      const img = new Image();

      img.src = imageProps.src;
      img.onload = () => {
        setImageSrc(img.src);
        setIsBlurred(false);
      };
    }
  }, [imageProps, inView]);

  return (
    <img
      data-objectfit={objectFit}
      className={clsx(styles.image, isBlurred && styles.blurred, className)}
      width={imageProps.width}
      height={imageProps.height}
      ref={ref}
      src={imageSrc}
      alt={(src as any)?.alt || ""}
      {...rest}
    />
  );
};

export default SanityImage;
