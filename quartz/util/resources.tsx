import { randomUUID } from "crypto"
import { JSX } from "preact/jsx-runtime"

export type JSResource = {
  loadTime: "beforeDOMReady" | "afterDOMReady"
  moduleType?: "module"
  spaPreserve?: boolean
} & (
  | {
      src: string
      contentType: "external"
    }
  | {
      script: string
      contentType: "inline"
    }
)

export function JSResourceToScriptElement(resource: JSResource, preserve?: boolean): JSX.Element {
  const spaPreserve = preserve ?? resource.spaPreserve
  if (resource.contentType === "external") {
      if (spaPreserve) {
          return (<script key={resource.src} src={resource.src} spa-preserve={spaPreserve} />)
      } else {
        return (<script key={resource.src} src={resource.src} />)
      }
  } else {
      const content = resource.script
      if (spaPreserve) {
          return (<script key={randomUUID()} spa-preserve={spaPreserve} dangerouslySetInnerHTML={{ __html: content }}></script>)
      } else {
          return (<script key={randomUUID()} dangerouslySetInnerHTML={{ __html: content }}></script>)
      }

  }
}

export interface StaticResources {
  css: string[]
  js: JSResource[]
}
