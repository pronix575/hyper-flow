import { Marker, ICommand, CommandResolve } from "../types/hyper.types";
import { Hyper } from "./Hyper";
export declare class HyperContext {
    private _marker;
    private _commands;
    private _errorHandler;
    private _nothingList;
    constructor(_marker?: Marker, _commands?: Array<ICommand>, _errorHandler?: (cmd: string) => string, _nothingList?: Array<string>);
    get marker(): Marker;
    set marker(pm: Marker);
    get cmds(): Array<ICommand>;
    set cmds(commands: Array<ICommand>);
    get errorHandler(): (cmd: string) => string;
    set errorHandler(eh: (cmd: string) => string);
    get nothingList(): Array<string>;
    set nothingList(strings: Array<string>);
    private addCommand;
    on(cmd: string, resolve: CommandResolve): HyperContext;
    default(resolve: CommandResolve): HyperContext;
    run(cmd: string, app?: Hyper): HyperContext;
    nothing(...strings: Array<string>): this;
}
declare const _default: {
    HyperContext: typeof HyperContext;
};
export default _default;
