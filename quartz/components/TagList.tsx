import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import {i18n} from "../i18n";

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

TagList.css = `

.tags {
  max-width: 48rem;
  margin: 0 auto 0rem;
  padding: 0 1.5rem;
}
.tags ul {
  list-style: none;
  display: flex;
  gap: 0.8rem 0.1rem;
  flex-wrap: wrap;
  justify-self: end;
  padding: 0;
}
.article-footer > .tags:before {
    content: "";
    border-top: 0.05rem solid var(--lightgray);
    width: 100%;
    padding-top: 0.5rem;
    display: block;
}
.section-li > .section > .tags > ul {
  justify-content: flex-end;
}
  
.tags > ul > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
  overflow-wrap: normal;
  font-size: 1rem;
  line-height: 1rem;
}

a.internal.tag-link {
    background-color: var(--highlight);
    border-radius: 8px;
    margin: 0 0.1rem;
    padding: 0.3rem 0.4rem;
    font-weight: 700;
    text-decoration: none;
    font-family: var(--headerFont);
    color: var(--darkgray);
}
`

export default (() => TagList) satisfies QuartzComponentConstructor
