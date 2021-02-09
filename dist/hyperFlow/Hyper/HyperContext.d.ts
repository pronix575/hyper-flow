import { Marker, ICommand, CommandResolve } from "../types/hyper.types";
import { Hyper } from "./Hyper";
export declare class HyperContext {
    private _commands;
    private _nothingList;
    private _marker;
    private _errorHandler;
    constructor(_commands?: Array<ICommand>, _nothingList?: Array<string>, _marker?: Marker, _errorHandler?: (cmd: string) => string);
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
