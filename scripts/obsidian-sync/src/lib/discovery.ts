import { glob } from 'glob'
import { readFileSync } from 'fs'
import matter from 'gray-matter'
import chalk from 'chalk'
import type { DiscoveryResult } from '../types/config.js'
import type { Frontmatter } from '../types/frontmatter.js'

export async function discoverFiles(
  obsidianPath: string
): Promise<DiscoveryResult> {
  console.log(chalk.cyan('📁 Scanning Obsidian vault...'))
  console.log(chalk.dim(`   Path: ${obsidianPath}\n`))

  // Find all .md files recursively
  const pattern = `${obsidianPath}/**/*.md`
  const allFiles = await glob(pattern, {
    ignore: ['**/node_modules/**', '**/.git/**', '**/.obsidian/**']
  })

  console.log(chalk.dim(`   Found ${allFiles.length} markdown files`))

  // Parse frontmatter and filter by isExposed
  const exposedFiles: string[] = []
  let skippedFiles = 0

  for (const filePath of allFiles) {
    try {
      const fileContent = readFileSync(filePath, 'utf-8')
      const { data } = matter(fileContent)
      const frontmatter = data as Frontmatter

      if (frontmatter.isExposed === true) {
        exposedFiles.push(filePath)
      } else {
        skippedFiles++
      }
    } catch (error) {
      console.log(chalk.yellow(`   ⚠️  Could not parse: ${filePath}`))
      skippedFiles++
    }
  }

  return {
    totalFiles: allFiles.length,
    exposedFiles,
    skippedFiles
  }
}
