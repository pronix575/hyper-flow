import { IHyper } from "../types/hyper.types";
import { HyperContext } from './HyperContext';
export declare class Hyper implements IHyper {
    private _stopWord;
    private currentContext?;
    private contexts;
    readonly question: import("../Readline/readline").Question;
    constructor(_stopWord?: string, currentContext?: HyperContext, contexts?: Array<HyperContext>);
    pushContext(context: HyperContext): Hyper;
    get stopWord(): string;
    set stopWord(sw: string);
    popContext(): Hyper;
    back(): Hyper;
    next(context: HyperContext): Hyper;
    setCurrentContext(context: HyperContext): Hyper;
    get currentCtx(): HyperContext;
    listen(): Hyper;
}
export declare const createHyper: () => Hyper;
declare const exp: {
    Hyper: typeof Hyper;
    createHyper: () => Hyper;
};
export default exp;
