import { existsSync, copyFileSync, statSync } from 'fs'
import { join, dirname, basename, extname, resolve } from 'path'

export interface ImageReference {
  originalPath: string
  resolvedPath: string | null
  altText: string
  isObsidian: boolean
}

export interface ImageProcessResult {
  content: string
  imagesCopied: number
  imagesDeduplicated: number
  warnings: string[]
}

/**
 * Extract image references from markdown content
 */
export function extractImageReferences(
  content: string,
  sourceFilePath: string,
  vaultRoot?: string
): ImageReference[] {
  const images: ImageReference[] = []
  const sourceDir = dirname(sourceFilePath)
  const actualVaultRoot = vaultRoot || findVaultRoot(sourceDir)

  // Pattern 1: Obsidian ![[image.png]]
  const obsidianRegex = /!\[\[([^\]]+)\]\]/g
  let match

  while ((match = obsidianRegex.exec(content)) !== null) {
    const filename = match[1].trim()
    images.push({
      originalPath: filename,
      resolvedPath: resolveImagePath(filename, sourceDir, actualVaultRoot),
      altText: basename(filename, extname(filename)),
      isObsidian: true
    })
  }

  // Pattern 2: Standard markdown ![alt](path)
  const markdownRegex = /!\[([^\]]*)\]\(([^)]+)\)/g

  while ((match = markdownRegex.exec(content)) !== null) {
    const altText = match[1]
    const imagePath = match[2].trim()

    images.push({
      originalPath: imagePath,
      resolvedPath: resolveImagePath(imagePath, sourceDir, actualVaultRoot),
      altText: altText || basename(imagePath, extname(imagePath)),
      isObsidian: false
    })
  }

  return images
}

/**
 * Resolve image path relative to source file
 */
function resolveImagePath(
  imagePath: string,
  sourceDir: string,
  vaultRoot: string | null = null
): string | null {
  // Decode URL encoding (e.g., %20 -> space)
  const decodedPath = decodeURIComponent(imagePath)

  // Try absolute path first
  if (existsSync(decodedPath)) {
    return resolve(decodedPath)
  }

  // Try relative to source file
  const relativePath = join(sourceDir, decodedPath)
  if (existsSync(relativePath)) {
    return resolve(relativePath)
  }

  // If path starts with a number pattern like "9999 Images/" or "9999%20Images/",
  // strip that prefix and try again
  let cleanedPath = decodedPath
  const prefixMatch = decodedPath.match(/^\d+\s+(.+)$/)
  if (prefixMatch) {
    cleanedPath = prefixMatch[1]

    // Try with cleaned path from vault root
    if (vaultRoot) {
      const fromVaultRoot = join(vaultRoot, cleanedPath)
      if (existsSync(fromVaultRoot)) {
        return resolve(fromVaultRoot)
      }
    }

    // Try relative with cleaned path
    const relativeCleanPath = join(sourceDir, cleanedPath)
    if (existsSync(relativeCleanPath)) {
      return resolve(relativeCleanPath)
    }
  }

  // Try from vault root if provided
  if (vaultRoot) {
    const fromVaultRoot = join(vaultRoot, decodedPath)
    if (existsSync(fromVaultRoot)) {
      return resolve(fromVaultRoot)
    }
  }

  // Try common Obsidian attachment folders
  const attachmentFolders = [
    'attachments',
    'Attachments',
    'images',
    'Images',
    'assets',
    'Assets'
  ]

  for (const folder of attachmentFolders) {
    const folderPath = join(sourceDir, folder, basename(decodedPath))
    if (existsSync(folderPath)) {
      return resolve(folderPath)
    }

    // Try parent directory
    const parentPath = join(dirname(sourceDir), folder, basename(decodedPath))
    if (existsSync(parentPath)) {
      return resolve(parentPath)
    }

    // Try from vault root
    if (vaultRoot) {
      const vaultFolderPath = join(vaultRoot, folder, basename(decodedPath))
      if (existsSync(vaultFolderPath)) {
        return resolve(vaultFolderPath)
      }
    }
  }

  return null
}

/**
 * Find vault root by looking for .obsidian folder
 */
function findVaultRoot(startPath: string): string | null {
  let currentPath = startPath
  const root = resolve('/')

  while (currentPath !== root) {
    const obsidianPath = join(currentPath, '.obsidian')
    if (existsSync(obsidianPath)) {
      return currentPath
    }
    currentPath = dirname(currentPath)
  }

  return null
}

/**
 * Copy image with deduplication
 */
export function copyImageWithDeduplication(
  sourcePath: string,
  targetDir: string,
  existingFiles: Set<string>
): string {
  const originalFilename = basename(sourcePath)
  const ext = extname(originalFilename)
  const base = basename(originalFilename, ext)

  let targetFilename = originalFilename
  let counter = 1

  // Find unique filename
  while (existingFiles.has(targetFilename.toLowerCase())) {
    targetFilename = `${base}-${counter}${ext}`
    counter++
  }

  const targetPath = join(targetDir, targetFilename)
  copyFileSync(sourcePath, targetPath)
  existingFiles.add(targetFilename.toLowerCase())

  return targetFilename
}

/**
 * Process all images in content
 */
export function processImages(
  content: string,
  sourceFilePath: string,
  targetImageDir: string,
  existingFiles: Set<string>,
  vaultRoot?: string
): ImageProcessResult {
  const images = extractImageReferences(content, sourceFilePath, vaultRoot)
  const warnings: string[] = []
  let imagesCopied = 0
  let imagesDeduplicated = 0
  let processedContent = content

  for (const image of images) {
    if (!image.resolvedPath) {
      warnings.push(
        `Image not found: ${image.originalPath} (decoded: ${decodeURIComponent(image.originalPath)})`
      )
      continue
    }

    try {
      // Copy image with deduplication
      const originalFilename = basename(image.resolvedPath)
      const newFilename = copyImageWithDeduplication(
        image.resolvedPath,
        targetImageDir,
        existingFiles
      )

      imagesCopied++
      if (newFilename !== originalFilename) {
        imagesDeduplicated++
      }

      // Update content with new image path
      const newImagePath = `../../Images/${newFilename}`

      if (image.isObsidian) {
        // Replace ![[image]] with ![altText](path)
        const obsidianPattern = new RegExp(
          `!\\[\\[${image.originalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\]`,
          'g'
        )
        processedContent = processedContent.replace(
          obsidianPattern,
          `![${image.altText}](${newImagePath})`
        )
      } else {
        // Replace ![alt](oldPath) with ![alt](newPath)
        const markdownPattern = new RegExp(
          `!\\[${image.altText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\]\\(${image.originalPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`,
          'g'
        )
        processedContent = processedContent.replace(
          markdownPattern,
          `![${image.altText}](${newImagePath})`
        )
      }
    } catch (error) {
      warnings.push(
        `Failed to copy image ${image.originalPath}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  return {
    content: processedContent,
    imagesCopied,
    imagesDeduplicated,
    warnings
  }
}
