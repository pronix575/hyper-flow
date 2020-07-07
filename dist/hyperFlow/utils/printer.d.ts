import { ICommand } from '../types/hyper.types';
export declare const renderCommands: (commands: Array<ICommand>) => string;
export declare const print: (str: any) => void;
export declare const marker: (name: string | number) => string;
declare const _default: {
    renderCommands: (commands: ICommand[]) => string;
    print: (str: any) => void;
    marker: (name: string | number) => string;
};
export default _default;
