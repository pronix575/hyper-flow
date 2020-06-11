import hyper from "./hyperFlow/Hyper/Hyper";
import hyperContext from "./hyperFlow/Hyper/HyperContext";
import hyperReadline from "./hyperFlow/Readline/readline";
import hyperErrors from './hyperFlow/Hyper/standartModules/errorsGenerator'

export const Hyper = hyper.Hyper
export const HyperContext = hyperContext.HyperContext
export const readline = hyperReadline
export const question = hyperReadline.questionSync
export const error = hyperErrors.error
