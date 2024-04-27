import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { FullSlug, SimpleSlug, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { byDateAndAlphabetical } from "./PageList"
import style from "./styles/recentNotes.scss"
import { Date, getDate } from "./Date"
import { GlobalConfiguration } from "../cfg"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

interface Options {
  title?: string
  limit: number
  linkToMore: SimpleSlug | false
  filter: (f: QuartzPluginData) => boolean
  sort: (f1: QuartzPluginData, f2: QuartzPluginData) => number
}

const defaultOptions = (cfg: GlobalConfiguration): Options => ({
  limit: 3,
  linkToMore: false,
  filter: () => true,
  sort: byDateAndAlphabetical(cfg),
})

export default ((userOpts?: Partial<Options>) => {
  const RecentNotes: QuartzComponent = ({
    allFiles,
    fileData,
    displayClass,
    cfg,
  }: QuartzComponentProps) => {
    if (fileData.slug !== "index") {
        return <></>
    }
    const opts = { ...defaultOptions(cfg), ...userOpts }
    const pages = allFiles.filter(opts.filter).sort(opts.sort)
    const remaining = Math.max(0, pages.length - opts.limit)
    return (
      <div class={classNames(displayClass, "recent-notes")}>
        {/*<h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>*/}
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []

            return (
              <li class="recent-li">
                  <article className="card">
                      <a href={resolveRelative(fileData.slug!, page.slug!)}>
                          <figure class="card-right-small">
                              {page.image && (<img src={page.image} alt={title}/>)}
                              <figcaption>
                                  <h3>

                                          {title}

                                  </h3>
                                  {page.description}
                                  <footer>
                                      {page.dates && (
                                          <time><Date date={getDate(cfg, page)!} locale={cfg.locale}/></time>
                                      )}
                                  </footer>

                              </figcaption>
                          </figure>
                      </a>
                  </article>
              </li>
          )
          })}
          </ul>
              {
                  opts.linkToMore && remaining > 0 && (
              <p>
                  <a href={resolveRelative(fileData.slug!, opts.linkToMore)}>
                      {i18n(cfg.locale).components.recentNotes.seeRemainingMore({ remaining })}
            </a>
          </p>
        )}
      </div>
    )
  }

  RecentNotes.css = style
  return RecentNotes
}) satisfies QuartzComponentConstructor
