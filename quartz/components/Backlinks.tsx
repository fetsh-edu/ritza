import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/backlinks.scss"
import { resolveRelative, simplifySlug } from "../util/path"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const Backlinks: QuartzComponent = ({
  fileData,
  allFiles,
  displayClass,
  cfg,
}: QuartzComponentProps) => {
    const slug = simplifySlug(fileData.slug!)
    const backlinkFiles = allFiles.filter((file) => file.links?.includes(slug))
    if (fileData.slug === "index" || backlinkFiles.length < 1) {
        return <></>
    }
    return (
        <div className={classNames(displayClass, "backlinks")}>
          <h4>{i18n(cfg.locale).components.backlinks.title}</h4>
          <ul>
              {backlinkFiles.length > 0 ? (
                  backlinkFiles.map((f) => (
                      <li>
                          <a href={resolveRelative(fileData.slug!, f.slug!)} className="internal">
                              {f.frontmatter?.title}
                          </a>
                      </li>
                  ))
              ) : (
                  <li>{i18n(cfg.locale).components.backlinks.noBacklinksFound}</li>
              )}
          </ul>
        </div>
    )
}

Backlinks.css = style
export default (() => Backlinks) satisfies QuartzComponentConstructor
