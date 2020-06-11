import { IHyper } from "../types/hyper.types";
import { HyperContext } from './HyperContext';
export declare class Hyper implements IHyper {
    private contexts;
    private stopWord;
    private currentContext?;
    readonly question: import("../Readline/readline").Question;
    constructor(contexts?: Array<HyperContext>, stopWord?: string, currentContext?: HyperContext);
    addContext(context: HyperContext): Hyper;
    setCurrentContext(context: string | HyperContext): Hyper;
    get currentCtx(): HyperContext;
    listen(): void;
}
export declare const createHyper: () => Hyper;
declare const exp: {
    Hyper: typeof Hyper;
    createHyper: () => Hyper;
};
export default exp;
