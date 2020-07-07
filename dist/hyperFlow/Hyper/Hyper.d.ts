import { IHyper } from "../types/hyper.types";
import { HyperContext } from './HyperContext';
export declare class Hyper implements IHyper {
    private _stopWord;
    private currentContext?;
    private contexts;
    static question: import("../Readline/readline").Question;
    constructor(_stopWord?: string, currentContext?: HyperContext, contexts?: Array<HyperContext>);
    get stopWord(): string;
    set stopWord(sw: string);
    private pushContext;
    next(context: HyperContext): Hyper;
    back(): Hyper;
    clearContexts(): Hyper;
    private setCurrentContext;
    get currentCtx(): HyperContext;
    listen(): Hyper;
}
export declare const createHyper: () => Hyper;
declare const _default: {
    Hyper: typeof Hyper;
    createHyper: () => Hyper;
};
export default _default;
