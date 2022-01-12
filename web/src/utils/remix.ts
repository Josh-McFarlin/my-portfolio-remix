import React from "react";
import { useMatches } from "remix";

type PageType = {
  title: string;
  description: string;
  disallowRobots: boolean;
  content: any[];
  resume: any;
  config: any;
  socialLinks: any[];
  slug: string;
  openGraphImages: {
    url: string;
    alt: string;
    width: number;
    height: number;
  }[];
};

export const usePageData = (): PageType | null => {
  const [page, setPage] = React.useState<PageType | null>(null);
  const m = useMatches();

  React.useEffect(() => {
    if (m?.length > 1) {
      setPage(m[m.length - 1]?.data?.page?.data || null);
    }
  }, [m]);

  return page;
};
