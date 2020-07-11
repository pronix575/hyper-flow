import { Marker, ICommand, CommandResolve } from "../types/hyper.types";
export declare class HyperContext {
    private permanentMarkerOfCtx;
    private commands;
    private errorHandlerOfCtx;
    constructor(permanentMarkerOfCtx?: Marker, commands?: Array<ICommand>, errorHandlerOfCtx?: (cmd: string) => string);
    get marker(): Marker;
    set marker(pm: Marker);
    get cmds(): Array<ICommand>;
    set cmds(commands: Array<ICommand>);
    get errorHandler(): (cmd: string) => string;
    set errorHandler(eh: (cmd: string) => string);
    private addCommand;
    on(cmd: string, resolve: CommandResolve): HyperContext;
    default(resolve: CommandResolve): HyperContext;
    run(cmd: string): HyperContext;
}
declare const _default: {
    HyperContext: typeof HyperContext;
};
export default _default;
