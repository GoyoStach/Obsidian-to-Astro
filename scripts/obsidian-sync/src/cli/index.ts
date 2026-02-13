#!/usr/bin/env node

import { Command } from 'commander'
import chalk from 'chalk'
import { syncCommand } from './commands/sync.js'
import { cleanCommand } from './commands/clean.js'

const program = new Command()

program
  .name('obsidian-sync')
  .description('Sync Obsidian vault content to Astro blog')
  .version('1.0.0')

// Sync command
program
  .command('sync')
  .description('Sync Obsidian markdown files to Astro project')
  .action(async () => {
    try {
      await syncCommand()
    } catch (error) {
      console.error(
        chalk.red('\n❌ Error:'),
        error instanceof Error ? error.message : String(error)
      )
      process.exit(1)
    }
  })

// Clean command
program
  .command('clean')
  .description('Clean all synced content (requires confirmation)')
  .action(async () => {
    try {
      await cleanCommand()
    } catch (error) {
      console.error(
        chalk.red('\n❌ Error:'),
        error instanceof Error ? error.message : String(error)
      )
      process.exit(1)
    }
  })

program.parse()
