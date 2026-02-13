import chalk from 'chalk'
import { loadConfig } from '../../utils/env.js'
import { purgeAllContent } from '../../lib/file-system.js'
import { doubleConfirm } from '../../utils/prompt.js'

export async function cleanCommand(): Promise<void> {
  console.log(
    chalk.cyan('\n╔════════════════════════════════════════════════╗')
  )
  console.log(
    chalk.cyan('║') +
      '          Clean Synced Content                  ' +
      chalk.cyan('║')
  )
  console.log(
    chalk.cyan('╚════════════════════════════════════════════════╝\n')
  )

  // Load configuration
  const config = loadConfig()

  // Double confirmation required
  const confirmed = await doubleConfirm('delete ALL blog posts and images')

  if (!confirmed) {
    console.log(chalk.yellow('\n⏸️  Clean cancelled by user.\n'))
    return
  }

  // Perform purge
  try {
    purgeAllContent(config.projectPath, config.imagePath)
    console.log(chalk.green('✓ Clean complete!\n'))
  } catch (error) {
    throw new Error(
      `Clean failed: ${error instanceof Error ? error.message : String(error)}`
    )
  }
}
