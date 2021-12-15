import React from "react";
import type { UseNextSanityImageOptions } from "next-sanity-image";
import { useInView } from "react-intersection-observer";
import { useNextSanityImage } from "next-sanity-image";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import client from "../../../utils/sanity/client";

type PropTypes = React.HTMLProps<HTMLImageElement> & {
  src: SanityImageSource;
  options?: UseNextSanityImageOptions;
  layout?: "responsive" | "intrinsic" | "fixed" | "fill";
  objectFit?: "fill" | "contain" | "cover";
  sizes?: string;
};

const SanityImage: React.FC<PropTypes> = ({
  src,
  options,
  layout,
  objectFit,
  sizes,
  ...rest
}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0,
  });

  const [isBlurred, setIsBlurred] = React.useState<boolean>(true);
  const imageProps = useNextSanityImage(client, src, options);

  // console.log("sou", src);
  //  console.log("imageProps", imageProps);

  React.useEffect(() => {
    console.log("ref", ref);
    console.log("inview", inView);
    // if (inView) {
    //   image.setAttribute("src", image.getAttribute("data-src"));
    //
    //   image.onload = () => {
    //     image.removeAttribute("data-src");
    //   };
    // }
  }, [ref, inView]);

  // console.log("inview", inView);

  return (
    <img
      width={imageProps.width}
      height={imageProps.height}
      ref={ref}
      src={imageProps.blurDataURL ?? ""}
      data-src={imageProps.src}
      style={{
        filter: isBlurred ? "blur(20px)" : "none",
        transition: isBlurred ? "none" : "filter 0.3s ease-out",
      }}
      alt={(src as any)?.alt || ""}
      {...rest}
    />
  );
};

export default SanityImage;
