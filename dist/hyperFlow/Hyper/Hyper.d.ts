import { HyperContext } from "./HyperContext";
export declare class Hyper {
    private _contexts;
    private _stopWord;
    private _defaultContext;
    static question: import("../Readline/readline").Question;
    constructor(_contexts?: Array<HyperContext>, _stopWord?: string, _defaultContext?: HyperContext);
    get defaultContext(): HyperContext;
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
