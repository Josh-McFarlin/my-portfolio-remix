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
  const matches = useMatches();

  return matches[matches.length - 1]?.data?.page?.data || null;
};

export const useShouldHydrate = (): boolean => {
  const matches = useMatches();

  return matches.some((match) => match.handle?.hydrate);
};
