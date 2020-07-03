"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = exports.readline = exports.error = exports.question = exports.HyperContext = exports.Hyper = void 0;
const Hyper_1 = __importDefault(require("./hyperFlow/Hyper/Hyper"));
const HyperContext_1 = __importDefault(require("./hyperFlow/Hyper/HyperContext"));
const readline_1 = __importDefault(require("./hyperFlow/Readline/readline"));
const errorsGenerator_1 = __importDefault(require("./hyperFlow/Hyper/standartModules/errorsGenerator"));
const printer_1 = __importDefault(require("./hyperFlow/utils/printer"));
exports.Hyper = Hyper_1.default.Hyper;
exports.HyperContext = HyperContext_1.default.HyperContext;
exports.question = readline_1.default.questionSync;
exports.error = errorsGenerator_1.default.error;
exports.readline = readline_1.default;
exports.utils = printer_1.default;
