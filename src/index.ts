import { Hyper, createHyper } from "./hyperFlow/Hyper/Hyper";
import { HyperContext } from "./hyperFlow/Hyper/HyperContext";
import { questionSync } from "./hyperFlow/Readline/readline";

export default { 
    Hyper, 
    createHyper, 
    HyperContext, 
    question: questionSync 
}
