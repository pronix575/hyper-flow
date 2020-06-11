import { PermanentMarker, ICommand, CommandResolve } from "../types/hyper.types"
import { error } from "./standartModules/errorsGenerator"
import chalk from "chalk"

export class HyperContext {

    constructor (
        private nameOfCtx: string,
        private permanentMarkerOfCtx: PermanentMarker = () => '',
        private stopWordOfCtx: string = 'exit',
        private commands: Array<ICommand> = [],
        private errorHandlerOfCtx: (cmd: string) => string = 
            (cmd) => error(`no such a command '${ chalk.blueBright(cmd) }'`, 1)
    ) {}

    get name(): string {
        return this.nameOfCtx
    }

    set name(name: string) {
        this.name = name
    }

    get permanentMarker() {
        return this.permanentMarkerOfCtx
    }

    set permanentMarker(pm: PermanentMarker) {
        this.permanentMarkerOfCtx = pm
    }

    get stopWord() {
        return this.stopWordOfCtx
    }

    set stopWord(sw: string) {
        this.stopWordOfCtx = sw
    }

    get cmds() {
        return this.commands
    }

    set cmds(commands: Array<ICommand>) {
        this.commands = commands
    }

    get errorHandler() {
        return this.errorHandlerOfCtx
    }

    set errorHandler(eh: (cmd: string) => string) {
        this.errorHandlerOfCtx = eh
    }
        
    addCommand(command: ICommand): HyperContext {

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
                const newCommand = 
                    this
                        .commands
                        .find(command => command.cmd === 'default')
                
                    newCommand?.resolve(this, cmd)

                    !newCommand && console.log(
                        this.errorHandlerOfCtx(cmd)
                    )
            }    
        }
        
        return this
    }
    
}