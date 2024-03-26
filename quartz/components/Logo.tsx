import {FullSlug, joinSegments, pathToRoot} from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const Logo: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
    const baseDir = pathToRoot(fileData.slug!)
    const root = (new URL(`https://${cfg.baseUrl ?? "example.com"}`)).pathname as FullSlug
    const logoPath = joinSegments(root, "static/logo.svg")
    return (
        <a href={root}><img src={logoPath} alt={title} className={classNames(displayClass)}/></a>
    )
}

export default (() => Logo) satisfies QuartzComponentConstructor