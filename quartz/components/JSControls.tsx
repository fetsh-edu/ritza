import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Options {
    children: QuartzComponent[]
}
export default ((opts?: Options) => {
    const JSControls: QuartzComponent = (componentData: QuartzComponentProps) => {
        if (opts) {
            return <div class="with-css" style="display: none;">
                {opts.children.map((BodyComponent) => (
                    <BodyComponent {...componentData} />
                ))}
            </div>
        } else {
            return <></>
        }
    }


    return JSControls
}) satisfies QuartzComponentConstructor