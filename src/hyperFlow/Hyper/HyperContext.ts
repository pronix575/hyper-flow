import { Marker, ICommand, CommandResolve } from "../types/hyper.types"
import { error } from "../utils/errorsGenerator"
import chalk from "chalk"

export class HyperContext {

    constructor (
        private _marker: Marker = '',
        private commands: Array<ICommand> = [],
        private _errorHandler: (cmd: string) => string = 
            (cmd) => error(`no such a command '${ chalk.blueBright(cmd) }'`, 1),
        private _nothingList: Array<string> = []
    ) {}

    get marker() {
        return this._marker
    }

    set marker(pm: Marker) {
        this._marker = pm
    }
    
    get cmds() {
        return this.commands
    }

    set cmds(commands: Array<ICommand>) {
        this.commands = commands
    }

    get errorHandler() {
        return this._errorHandler
    }

    set errorHandler(eh: (cmd: string) => string) {
        this.errorHandler = eh
    }

    get nothingList() {
        return this._nothingList
    }

    set nothingList(strings: Array<string>) {
        this._nothingList = strings
    }
        
    private addCommand(command: ICommand): HyperContext {

        const cmd = this.commands.find(cmd => cmd.cmd === command.cmd)

        if (cmd) {

            this.commands = this.commands.map(cmd => {
                
                if (cmd.cmd === command.cmd) {
                    cmd = command
                }
                
                return cmd
            })

            return this
        }
            
        this.commands.push(command)

        return this
    }

    on(cmd: string, resolve: CommandResolve): HyperContext {
        this.addCommand({ cmd, resolve })
        return this
    }

    default(resolve: CommandResolve): HyperContext {

        const cmd = this.commands.find(cmd => cmd.cmd === 'default')

        if (!cmd) {

            this
                .commands
                .push({ cmd: 'default', resolve })

            return this
        }

        this.commands = this.commands.map(cmd => {

            if (cmd.cmd === 'default') cmd = { ...cmd, resolve }

            return cmd
        })

        return this
    }

    run(cmd: string): HyperContext {
        if (cmd || cmd === '') {
            const command = 
                this
                    .commands
                    ?.find(command => command.cmd === cmd)
            
            command?.resolve(this)

            if (!command) {
                const nothingListMatch = this.nothingList.find(str => str === cmd)
                if (nothingListMatch || nothingListMatch === '') return this

                const newCommand = 
                    this
                        .commands
                        .find(command => command.cmd === 'default')
                
                newCommand?.resolve(this, cmd)

                !newCommand && console.log(
                    this.errorHandler(cmd)
                )
            }    
        }
        
        return this
    }   

    public nothing(...strings: Array<string>) {
        
        this._nothingList = [ ...this._nothingList, ...strings ]
        
        return this
    }
}

export default { HyperContext }