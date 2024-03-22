import {joinSegments, pathToRoot} from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"

const Logo: QuartzComponent = ({ fileData, cfg, displayClass }: QuartzComponentProps) => {
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title
    const baseDir = pathToRoot(fileData.slug!)
    const logoPath = joinSegments(baseDir, "static/logo.svg")
    return (
        <a href={baseDir}><img src={logoPath} alt={title} className={classNames(displayClass)}/></a>
    )
}

export default (() => Logo) satisfies QuartzComponentConstructor