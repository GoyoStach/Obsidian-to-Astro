/**
 * Convert text to URL-friendly slug
 * @param text - Text to convert
 * @returns Slug-ified text
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Decompose unicode characters
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-+|-+$/g, '') // Trim hyphens from start/end
}

/**
 * Generate slug from file path
 * @param filePath - Full file path
 * @returns Slug generated from filename
 */
export function getSlugFromPath(filePath: string): string {
  const filename = filePath.split('/').pop() || filePath.split('\\').pop() || ''
  const nameWithoutExt = filename.replace(/\.md$/i, '')
  return toSlug(nameWithoutExt)
}
