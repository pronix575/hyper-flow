"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHyper = exports.Hyper = void 0;
const readline_1 = require("../Readline/readline");
const errorsGenerator_1 = require("./standartModules/errorsGenerator");
const chalk_1 = __importDefault(require("chalk"));
class Hyper {
    constructor(_stopWord = 'exit', currentContext, contexts = []) {
        this._stopWord = _stopWord;
        this.currentContext = currentContext;
        this.contexts = contexts;
    }
    get stopWord() {
        return this._stopWord;
    }
    set stopWord(sw) {
        this._stopWord = sw;
    }
    pushContext(context) {
        this.contexts.push(context);
        this.setCurrentContext(context);
        return this;
    }
    next(context) {
        this.pushContext(context);
        return this;
    }
    back() {
        this.contexts[1] && this.contexts.pop();
        if (this.contexts[0]) {
            this.setCurrentContext(this.contexts[this.contexts.length - 1]);
        }
        return this;
    }
    clearContexts() {
        this.contexts = [];
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
        readline_1.questionAsync(this.currentContext.marker)
            .then((response) => {
            var _a;
            if (response === this.stopWord)
                return;
            (_a = this.currentContext) === null || _a === void 0 ? void 0 : _a.run(response);
            this.listen();
        });
        return this;
    }
}
exports.Hyper = Hyper;
Hyper.question = readline_1.questionAsync;
exports.createHyper = () => {
    return new Hyper();
};
exports.default = { Hyper, createHyper: exports.createHyper };
