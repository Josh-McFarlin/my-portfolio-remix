import { getClient } from "../client";

export const getAllRoutes = (preview = false) =>
  getClient(preview).fetch(`*[_type == "route"].slug.current`);

export const getSitemapRoutes = () =>
  getClient(false).fetch(`
    {
      "routes": *[_type == "route"] {
        ...,
        disallowRobot,
        includeInSitemap,
        page->{
          _id,
          title,
          _createdAt,
          _updatedAt
        }
      }
    }
  `);
