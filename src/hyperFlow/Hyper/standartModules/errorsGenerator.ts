import chalk from 'chalk'

export const error = (message: string, type: number | string): string => `
${ chalk.red.bold(`[error] ${ typeof type === 'string' && `type:` || typeof type === 'number' && 'code:' } ${ chalk.reset.italic.redBright(type) }`) }
${ chalk.yellow.bold('message:')} ${ message }
`
