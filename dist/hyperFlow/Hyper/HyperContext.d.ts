import { PermanentMarker, ICommand, CommandResolve } from "../types/hyper.types";
export declare class HyperContext {
    private permanentMarkerOfCtx;
    private stopWordOfCtx;
    private commands;
    private errorHandlerOfCtx;
    constructor(permanentMarkerOfCtx?: PermanentMarker, stopWordOfCtx?: string, commands?: Array<ICommand>, errorHandlerOfCtx?: (cmd: string) => string);
    get permanentMarker(): PermanentMarker;
    set permanentMarker(pm: PermanentMarker);
    get stopWord(): string;
    set stopWord(sw: string);
    get cmds(): Array<ICommand>;
    set cmds(commands: Array<ICommand>);
    get errorHandler(): (cmd: string) => string;
    set errorHandler(eh: (cmd: string) => string);
    addCommand(command: ICommand): HyperContext;
    on(cmd: string, resolve: CommandResolve): HyperContext;
    default(resolve: CommandResolve): HyperContext;
    run(cmd: string): HyperContext;
}
declare const _default: {
    HyperContext: typeof HyperContext;
};
export default _default;
