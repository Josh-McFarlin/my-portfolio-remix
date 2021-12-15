import React from "react";
import { config } from "./client";

export const convertSlug = (slug) => {
  if (slug == null) return undefined;

  return typeof slug === "string" ? slug : slug.join("/");
};

/**
 * @link https://github.com/SimeonGriggs/sanity-remix-preview/blob/main/web/app/lib/sanity/usePreviewSubscription.js
 * @param query
 * @param subscriptionOptions
 */
export function usePreviewSubscription(query, subscriptionOptions) {
  const { params, initialData } = subscriptionOptions;
  const [data, setData] = React.useState(initialData);

  React.useEffect(() => {
    let sub;
    let store;

    async function createStore() {
      // For more details about configuring groq-store see:
      // https://www.npmjs.com/package/@sanity/groq-store
      const {
        default: { groqStore },
      } = await import("@sanity/groq-store");

      const { projectId, dataset } = config;

      store = groqStore({
        projectId,
        dataset,
        listen: true,
        overlayDrafts: true,
        documentLimit: 1000,
      });

      store.subscribe(
        query,
        params ?? {}, // Params
        (err, result) => {
          if (err) {
            console.error("Oh no, an error:", err);
            return;
          }
          setData(result);
        }
      );
    }

    if (!store) {
      createStore();
    }

    return () => {
      if (sub?.unsubscribe()) sub.unsubscribe();
      if (store) store.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data };
}
