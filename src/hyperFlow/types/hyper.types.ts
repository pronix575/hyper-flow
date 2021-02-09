import { HyperContext } from "../Hyper/HyperContext";

export interface ICommand {
  cmd: string;
  resolve: (ctx: HyperContext, cmd?: string) => void;
}

export type Marker = () => string;
export type CommandResolve = (ctx: HyperContext, cmd?: string) => void;
