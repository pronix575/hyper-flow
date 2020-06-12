import chalk from 'chalk'
import { ICommand } from '../types/hyper.types'

export const renderCommands = (commands: Array<ICommand>): string =>
    `
${ chalk.bold.greenBright`available commands:` } ${ chalk.yellowBright.italic(commands.map(c => c.cmd).join(' ')) }
    `

export const print = (str: any) => console.log(str)
export const renderPermanentMarker = (name: any) => `${ chalk.yellowBright.bold.italic`${ chalk.blueBright(name) }$ ` }`

export default { renderCommands, print, renderPermanentMarker }