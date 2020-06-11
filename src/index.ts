import hyper from "./hyperFlow/Hyper/Hyper";
import hyperContext from "./hyperFlow/Hyper/HyperContext";
import hyperReadline from "./hyperFlow/Readline/readline";

export const Hyper = hyper.Hyper
export const HyperContext = hyperContext.HyperContext
export const readline = hyperReadline
export const question = hyperReadline.questionSync