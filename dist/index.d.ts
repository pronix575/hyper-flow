export declare const Hyper: typeof import("./hyperFlow/Hyper/Hyper").Hyper;
export declare const HyperContext: typeof import("./hyperFlow/Hyper/HyperContext").HyperContext;
export declare const question: (text?: string) => string;
export declare const error: (message: string, type: string | number) => string;
export declare const readline: {
    question: typeof import("readline-sync").question;
    questionAsync: import("./hyperFlow/Readline/readline").Question;
    questionSync: (text?: string) => string;
};
export declare const utils: {
    renderCommands: (commands: import("./hyperFlow/types/hyper.types").ICommand[]) => string;
    print: (str: any) => void;
    renderPermanentMarker: (name: any) => string;
};
