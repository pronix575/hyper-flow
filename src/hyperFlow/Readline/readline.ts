import { createInterface } from 'readline'
import { ReadlineResponse } from '../types/readline.types'
import readlineSync from 'readline-sync'

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

export const questionAsync = question

export const questionSync = (text: string = ''): string => {
    return readlineSync.question(text) 
}
