import React from "react";
import SanityImage from "../../SanityImage";
import classes from "./Figure.module.scss.json";

interface FigureProps {
  node: {
    asset: any;
    alt: string;
  };
}

const Figure: React.FC<FigureProps> = ({ node }) => (
  <SanityImage className={classes.root} src={node.asset} alt={node.alt} />
);

export default Figure;
