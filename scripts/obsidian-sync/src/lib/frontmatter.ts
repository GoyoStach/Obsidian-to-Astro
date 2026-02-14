import { statSync } from 'fs'
import { basename } from 'path'
import type { Frontmatter } from '../types/frontmatter.js'
import { toSlug } from '../utils/slug.js'

/**
 * Extract title from content (first H1 heading)
 */
export function extractTitleFromContent(content: string): string | null {
  const h1Match = content.match(/^#\s+(.+)$/m)
  return h1Match ? h1Match[1].trim() : null
}

/**
 * Generate title from filename as fallback
 */
export function generateTitleFromFilename(filePath: string): string {
  const filename = basename(filePath, '.md')
  // Convert slug back to title (capitalize, replace hyphens with spaces)
  return filename
    .split(/[-_]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Enhance frontmatter with missing fields
 */
export function enhanceFrontmatter(
  existing: Frontmatter,
  content: string,
  filePath: string,
  extractedTags: string[]
): Frontmatter {
  const enhanced: Frontmatter = { ...existing }

  // Title: from frontmatter → H1 heading → filename
  if (!enhanced.title) {
    enhanced.title =
      extractTitleFromContent(content) || generateTitleFromFilename(filePath)
  }

  // Description: generate from title
  if (!enhanced.description) {
    enhanced.description = `Description of ${enhanced.title}`
  }

  // Date: from file modification time
  if (!enhanced.date) {
    const stats = statSync(filePath)
    enhanced.date = stats.mtime.toISOString().split('T')[0] // YYYY-MM-DD
  }

  // Tags: merge existing with extracted hashtags
  const existingTags = enhanced.tags || []
  const allTags = [...new Set([...existingTags, ...extractedTags])]
  enhanced.tags = allTags

  // HeroImage: add default if missing
  if (!enhanced.heroImage) {
    enhanced.heroImage = '../../Images/preserved/astro_banner.png'
  }

  return enhanced
}
