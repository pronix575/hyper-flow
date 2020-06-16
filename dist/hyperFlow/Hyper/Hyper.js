"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("../Readline/readline");
const errorsGenerator_1 = require("./standartModules/errorsGenerator");
const chalk_1 = __importDefault(require("chalk"));
class Hyper {
    constructor(stopWord = 'exit', currentContext, contexts = []) {
        this.stopWord = stopWord;
        this.currentContext = currentContext;
        this.contexts = contexts;
        this.question = readline_1.questionAsync;
    }
    pushContext(context) {
        this.contexts.push(context);
        this.setCurrentContext(context);
        return this;
    }
    popContext() {
        this.back();
        return this;
    }
    back() {
        this.contexts[1] && this.contexts.pop();
        if (this.contexts[0]) {
            this.setCurrentContext(this.contexts[this.contexts.length - 1]);
        }
        return this;
    }
    next(context) {
        this.pushContext(context);
        return this;
    }
    setCurrentContext(context) {
        this.currentContext = context;
        return this;
    }
    get currentCtx() {
        return this.currentContext;
    }
    listen() {
        if (!this.currentContext) {
            throw errorsGenerator_1.error(`${chalk_1.default.blueBright(`you need to set current context`)}`, 'ctx error');
        }
        readline_1.questionAsync(this.currentContext.permanentMarker()).then((response) => {
            var _a, _b;
            if (response === this.stopWord)
                return;
            if (((_a = this.currentContext) === null || _a === void 0 ? void 0 : _a.stopWord) === response)
                return;
            (_b = this.currentContext) === null || _b === void 0 ? void 0 : _b.run(response);
            this.listen();
        });
        return this;
    }
}
exports.Hyper = Hyper;
exports.createHyper = () => {
    return new Hyper();
};
const exp = { Hyper, createHyper: exports.createHyper };
exports.default = exp;
