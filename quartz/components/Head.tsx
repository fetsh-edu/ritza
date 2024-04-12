import { i18n } from "../i18n"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { googleFontHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const title = fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
    const description =
      fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description
    const { css, js } = externalResources

    const pageTitle = cfg.pageTitle
    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/logo.svg")
    const ogImage = fileData.frontmatter?.image ?? "static/og-image.png"
    const canonicalURL = `https://${cfg.baseUrl}/${fileData.slug}`
    const ogImagePath = `https://${cfg.baseUrl}/${ogImage}`
    const ogImageAlt = fileData.frontmatter?.imageAlt as string
    return (
        <head>
            <title>{title}</title>
            <meta charSet="utf-8" />
            {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
                <>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link rel="stylesheet" href={googleFontHref(cfg.theme)}/>
                </>
            )}
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

            <meta property="og:title" content={title}/>
            <meta property="og:type" content="article"/>
            {cfg.baseUrl && <meta property="og:image" content={ogImagePath}/>}
            {cfg.baseUrl && <meta property="og:url" content={canonicalURL}/>}
            <meta name="twitter:card" content="summary_large_image"/>

            <meta property="og:description" content={description}/>
            <meta property="og:site_name" content={pageTitle}/>
            {ogImageAlt && <meta name="twitter:image:alt" content={ogImageAlt}/>}

            <link rel="icon" href={iconPath}/>
            <link rel="apple-touch-icon" sizes="180x180" href="/static/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
            <link rel="canonical" href={canonicalURL}/>
            <meta name="description" content={description}/>
            <meta name="generator" content="Love, Obsidian and Quartz"/>
            {css.map((href) => (
                <link key={href} href={(href + "?date=" + (new Date()).toISOString())} rel="stylesheet"
                      type="text/css" />
            ))}
            {js
                .filter((resource) => resource.loadTime === "beforeDOMReady")
                .map((res) => JSResourceToScriptElement(res))}
        </head>
    )
  }

    return Head
}) satisfies QuartzComponentConstructor
