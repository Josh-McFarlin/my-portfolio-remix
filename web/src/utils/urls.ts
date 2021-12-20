const fixSlug = (slug: string): string => slug?.replace(/^\//, "");

const urls = {
  pages: {
    index: () => `/`,
    sanityPage: (slug: string): string => `/${fixSlug(slug)}`,
  },
};

export default urls;
