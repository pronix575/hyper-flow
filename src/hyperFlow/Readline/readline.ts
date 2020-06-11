import { createInterface } from 'readline'
import { ReadlineResponse } from '../types/readline.types'

export type Question = (text: string) => Promise<ReadlineResponse>

export const question: Question = (text = '') => {
    const readline = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    return new Promise<ReadlineResponse>((resolve, reject) => {
        readline.question(text, (answer) => {            
            readline.close()
            resolve(answer)
        })
    })
}
