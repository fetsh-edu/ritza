import { QuartzTransformerPlugin } from "../types"
import { visit} from "unist-util-visit"
import { ElementContent, Root as HtmlRoot } from "hast";
import { Root as MarkDownRoot } from "mdast";

const calloutRegex = new RegExp(/^\[!(figure)]([+-]?)/)
const isImage = (ec : ElementContent) => { return ec.type == "element" && ec.tagName == "img"};
// const isFigure = (ec : ElementContent) => { return ec.type == "raw" && ec.value.includes('<div class="callout-title-inner"><p>Figure</p></div>') }
const figureRegex = /<div class="callout-title-inner"><p>([\w\s]+)<\/p><\/div>/;
const isFigure = (ec : ElementContent) => { return ec.type == "element" && ec.properties['data-callout'] == "figure" }
export const Figures: QuartzTransformerPlugin = () => {
    return {
        name: "ImageToFigureProcessing",
        htmlPlugins() {
            return [
                () => {
                    return (tree: HtmlRoot, _file) => {
                        visit(
                            tree,
                            // only visit p tags that contain an img element
                            "element",
                            node => {
                                if (node.tagName == "blockquote") {
                                    if (isFigure(node)) {
                                        let className = "bounded"
                                        if (node.children[1].type == "raw") {
                                            const match = node.children[1].value.match(figureRegex)
                                            if (match && match[1] !== "Figure") {
                                                className = match[1]
                                            }
                                        }

                                        let firstPWithImage : ElementContent | undefined;
                                        let otherElements : ElementContent[] = [];
                                        const elements = node.children.filter((ch) => ch.type == "element")
                                        elements.forEach((ch, ind) => {
                                            if (ind == 0 && ch.type == "element" && ch.tagName == "p" && ch.children.some((sch) => isImage(sch))) {
                                                firstPWithImage = ch;
                                            } else {
                                                otherElements.push(ch)
                                            }
                                        })
                                        if (firstPWithImage && firstPWithImage.type == "element") {
                                            let image : ElementContent | undefined;
                                            let withImage : ElementContent[] = [];
                                            firstPWithImage.children.forEach((ch, ind) => {
                                                if (ind == 0 && isImage(ch)) {
                                                    image = ch
                                                } else {
                                                    withImage.push(ch)
                                                }
                                            })
                                            if (image) {
                                                const captions = [...withImage, ...otherElements]
                                                const caption : ElementContent = {
                                                    type: "element",
                                                    tagName: "figcaption",
                                                    properties: {},
                                                    children: captions
                                                }
                                                node.tagName = "figure"
                                                node.children = [image, caption]
                                                node.properties = {
                                                    className: className
                                                }
                                            }
                                        }
                                    }
                                }

                                if (node.tagName === "p") {
                                    let firstImage;
                                    let moreImages : ElementContent[] = [];
                                    let notImages : ElementContent[] = [];
                                    node.children.forEach((ch, ind) => {
                                        if (ind == 0) {
                                            if (isImage(ch)) {
                                                firstImage = ch
                                            }
                                        } else {
                                            if (isImage(ch)) {
                                                moreImages.push(ch)
                                            } else {
                                                notImages.push(ch)
                                            }
                                        }
                                    })
                                    if (firstImage && moreImages.length == 0 && notImages.length > 0) {
                                        const caption : ElementContent = {
                                            type: "element",
                                            tagName: "figcaption",
                                            properties: {},
                                            children: notImages
                                        }
                                        node.tagName = "figure"
                                        node.properties = {
                                            className: "bounded"
                                        }
                                        node.children = [firstImage, caption]
                                    }
                                }
                            }
                        );
                    }
                }
            ]
        }
    }
}