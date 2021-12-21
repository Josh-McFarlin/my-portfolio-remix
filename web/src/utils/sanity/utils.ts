import React from "react";
import { groqStore } from "@sanity/groq-store";
import type { GroqStore, Subscription } from "@sanity/groq-store";
import { config } from "./client";

export const convertSlug = (
  slug: string | string[] | null
): string | undefined => {
  if (slug == null) return undefined;

  return typeof slug === "string" ? slug : slug.join("/");
};

/**
 * @link https://github.com/SimeonGriggs/sanity-remix-preview/blob/main/web/app/lib/sanity/usePreviewSubscription.js
 * @param query
 * @param subscriptionOptions
 */
export const usePreviewSubscription = <D>(
  query: string,
  subscriptionOptions: {
    preview: boolean;
    params: Record<any, any>;
    initialData: D;
  }
): {
  data: D;
} => {
  const { preview, params, initialData } = subscriptionOptions;
  const [data, setData] = React.useState<D>(initialData);

  React.useEffect(() => {
    let sub: Subscription;
    let store: GroqStore = null;

    async function createStore() {
      const { projectId, dataset } = config;

      store = groqStore({
        projectId,
        dataset,
        listen: true,
        overlayDrafts: true,
        documentLimit: 1000,
      });

      sub = store.subscribe(
        query,
        params ?? {}, // Params
        (err, result) => {
          if (err) {
            console.error("Oh no, an error:", err);
            console.log(query);
            return;
          }

          setData(result);
          console.log("Res", result);
        }
      );
    }

    if (preview && !store) {
      createStore();
    }

    return () => {
      if (sub) sub.unsubscribe();
      if (store) store.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preview, params]);

  return {
    data,
  };
};
