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
        private contexts: Array<HyperContext> = []
    ) {}

    pushContext(context: HyperContext): Hyper {
        this.contexts.push(context)

        this.setCurrentContext(context)

        return this
    }

    popContext(): Hyper {
        this.back()

        return this
    }

    back(): Hyper {

        this.contexts[1] && this.contexts.pop()

        if (this.contexts[0]) { 
            
            this.setCurrentContext(
                    this.contexts[this.contexts.length - 1]
            )
        }

        return this
    }

    next(context: HyperContext): Hyper {

        this.pushContext(context)

        return this
    }

    setCurrentContext(context: HyperContext): Hyper {

        this.currentContext = context
        return this
    }

    get currentCtx() {
        return this.currentContext
    }

    listen(): Hyper {

        console.log(this.contexts)
        
        if (!this.currentContext) {
            
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

        return this
    }
}

export const createHyper = (): Hyper => {
    return new Hyper()
}

const exp = { Hyper, createHyper }

export default exp

