import React from "react";
import SanityImage from "../../SanityImage";
import classes from "~/styles/Figure.module.json";

interface FigureProps {
  node?: any;
}

const Figure = ({
  node
}: FigureProps) => (
  <SanityImage className={classes.root} src={node.asset} alt={node.alt} />
);

export default Figure;
