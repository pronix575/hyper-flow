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
    constructor(contexts = [], stopWord = 'exit', currentContext) {
        this.contexts = contexts;
        this.stopWord = stopWord;
        this.currentContext = currentContext;
        this.question = readline_1.questionAsync;
    }
    addContext(context) {
        this.contexts.push(context);
        return this;
    }
    setCurrentContext(context) {
        if (typeof context === 'string') {
            const ctx = this.contexts.find(c => c.name === context);
            ctx && this.contexts.push(ctx);
            return this;
        }
        // checking on unique ctx
        const ctx = this.contexts.find(c => c === context);
        !ctx && this.contexts.push(context);
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
    }
}
exports.Hyper = Hyper;
exports.createHyper = () => {
    return new Hyper();
};
const exp = { Hyper, createHyper: exports.createHyper };
exports.default = exp;
