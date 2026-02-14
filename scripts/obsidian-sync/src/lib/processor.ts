import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import ora from 'ora'
import chalk from 'chalk'
import type { Frontmatter } from '../types/frontmatter.js'
import type { ProcessingStats } from '../types/config.js'
import { getSlugFromPath } from '../utils/slug.js'
import { transformContent } from './transformer.js'
import { processImages, processHeroImage } from './image-processor.js'
import { enhanceFrontmatter } from './frontmatter.js'

export async function processFiles(
  filePaths: string[],
  targetDir: string,
  imageDir: string,
  vaultRoot: string
): Promise<ProcessingStats> {
  const startTime = Date.now()
  const stats: ProcessingStats = {
    filesProcessed: 0,
    imagesCopied: 0,
    imagesDeduplicated: 0,
    tagsExtracted: 0,
    linksConverted: 0,
    executionTime: 0,
    warnings: []
  }

  const existingImageFiles = new Set<string>()
  const spinner = ora('Processing files...').start()

  for (let i = 0; i < filePaths.length; i++) {
    const filePath = filePaths[i]
    spinner.text = `Processing files... [${i + 1}/${filePaths.length}]`

    try {
      // Read and parse file
      const fileContent = readFileSync(filePath, 'utf-8')
      const { data, content } = matter(fileContent)
      const frontmatter = data as Frontmatter

      // Transform content (links and extract tags)
      const transformResult = transformContent(content)
      stats.linksConverted += transformResult.linksConverted

      // Process hero image from frontmatter
      const heroImageResult = processHeroImage(
        frontmatter.heroImage,
        filePath,
        imageDir,
        existingImageFiles,
        vaultRoot
      )
      if (heroImageResult.imageCopied) {
        stats.imagesCopied++
      }
      if (heroImageResult.warning) {
        stats.warnings.push(heroImageResult.warning)
      }

      // Process images in content
      const imageResult = processImages(
        transformResult.content,
        filePath,
        imageDir,
        existingImageFiles,
        vaultRoot
      )
      stats.imagesCopied += imageResult.imagesCopied
      stats.imagesDeduplicated += imageResult.imagesDeduplicated
      stats.warnings.push(...imageResult.warnings)

      // Enhance frontmatter
      const enhancedFrontmatter = enhanceFrontmatter(
        frontmatter,
        content,
        filePath,
        transformResult.tagsExtracted
      )
      stats.tagsExtracted += transformResult.tagsExtracted.length

      // Update hero image path in frontmatter
      enhancedFrontmatter.heroImage = heroImageResult.heroImagePath

      // Generate output filename
      const slug = getSlugFromPath(filePath)
      const outputPath = join(targetDir, `${slug}.md`)

      // Write file with updated frontmatter and content
      const outputContent = matter.stringify(
        imageResult.content,
        enhancedFrontmatter
      )
      writeFileSync(outputPath, outputContent, 'utf-8')

      stats.filesProcessed++
    } catch (error) {
      spinner.fail(`Failed to process: ${filePath}`)
      throw new Error(
        `Error processing ${filePath}: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  spinner.succeed(`Processed ${stats.filesProcessed} files`)

  stats.executionTime = (Date.now() - startTime) / 1000 // Convert to seconds

  return stats
}

export function displaySummary(stats: ProcessingStats): void {
  console.log(chalk.green('\n✓ Sync complete!\n'))

  console.log(chalk.cyan('┌────────────────────────────────────────┐'))
  console.log(
    chalk.cyan('│') +
      '         Summary Statistics             ' +
      chalk.cyan('│')
  )
  console.log(chalk.cyan('├────────────────────────────────────────┤'))
  console.log(
    chalk.cyan('│') +
      `  Files processed:          ${String(stats.filesProcessed).padStart(4)}     ` +
      chalk.cyan('│')
  )
  console.log(
    chalk.cyan('│') +
      `  Images copied:            ${String(stats.imagesCopied).padStart(4)}     ` +
      chalk.cyan('│')
  )
  console.log(
    chalk.cyan('│') +
      `  Images deduplicated:      ${String(stats.imagesDeduplicated).padStart(4)}     ` +
      chalk.cyan('│')
  )
  console.log(
    chalk.cyan('│') +
      `  Tags extracted:           ${String(stats.tagsExtracted).padStart(4)}     ` +
      chalk.cyan('│')
  )
  console.log(
    chalk.cyan('│') +
      `  Links converted:          ${String(stats.linksConverted).padStart(4)}     ` +
      chalk.cyan('│')
  )
  console.log(
    chalk.cyan('│') +
      `  Execution time:         ${stats.executionTime.toFixed(1)}s     ` +
      chalk.cyan('│')
  )
  console.log(chalk.cyan('└────────────────────────────────────────┘\n'))

  if (stats.warnings.length > 0) {
    console.log(chalk.yellow(`⚠️  Warnings (${stats.warnings.length}):`))
    stats.warnings.forEach(warning => {
      console.log(chalk.dim(`  - ${warning}`))
    })
    console.log()
  }
}
