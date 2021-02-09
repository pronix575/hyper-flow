"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHyper = exports.Hyper = void 0;
const HyperContext_1 = require("./HyperContext");
const readline_1 = require("../Readline/readline");
const errorsGenerator_1 = require("../utils/errorsGenerator");
const chalk_1 = __importDefault(require("chalk"));
class Hyper {
    constructor(_contexts = [], _stopWord = "exit", _defaultContext = new HyperContext_1.HyperContext()) {
        this._contexts = _contexts;
        this._stopWord = _stopWord;
        this._defaultContext = _defaultContext;
    }
    get defaultContext() {
        return this._defaultContext;
    }
    get contexts() {
        return this._contexts;
    }
    get stopWord() {
        return this._stopWord;
    }
    set stopWord(sw) {
        this._stopWord = sw;
    }
    next(context) {
        this._contexts = [...this._contexts, context];
        return this;
    }
    back() {
        var _a, _b;
        if (((_a = this._contexts) === null || _a === void 0 ? void 0 : _a.length) > 1)
            (_b = this._contexts) === null || _b === void 0 ? void 0 : _b.pop();
        return this;
    }
    clearContexts() {
        this._contexts = [];
        return this;
    }
    context() {
        return this.contexts[this.contexts.length - 1];
    }
    listen() {
        if (!this.context()) {
            throw errorsGenerator_1.error(`${chalk_1.default.blueBright(`you need to set current context`)}`, "ctx error");
        }
        readline_1.questionAsync(this.context().marker).then((response) => {
            if (response === this.stopWord)
                return;
            this.context().run(response, this);
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
