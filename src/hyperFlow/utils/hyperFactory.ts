import { HyperContext } from "../Hyper/HyperContext";

export function generateContexts(amount: number): Array<HyperContext> {

    const contexts: Array<HyperContext> = []

    for (let i = 0; i < amount; i++) {
        contexts.push(new HyperContext())
    }

    return contexts
}