import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = `
header {
  font-family: var(--headerFont);  
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;
  padding: 0 1.5rem;
  gap: 1.5rem;
  border-bottom: 1px solid var(--lightgray);
}
header a {
    text-decoration: none;
}
header > h1 > a,
header > h1 > a:visited,
header > h1 > a:hover {
    font-weight: 400;
    color: var(--dark) !important;
}
header > a {
    width: 17rem;
}
header > a > img {
    width: 50px;
}

header h1 {
    font-family: var(--headerFont);
    font-size: 1.6rem;
    margin: 0;
    flex: auto;
    text-align: center;
}
`

export default (() => Header) satisfies QuartzComponentConstructor
