const localUrl = `http://localhost:3000`
const remoteUrl = `https://your-deployed-website.com`
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;
const baseUrl = window?.location?.hostname === 'localhost' ? localUrl : remoteUrl

export function resolveProductionUrl(doc) {
  const slug = doc?.slug?.current

  if (!slug) {
    throw new Error(`Document has no slug, cannot preview`)
  }

  const url = new URL(baseUrl)
  url.pathname = slug
  url.searchParams.set(`preview`, previewSecret)

  return url.toString()
}
