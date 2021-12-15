import PicoSanity from "picosanity";
import imageUrlBuilder from "@sanity/image-url";

export const config = {
  apiVersion: "2021-08-31",
  projectId: "ai1hbij4",
  dataset: "production",
  token: "",
  // useCdn: prod,
  useCdn: false,
  withCredentials: false,
};

export const client = new PicoSanity(config);

export const getClient = (preview = false, previewToken?: string) =>
  preview && previewToken != null
    ? new PicoSanity({
        ...config,
        useCdn: false,
        token: previewToken,
      })
    : client;

export const imageBuilder = imageUrlBuilder(client);
