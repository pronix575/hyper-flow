import { IHyper } from "../types/hyper.types"
import { HyperContext } from './HyperContext'
import { question } from "../Readline/readline"
import { error } from "./standartModules/errorsGenerator"
import chalk from "chalk"

export class Hyper implements IHyper {

    readonly question = question
    
    constructor (
        private contexts: Array<HyperContext> = [],
        private stopWord: string = 'exit',
        private currentContext?: HyperContext,
    ) {}

    addContext(context: HyperContext): Hyper {
        this.contexts.push(context)
        return this
    }

    setCurrentContext(context: string | HyperContext): Hyper {
        if (typeof context === 'string') {
            const ctx = this.contexts.find(c => c.name === context)
            ctx && this.contexts.push(ctx)
            return this
        } 

        // checking on unique ctx
        const ctx = this.contexts.find(c => c === context)
        !ctx && this.contexts.push(context)

        this.currentContext = context
        return this
    }

    listen(): void {
        if (!this.currentContext) throw error(`${ chalk.blueBright(`you need to set current context`) }`, 'current ctx error')

        question(this.currentContext.permanentMarker()).then((response) => {
            if (response === this.stopWord) return
            if (this.currentContext?.stopWord === response) return
            
            this.currentContext?.run(response)
                
            this.listen()
        })
    }
}

const app = new Hyper()
