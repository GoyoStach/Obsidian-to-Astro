import { readdirSync, statSync, unlinkSync } from 'fs'
import { join, resolve, relative } from 'path'
import chalk from 'chalk'

export interface PurgeResult {
  filesDeleted: number
  directoriesProcessed: string[]
}

/**
 * Safely purge all files in a directory except .gitkeep
 * @param targetDir - Directory to purge
 * @returns Statistics about purge operation
 */
export function purgeDirectory(targetDir: string): PurgeResult {
  const resolvedDir = resolve(targetDir)
  let filesDeleted = 0
  const directoriesProcessed: string[] = []

  // Safety check: ensure we're not deleting root or home directory
  const projectRoot = resolve(process.cwd())
  const relPath = relative(projectRoot, resolvedDir)

  if (!relPath || relPath.startsWith('..') || resolvedDir === projectRoot) {
    throw new Error(
      `Safety check failed: Cannot purge directory outside project\n` +
        `  Target: ${resolvedDir}\n` +
        `  Project: ${projectRoot}`
    )
  }

  function purgeRecursive(dir: string): void {
    try {
      const entries = readdirSync(dir)

      for (const entry of entries) {
        const fullPath = join(dir, entry)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          purgeRecursive(fullPath)
          directoriesProcessed.push(fullPath)
        } else if (stat.isFile()) {
          // Preserve .gitkeep files
          if (entry === '.gitkeep') {
            continue
          }

          unlinkSync(fullPath)
          filesDeleted++
        }
      }
    } catch (error) {
      throw new Error(
        `Failed to purge directory: ${dir}\n` +
          `Error: ${error instanceof Error ? error.message : String(error)}`
      )
    }
  }

  purgeRecursive(resolvedDir)

  return {
    filesDeleted,
    directoriesProcessed
  }
}

/**
 * Purge both blog posts and images
 */
export function purgeAllContent(projectPath: string, imagePath: string): void {
  console.log(chalk.cyan('🗑️  Purging old content...\n'))

  try {
    // Purge blog posts
    const blogResult = purgeDirectory(projectPath)
    console.log(chalk.dim(`  → Deleted ${blogResult.filesDeleted} blog posts`))

    // Purge images
    const imageResult = purgeDirectory(imagePath)
    console.log(chalk.dim(`  → Deleted ${imageResult.filesDeleted} images`))

    console.log(chalk.green('  ✓ Preserved .gitkeep files\n'))
  } catch (error) {
    throw new Error(
      `Failed to purge content:\n${error instanceof Error ? error.message : String(error)}`
    )
  }
}
