import prompts from 'prompts'
import chalk from 'chalk'

export async function confirmContinue(message: string): Promise<boolean> {
  const response = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: chalk.yellow(message),
    initial: true
  })

  return response.confirmed === true
}

export async function doubleConfirm(action: string): Promise<boolean> {
  console.log(chalk.red(`\n⚠️  WARNING: This will ${action}!\n`))

  const first = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: chalk.yellow(`Are you sure you want to ${action}?`),
    initial: false
  })

  if (!first.confirmed) {
    return false
  }

  const second = await prompts({
    type: 'confirm',
    name: 'confirmed',
    message: chalk.red(`This action cannot be undone. Continue?`),
    initial: false
  })

  return second.confirmed === true
}
