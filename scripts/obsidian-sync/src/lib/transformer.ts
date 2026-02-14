import { toSlug } from '../utils/slug.js'

export interface TransformResult {
  content: string
  linksConverted: number
  tagsExtracted: string[]
}

/**
 * Transform Obsidian wiki links to markdown links
 * Converts [[page]] to [page](/page)
 * Converts [[page|Display Text]] to [Display Text](/page)
 */
export function transformWikiLinks(content: string): {
  content: string
  count: number
} {
  let count = 0

  const transformed = content.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (match, target, display) => {
      count++

      // Remove .md extension if present
      const cleanTarget = target.trim().replace(/\.md$/i, '')

      // Extract only the filename (last part after /) for the slug
      const filename = cleanTarget.split('/').pop() || cleanTarget

      // Convert filename to slug
      const slug = toSlug(filename)

      // Use display text if provided, otherwise use the filename without path
      const linkText = display ? display.trim() : filename

      return `[${linkText}](/${slug})`
    }
  )

  return { content: transformed, count }
}

/**
 * Extract hashtags from markdown content
 * Matches #tag but not in code blocks or URLs
 */
export function extractHashtags(content: string): string[] {
  const tags = new Set<string>()

  // Remove code blocks first to avoid false matches
  const contentWithoutCode = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]+`/g, '') // Remove inline code

  // Match #tag pattern (word boundary required)
  const tagRegex = /(?:^|\s)#([a-zA-Z][a-zA-Z0-9_-]*)/g
  let match

  while ((match = tagRegex.exec(contentWithoutCode)) !== null) {
    tags.add(match[1].toLowerCase())
  }

  return Array.from(tags)
}

/**
 * Transform content for web compatibility
 */
export function transformContent(content: string): TransformResult {
  // Transform wiki links
  const { content: contentWithLinks, count: linksConverted } =
    transformWikiLinks(content)

  // Extract hashtags
  const tagsExtracted = extractHashtags(contentWithLinks)

  return {
    content: contentWithLinks,
    linksConverted,
    tagsExtracted
  }
}
