import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const title = fileData.frontmatter?.title
  if (title) {
    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  } else {
    return null
  }
}

ArticleTitle.css = `
.article-title {
    text-align: center;
    font-size: 2.6rem;
    font-weight: 400; 
    margin: 1rem 0 0 0;
    padding: 0 1.5rem;
}
`

export default (() => ArticleTitle) satisfies QuartzComponentConstructor
