import { IHyper } from "../types/hyper.types";
import { HyperContext } from './HyperContext';
export declare class Hyper implements IHyper {
    private _stopWord;
    private _contexts;
    static question: import("../Readline/readline").Question;
    constructor(_stopWord?: string, _contexts?: Array<HyperContext>);
    get contexts(): HyperContext[];
    get stopWord(): string;
    set stopWord(sw: string);
    next(context: HyperContext): Hyper;
    back(): Hyper;
    clearContexts(): Hyper;
    private context;
    listen(): Hyper;
}
export declare const createHyper: () => Hyper;
declare const _default: {
    Hyper: typeof Hyper;
    createHyper: () => Hyper;
};
export default _default;
