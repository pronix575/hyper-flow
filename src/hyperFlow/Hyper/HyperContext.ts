import { Marker, ICommand, CommandResolve } from "../types/hyper.types"
import { error } from "../utils/errorsGenerator"
import chalk from "chalk"
import { Hyper } from "./Hyper"

export class HyperContext {

    constructor (
        private _marker: Marker = '',
        private _commands: Array<ICommand> = [],
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
        return this._commands
    }

    set cmds(commands: Array<ICommand>) {
        this._commands = commands
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

        const cmd = this._commands.find(cmd => cmd.cmd === command.cmd)

        if (cmd) {

            this._commands = this._commands.map(cmd => {
                
                if (cmd.cmd === command.cmd) cmd = command
                
                return cmd
            })

            return this
        }
            
        this._commands.push(command)

        return this
    }

    on(cmd: string, resolve: CommandResolve): HyperContext {
        this.addCommand({ cmd, resolve })
        return this
    }

    default(resolve: CommandResolve): HyperContext {

        const cmd = this._commands.find(cmd => cmd.cmd === 'default')

        if (!cmd) {

            this
                ._commands
                .push({ cmd: 'default', resolve })

            return this
        }

        this._commands = this._commands.map(cmd => {

            if (cmd.cmd === 'default') cmd = { ...cmd, resolve }

            return cmd
        })

        return this
    }

    run(cmd: string, app?: Hyper): HyperContext {
        
        if (cmd || cmd === '') {
            
            const command = 
                this
                    ._commands
                    ?.find(command => command.cmd === cmd)
            
            command?.resolve(this)

            if (command) return this
                
            const nothingListMatch = 
                
                this
                    .nothingList
                    .find(str => str === cmd)
            
            if (nothingListMatch || nothingListMatch === '') return this

            const newCommand = 
                
                this
                    ._commands
                    .find(command => command.cmd === 'default')
            
            newCommand?.resolve(this, cmd)

            if (!newCommand) {

                app && app.defaultContext.run(cmd)

                !app && console.log(this.errorHandler(cmd))
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

const ctx = new HyperContext()