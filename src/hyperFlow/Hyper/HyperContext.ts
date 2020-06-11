import { PermanentMarker, ICommand } from "../types/hyper.types"
import { error } from "./standartModules/errorsGenerator"
import chalk from "chalk"

export class HyperContext {

    constructor (
        private nameOfCtx: string,
        private permanentMarkerOfCtx: PermanentMarker = () => '',
        private stopWordOfCtx: string = 'exit',
        private commands: Array<ICommand> = [], 
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
        
    addCommand(command: ICommand): HyperContext {
        this.commands.push(command)

        return this
    }

    on(cmd: string, resolve: (ctx: HyperContext) => void): HyperContext {
        this.commands.push({ cmd, resolve })
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
                
                    newCommand?.resolve(this)

                    !newCommand && console.log(
                        error(`no such a command '${ chalk.blueBright(cmd) }'`, 1)
                    )
            }    
        }
        
        return this
    }
    
}