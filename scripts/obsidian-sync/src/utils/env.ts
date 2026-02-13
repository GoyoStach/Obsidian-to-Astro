import { config } from 'dotenv'
import { resolve } from 'path'
import { existsSync } from 'fs'
import chalk from 'chalk'
import type { SyncConfig } from '../types/config.js'

export function loadConfig(): SyncConfig {
  // Load .env.local from project root
  const envPath = resolve(process.cwd(), '.env.local')

  if (!existsSync(envPath)) {
    throw new Error(
      `.env.local file not found at ${envPath}\n\n` +
        `Please create .env.local with the following variables:\n` +
        chalk.dim(`  OBSIDIAN_PATH=/path/to/your/vault\n`) +
        chalk.dim(`  PROJECT_PATH=src/content/blogPost\n`) +
        chalk.dim(`  IMAGE_PATH=src/Images\n\n`) +
        `See .env.local.example for a template.`
    )
  }

  // Load environment variables
  config({ path: envPath })

  const obsidianPath = process.env.OBSIDIAN_PATH
  const projectPath = process.env.PROJECT_PATH || 'src/content/blogPost'
  const imagePath = process.env.IMAGE_PATH || 'src/Images'

  if (!obsidianPath) {
    throw new Error(
      `OBSIDIAN_PATH not defined in .env.local\n\n` +
        `Please add:\n` +
        chalk.dim(`  OBSIDIAN_PATH=/path/to/your/vault`)
    )
  }

  // Validate paths exist
  if (!existsSync(obsidianPath)) {
    throw new Error(
      `Obsidian vault not found at: ${obsidianPath}\n\n` +
        `Please check your OBSIDIAN_PATH in .env.local`
    )
  }

  const fullProjectPath = resolve(process.cwd(), projectPath)
  const fullImagePath = resolve(process.cwd(), imagePath)

  if (!existsSync(fullProjectPath)) {
    throw new Error(
      `Project path not found: ${fullProjectPath}\n\n` +
        `Please check your PROJECT_PATH in .env.local`
    )
  }

  if (!existsSync(fullImagePath)) {
    throw new Error(
      `Image path not found: ${fullImagePath}\n\n` +
        `Please check your IMAGE_PATH in .env.local`
    )
  }

  return {
    obsidianPath: resolve(obsidianPath),
    projectPath: fullProjectPath,
    imagePath: fullImagePath
  }
}
