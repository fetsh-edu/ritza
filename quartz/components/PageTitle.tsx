import {FullSlug, joinSegments, pathToRoot} from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const PageTitle: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
  const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
  const baseDir = pathToRoot(fileData.slug!)
  const root = (new URL(`https://${cfg.baseUrl ?? "example.com"}`)).pathname as FullSlug
  return (
    <h2 class={classNames(displayClass)}>
      <a href={root}>{title}</a>
    </h2>
  )
}

export default (() => PageTitle) satisfies QuartzComponentConstructor
