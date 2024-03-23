import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import {i18n} from "../i18n";
import style from "./styles/taglist.scss"

const TagList: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (tags && tags.length > 0) {
    return (
        <div class={classNames(displayClass, "tags")}>
            <h4>{i18n(cfg.locale).components.tags.title}</h4>
            <ul>
                {tags.map((tag) => {
                    const linkDest = baseDir + `/tags/${slugTag(tag)}`
                    return (
                        <li>
                            <a href={linkDest} class="internal tag-link">
                                {tag}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
  } else {
      return null
  }
}

TagList.css = style

export default (() => TagList) satisfies QuartzComponentConstructor
