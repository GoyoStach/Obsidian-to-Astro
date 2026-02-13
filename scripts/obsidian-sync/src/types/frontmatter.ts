export interface Frontmatter {
  isExposed?: boolean
  title?: string
  description?: string
  date?: string
  tags?: string[]
  heroImage?: string
  [key: string]: unknown
}

export interface ParsedMarkdownFile {
  filePath: string
  frontmatter: Frontmatter
  content: string
  slug: string
}
