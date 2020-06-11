import { ReadlineResponse } from '../types/readline.types';
import { question } from 'readline-sync';
export declare type Question = (text: string) => Promise<ReadlineResponse>;
export declare const questionAsync: Question;
export declare const questionSync: (text?: string) => string;
declare const _default: {
    question: typeof question;
    questionAsync: Question;
    questionSync: (text?: string) => string;
};
export default _default;
