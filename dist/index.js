"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Hyper_1 = __importDefault(require("./hyperFlow/Hyper/Hyper"));
const HyperContext_1 = __importDefault(require("./hyperFlow/Hyper/HyperContext"));
const readline_1 = __importDefault(require("./hyperFlow/Readline/readline"));
const errorsGenerator_1 = __importDefault(require("./hyperFlow/Hyper/standartModules/errorsGenerator"));
const FLux_1 = __importDefault(require("./hyperFlow/Flux/FLux"));
const printer_1 = __importDefault(require("./hyperFlow/utils/printer"));
exports.Hyper = Hyper_1.default.Hyper;
exports.HyperContext = HyperContext_1.default.HyperContext;
exports.Flux = FLux_1.default.Stream;
exports.question = readline_1.default.questionSync;
exports.error = errorsGenerator_1.default.error;
exports.readline = readline_1.default;
exports.utils = printer_1.default;
