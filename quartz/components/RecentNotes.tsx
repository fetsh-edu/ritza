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
        <h3>{opts.title ?? i18n(cfg.locale).components.recentNotes.title}</h3>
        <ul class="recent-ul">
          {pages.slice(0, opts.limit).map((page) => {
            const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
            const tags = page.frontmatter?.tags ?? []

            return (
              <li class="recent-li">
                <article>
                    <figure class="card-right-small">
                        <img src={page.image ?? "data:image/webp;base64,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"} alt={title} />
                        <figcaption>
                            <h3><a href={resolveRelative(fileData.slug!, page.slug!)} className="internal">{title}</a>
                            </h3>
                            {page.description}
                            <footer>
                                {page.dates && (
                                    <p className="meta"><Date date={getDate(cfg, page)!} locale={cfg.locale}/></p>)}
                            </footer>
                            
                        </figcaption>
                    </figure>
                </article>
              </li>
            )
          })}
        </ul>
          {opts.linkToMore && remaining > 0 && (
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
