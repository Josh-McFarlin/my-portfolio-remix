import React from "react";
import * as SectionComponents from "./sections";

type Section = {
  _type: string;
  _key: string;
  section: Record<any, any>;
};

const resolveSections = (section: Section): React.FC<Section> | null => {
  let upper = section._type;
  if (upper.length > 0) {
    upper = upper[0].toUpperCase() + upper.slice(1);
  }

  // eslint-disable-next-line import/namespace
  const Section = (SectionComponents as Record<any, any>)[upper];

  if (Section) {
    return Section;
  }

  console.error("Cant find section", section); // eslint-disable-line no-console
  return null;
};

interface PropTypes {
  sections: Section[];
}

const RenderSections: React.FC<PropTypes> = ({ sections }) => {
  if (!sections) {
    console.error("Missing section");
    return <div>Missing sections</div>;
  }

  return (
    <>
      {sections.map((section) => {
        const SectionComponent = resolveSections(section);

        if (!SectionComponent) {
          return <div>Missing section {section._type}</div>;
        }

        return <SectionComponent {...section} key={section._key} />;
      })}
    </>
  );
};

export default RenderSections;
