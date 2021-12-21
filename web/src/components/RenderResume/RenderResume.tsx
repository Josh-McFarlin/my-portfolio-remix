import React from "react";
import SanityImage from "../cms/SanityImage";
import styles from "./RenderResume.module.scss.json";
import { getClient } from "~/utils/sanity/client";

type ResourceType = "link" | "pdf" | "image";
type PropTypes = {
  first: ResourceType;
  second: ResourceType;
  image: string;
  link: string;
  pdf: string;
};

const RenderResume: React.FC<PropTypes> = ({
  first,
  second,
  image,
  link,
  pdf,
}) => {
  const [pdfLink, setPdfLink] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [showWhich, setShowWhich] = React.useState<ResourceType | null>(first);

  const onLoaded = () => setIsLoading(false);

  const onRenderFail = () => {
    setShowWhich((prevWhich) => {
      let next = null;

      if (prevWhich === first && first !== second) {
        next = second;
      } else if (prevWhich === second) {
        ["link", "pdf", "image"].forEach((item) => {
          if (first !== item && second !== item) {
            next = item;
          }
        });
      }

      return next;
    });
    setIsLoading(true);
  };

  React.useEffect(() => {
    if (pdf != null) {
      getClient()
        .fetch(`*[_id == "${pdf.asset._ref}"][0]`)
        .then(({ url }) => setPdfLink(url));
    }
  }, []);

  return (
    <div className={styles.root}>
      {(link || pdfLink) && (
        <a
          className={styles.link}
          href={showWhich === "link" ? link : pdfLink || link}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download PDF
        </a>
      )}
      <div className={styles.resumeContainer}>
        {isLoading && <div className={styles.loading}>Loading Resume...</div>}
        {(showWhich === "link" || showWhich === "pdf") && (
          <iframe
            className={styles.resume}
            src={`https://docs.google.com/gview?url=${
              showWhich === "link" ? link : pdfLink
            }&embedded=true`}
            frameBorder="0"
            title="My Resume"
            onLoad={onLoaded}
            onError={onRenderFail}
          />
        )}
        {showWhich === "image" && (
          <div className={styles.imageContainer}>
            <SanityImage
              className={styles.resumeImage}
              src={image}
              alt="Resume"
              onLoad={onLoaded}
              onError={onRenderFail}
            />
          </div>
        )}
        {showWhich == null && (
          <div className={styles.loading}>
            Could not load resume at this time, please try again later!
          </div>
        )}
      </div>
    </div>
  );
};

export default RenderResume;
