"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.question = exports.readline = exports.HyperContext = exports.Hyper = void 0;
const Hyper_1 = __importDefault(require("./hyperFlow/Hyper/Hyper"));
const HyperContext_1 = __importDefault(require("./hyperFlow/Hyper/HyperContext"));
const readline_1 = __importDefault(require("./hyperFlow/Readline/readline"));
exports.Hyper = Hyper_1.default.Hyper;
exports.HyperContext = HyperContext_1.default.HyperContext;
exports.readline = readline_1.default;
exports.question = readline_1.default.questionSync;
