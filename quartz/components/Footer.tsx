import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
        <footer class={`${displayClass ?? ""}`}>
            <ul>
                {Object.entries(links).map(([text, link]) => (
                    <li>
                        <a href={link}>{text}</a>
                    </li>
                ))}
            </ul>
            <p class="copyright">
                <a property="dct:title"
                   rel="cc:attributionURL"
                   href="https://sloths.run"
                >sloths.run</a> by <a rel="cc:attributionURL dct:creator"
                   property="cc:attributionName"
                   href="https://fetsh.me"
                >fetsh</a> is licensed under <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
                   target="_blank"
                   rel="license noopener noreferrer"
                   style="display:inline-block;"
                >Attribution 4.0 International
                </a> and is made with love, <a href="https://obsidian.md/">Obsidian</a> and <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>
            </p>
        </footer>
    )
  }

    Footer.css = style
    return Footer
}) satisfies QuartzComponentConstructor
