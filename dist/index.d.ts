export declare const Hyper: typeof import("./hyperFlow/Hyper/Hyper").Hyper;
export declare const HyperContext: typeof import("./hyperFlow/Hyper/HyperContext").HyperContext;
export declare const readline: {
    question: typeof import("readline-sync").question;
    questionAsync: import("./hyperFlow/Readline/readline").Question;
    questionSync: (text?: string) => string;
};
export declare const question: (text?: string) => string;
