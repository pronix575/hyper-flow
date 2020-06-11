"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.error = (message, type) => `
${chalk_1.default.red.bold(`[error] ${typeof type === 'string' && `type:` || typeof type === 'number' && 'code:'} ${chalk_1.default.reset.italic.redBright(type)}`)}
${chalk_1.default.yellow.bold('message:')} ${message}
`;
