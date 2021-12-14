import S from "@sanity/desk-tool/structure-builder";
import Iframe from "sanity-plugin-iframe-pane";
import { MdDashboard, MdSettings } from "react-icons/md";
import { resolveProductionUrl } from "./resolveProductionUrl";

// Here we declare which view panes show up for which schema types
export const getDefaultDocumentNode = ({ schemaType }) => {
  if (schemaType === `page`) {
    return S.document().views([
      S.view.form(),
      // Including the iframe pane, with a function to create the url
      S.view
        .component(Iframe)
        .options({
          url: (doc) => resolveProductionUrl(doc),
        })
        .title("Preview"),
    ]);
  }

  return S.document();
};

// We filter document types defined in structure to prevent
// them from being listed twice
const hiddenDocTypes = (listItem) =>
  !["page", "route", "site-config", "socialLink", "resumePage"].includes(
    listItem.getId()
  );

export default () =>
  S.list()
    .title("Site")
    .items([
      S.listItem()
        .title("Site config")
        .icon(MdSettings)
        .child(
          S.editor()
            .id("config")
            .schemaType("site-config")
            .documentId("global-config")
        ),
      S.listItem()
        .title("Pages")
        .icon(MdDashboard)
        .schemaType("page")
        .child(S.documentTypeList("page").title("Pages")),
      S.listItem()
        .title("Resume Page")
        .icon(MdSettings)
        .child(
          S.editor().id("resume").schemaType("resumePage").documentId("resume")
        ),
      S.listItem()
        .title("Routes")
        .schemaType("route")
        .child(S.documentTypeList("route").title("Routes")),
      S.listItem()
        .title("Social Links")
        .schemaType("socialLink")
        .child(S.documentTypeList("socialLink").title("Social Links")),
      ...S.documentTypeListItems().filter(hiddenDocTypes),
    ]);
