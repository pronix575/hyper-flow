"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marker = exports.print = exports.renderCommands = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.renderCommands = (commands) => `
${chalk_1.default.bold.greenBright `available commands:`} ${chalk_1.default.yellowBright.italic(commands.map(c => c.cmd).join(' '))}
    `;
exports.print = (str) => console.log(str);
exports.marker = (name) => `${chalk_1.default.yellowBright.bold.italic `${chalk_1.default.blueBright(name)}$ `}`;
exports.default = { renderCommands: exports.renderCommands, print: exports.print, marker: exports.marker };
