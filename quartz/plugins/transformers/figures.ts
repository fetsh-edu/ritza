import { QuartzTransformerPlugin } from "../types"
import {SKIP, visit} from "unist-util-visit"
import {ElementContent, Root} from "hast";

export const Figures: QuartzTransformerPlugin = () => {
    return {
        name: "ImageToFigureProcessing",
        htmlPlugins(ctx) {
            return [
                () => {
                    return (tree: Root, file) => {
                        visit(
                            tree,
                            "element",
                            (node, index, parent) => {
                            if (
                                node.tagName === "img" &&
                                node.properties?.alt &&
                                parent &&
                                parent.type === "element" &&
                                parent.tagName === "p" &&
                                index != undefined
                                ) {
                                const caption = node.properties?.alt as string
                                const fig : ElementContent = {
                                    type: 'element',
                                    tagName: 'figure',
                                    properties: {},
                                    children: [
                                        node,
                                        {
                                            type: "element",
                                            tagName: "figcaption",
                                            properties: {},
                                            children: [
                                                {
                                                    type: "text",
                                                    value: caption
                                                }
                                            ]
                                        }
                                    ]
                                }
                                // const emptyDiv : ElementContent = {
                                //     type: 'element',
                                //     tagName: 'div',
                                //     properties: {},
                                //     children: []
                                // }
                                // const emptySpan : ElementContent = {
                                //     type: 'element',
                                //     tagName: 'span',
                                //     properties: {},
                                //     children: []
                                // }
                                // node.tagName = "figure"
                                // node.children = [
                                //     {
                                //         type: "element",
                                //         tagName: "img",
                                //         properties: node.properties,
                                //         children: []
                                //     },
                                //     {
                                //         type: "element",
                                //         tagName: "figcaption",
                                //         properties: {},
                                //         children: [
                                //             {
                                //                 type: "text",
                                //                 value: caption
                                //             }
                                //         ]
                                //     }
                                // ]

                                parent.children.splice(index, 1, fig)
                                return SKIP
                            }
                        })
                    }
                }
            ]
        }
    }
}