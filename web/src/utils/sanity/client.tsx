import PicoSanity from "picosanity";
import imageUrlBuilder from "@sanity/image-url";

// const NODE_ENV = "development";
const prod = NODE_ENV === "production";
// const SANITY_API_TOKEN = "aaa";
const previewToken = SANITY_API_TOKEN;

export const options = {
  apiVersion: "2021-08-31",
  projectId: "ai1hbij4",
  dataset: "production",
  token: "",
  useCdn: prod,
  withCredentials: false,
};

export const client = new PicoSanity(options);

export const previewClient = new PicoSanity({
  ...options,
  useCdn: false,
  token: previewToken,
});

export const getClient = (preview = false) =>
  preview === true && previewToken != null ? previewClient : client;

export const imageBuilder = imageUrlBuilder(client);

export default client;
