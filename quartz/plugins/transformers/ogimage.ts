import {QuartzTransformerPlugin} from "../types";

export const OgImage: QuartzTransformerPlugin = (userOpts) => {
    return {
        name: "",
        htmlPlugins() {
            return []
        }
    }
}