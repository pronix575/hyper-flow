import { createInterface } from 'readline'
import { ReadlineResponse } from '../types/readline.types'
import { question } from 'readline-sync'

export type Question = (text: string) => Promise<ReadlineResponse>

export const questionAsync: Question = (text = '') => {
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

export const questionSync = (text: string = ''): string => {
    return question(text) 
}

export default { question, questionAsync, questionSync }