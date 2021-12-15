import { getClient } from "../client";

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
