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

const { projectId, dataset } = config;

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
  const store = React.useMemo<GroqStore | null>(
    () =>
      preview
        ? groqStore({
            projectId,
            dataset,
            listen: true,
            overlayDrafts: true,
            documentLimit: 1000,
          })
        : null,
    [preview]
  );

  React.useEffect(() => {
    return () => {
      if (store) {
        store.close();
      }
    };
  }, []);

  React.useEffect(() => {
    let sub: Subscription;

    if (preview && store) {
      sub = store.subscribe(query, params ?? {}, (error, result) => {
        if (error) {
          console.error("Error subscribing to Sanity:", error.message || error);
          console.log("Query of error:", query);
          return;
        }

        setData(result);
      });
    } else {
      setData(initialData);
    }

    return () => {
      if (sub) sub.unsubscribe();
    };
  }, [query, preview, params, initialData]);

  return {
    data,
  };
};
