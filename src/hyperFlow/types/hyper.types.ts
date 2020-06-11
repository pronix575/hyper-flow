import { HyperContext } from "../Hyper/HyperContext";

export interface ICommand {
    cmd: string,
    resolve: (ctx: HyperContext) => void
}

export interface IHyper {
    
}

export type PermanentMarker = () => string