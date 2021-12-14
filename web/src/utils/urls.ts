const fixSlug = (slug) => slug?.replace(/^\//, "");

const urls = {
  pages: {
    index: () => `/`,
    sanityPage: (slug) => `/${fixSlug(slug)}`,
  },
};

export default urls;
