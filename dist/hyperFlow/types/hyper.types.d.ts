import { HyperContext } from "../Hyper/HyperContext";
export interface ICommand {
    cmd: string;
    resolve: (ctx: HyperContext, cmd?: string) => void;
}
export declare type Marker = () => string;
export declare type CommandResolve = (ctx: HyperContext, cmd?: string) => void;
