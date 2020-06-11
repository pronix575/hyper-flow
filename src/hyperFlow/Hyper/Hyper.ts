import { IHyper } from "../types/hyper.types"
import { HyperContext } from './HyperContext'
import { questionAsync } from "../Readline/readline"
import { error } from "./standartModules/errorsGenerator"
import chalk from "chalk"

export class Hyper implements IHyper {

    readonly question = questionAsync
    
    constructor (
        private stopWord: string = 'exit',
        private currentContext?: HyperContext,
    ) {}

    setCurrentContext(context: HyperContext): Hyper {

        this.currentContext = context
        return this
    }

    get currentCtx() {
        return this.currentContext
    }

    listen(): void {
        if (!this.currentContext)  { 
            
            throw error(
                `${ chalk.blueBright(`you need to set current context`) }`, 
                'ctx error'
            ) 
        }

        questionAsync(this.currentContext.permanentMarker()).then((response) => {
            if (response === this.stopWord) return
            if (this.currentContext?.stopWord === response) return
            
            this.currentContext?.run(response)
              
            this.listen()
        })
    }
}

export const createHyper = (): Hyper => {
    return new Hyper()
}

const exp = { Hyper, createHyper }

export default exp

