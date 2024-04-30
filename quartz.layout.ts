import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import { SimpleSlug } from "./quartz/util/path"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
      Component.Logo(),
      Component.PageTitle(),
      Component.JSControls({children: [Component.Search(), Component.Darkmode()]})
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/fetsh-edu",
    },
  })
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs({ hideOnRoot: true, showCurrentPage: false }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
  ],
  left: [
  ],
  right: [
      Component.RecentNotes({
          title: "Recent Writing",
          limit: 400,
          filter: (f) =>
          !f.slug!.startsWith("unlisted/") && !f.slug!.endsWith("index") && !f.frontmatter?.noindex,
      }),
      Component.TagList(),
      Component.Backlinks(),
      Component.Graph()
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
      Component.Breadcrumbs({showCurrentPage: false}),
      Component.ArticleTitle(),
      Component.ContentMeta(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [],
}
