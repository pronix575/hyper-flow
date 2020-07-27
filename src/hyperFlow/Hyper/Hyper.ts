import { IHyper } from "../types/hyper.types"
import { HyperContext } from './HyperContext'
import { questionAsync } from "../Readline/readline"
import { error } from "../utils/errorsGenerator"
import chalk from "chalk"

export class Hyper implements IHyper {

    static question = questionAsync
    
    constructor (
        private _contexts: Array<HyperContext> = [],
        private _stopWord: string = 'exit',
        private _defaultContext: HyperContext = new HyperContext() 
    ) {}

    get defaultContext() {
        return this._defaultContext
    }

    get contexts() {
        return this._contexts
    }
    
    get stopWord() {
        return this._stopWord
    }
    
    set stopWord(sw: string) {
        this._stopWord = sw
    }

    next(context: HyperContext): Hyper {

        this._contexts = [ ...this._contexts, context]

        return this
    }

    back(): Hyper {

        if (this._contexts?.length > 1) this._contexts?.pop()
        
        return this
    }
        
    clearContexts(): Hyper {

        this._contexts = []

        return this
    }

    private context() {
        return this.contexts[this.contexts.length - 1]
    }

    listen(): Hyper {

        if (!this.context()) {
            
            throw error(
                `${ chalk.blueBright(`you need to set current context`) }`,
                'ctx error'
            ) 
        }

        questionAsync(this.context().marker)
        
            .then(response => {
                
                if (response === this.stopWord) return
                
                this.context().run(response, this)
                
                this.listen()
            })

        return this
    }
}

export const createHyper = (): Hyper => {
    return new Hyper()
}

export default { Hyper, createHyper }