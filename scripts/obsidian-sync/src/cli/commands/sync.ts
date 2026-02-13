import chalk from 'chalk'
import { loadConfig } from '../../utils/env.js'
import { discoverFiles } from '../../lib/discovery.js'
import { confirmContinue } from '../../utils/prompt.js'
import { purgeAllContent } from '../../lib/file-system.js'
import { processFiles, displaySummary } from '../../lib/processor.js'

export async function syncCommand(): Promise<void> {
  console.log(
    chalk.cyan('\n╔════════════════════════════════════════════════╗')
  )
  console.log(
    chalk.cyan('║') +
      '      Obsidian → Astro Sync Utility v1.0       ' +
      chalk.cyan('║')
  )
  console.log(
    chalk.cyan('╚════════════════════════════════════════════════╝\n')
  )

  // Load configuration
  const config = loadConfig()

  // Phase 1: Discovery
  const result = await discoverFiles(config.obsidianPath)

  console.log(chalk.green('✓ Discovery complete'))
  console.log(chalk.dim(`  → Found ${result.totalFiles} markdown files`))
  console.log(
    chalk.cyan(
      `  → ${result.exposedFiles.length} files marked with isExposed: true`
    )
  )
  console.log(chalk.dim(`  → ${result.skippedFiles} files will be skipped\n`))

  if (result.exposedFiles.length === 0) {
    console.log(chalk.yellow('⚠️  No files found with isExposed: true'))
    console.log(
      chalk.dim(
        '   Add "isExposed: true" to frontmatter in your Obsidian files.\n'
      )
    )
    return
  }

  // Get user confirmation
  const shouldContinue = await confirmContinue('Continue with sync?')

  if (!shouldContinue) {
    console.log(chalk.yellow('\n⏸️  Sync cancelled by user.\n'))
    return
  }

  // Phase 2: Purge old content
  purgeAllContent(config.projectPath, config.imagePath)

  // Phase 3: Process and transform files
  const stats = await processFiles(
    result.exposedFiles,
    config.projectPath,
    config.imagePath
  )

  // Phase 4: Display summary
  displaySummary(stats)

  console.log(chalk.green('💡 Next steps:'))
  console.log(chalk.dim("   1. Run 'npm run build' to verify Astro build"))
  console.log(
    chalk.dim('   2. Check transformed content in src/content/blogPost/')
  )
  console.log(chalk.dim('   3. Review images in src/Images/\n'))
}
