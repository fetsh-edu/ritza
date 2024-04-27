import {QuartzTransformerPlugin} from "../types";
import {Root as HTMLRoot} from "hast";
import {Image, Root} from "mdast";
import {visit} from "unist-util-visit";

export const OgImage: QuartzTransformerPlugin = () => {
    return {
        name: "OgImagePlugin",
        markdownPlugins() {
            return [
                () => {
                    return async (tree: Root, file) => {
                        const frontMatterImage = file.data.frontmatter?.image
                        let firstImage : Image | undefined;
                        visit(tree, "image", (node) => {
                            if (!firstImage) {
                                firstImage = node;
                            }
                        })
                        if (typeof frontMatterImage == "string" && frontMatterImage.trim() != "") {
                            file.data.image = frontMatterImage
                        } else {
                            file.data.image =  firstImage?.url
                        }
                    }
                }
            ]
        }
    }
}
declare module "vfile" {
    interface DataMap {
        image: string
    }
}