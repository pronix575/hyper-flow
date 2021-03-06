"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperContext = void 0;
const errorsGenerator_1 = require("../utils/errorsGenerator");
const chalk_1 = __importDefault(require("chalk"));
const printer_1 = require("../utils/printer");
class HyperContext {
    constructor(_commands = [], _nothingList = [], _marker = () => printer_1.marker(""), _errorHandler = (cmd) => errorsGenerator_1.error(`no such a command '${chalk_1.default.blueBright(cmd)}'`, 1)) {
        this._commands = _commands;
        this._nothingList = _nothingList;
        this._marker = _marker;
        this._errorHandler = _errorHandler;
    }
    get marker() {
        return this._marker;
    }
    set marker(pm) {
        this._marker = pm;
    }
    get cmds() {
        return this._commands;
    }
    set cmds(commands) {
        this._commands = commands;
    }
    get errorHandler() {
        return this._errorHandler;
    }
    set errorHandler(eh) {
        this.errorHandler = eh;
    }
    get nothingList() {
        return this._nothingList;
    }
    set nothingList(strings) {
        this._nothingList = strings;
    }
    addCommand(command) {
        const cmd = this._commands.find((cmd) => cmd.cmd === command.cmd);
        if (cmd) {
            this._commands = this._commands.map((cmd) => {
                if (cmd.cmd === command.cmd)
                    cmd = command;
                return cmd;
            });
            return this;
        }
        this._commands.push(command);
        return this;
    }
    on(cmd, resolve) {
        this.addCommand({ cmd, resolve });
        return this;
    }
    default(resolve) {
        const cmd = this._commands.find((cmd) => cmd.cmd === "default");
        if (!cmd) {
            this._commands.push({ cmd: "default", resolve });
            return this;
        }
        this._commands = this._commands.map((cmd) => {
            if (cmd.cmd === "default")
                cmd = Object.assign(Object.assign({}, cmd), { resolve });
            return cmd;
        });
        return this;
    }
    run(cmd, app) {
        var _a;
        if (cmd || cmd === "") {
            const command = (_a = this._commands) === null || _a === void 0 ? void 0 : _a.find((command) => command.cmd === cmd);
            command === null || command === void 0 ? void 0 : command.resolve(this);
            if (command)
                return this;
            const nothingListMatch = this.nothingList.find((str) => str === cmd);
            if (nothingListMatch || nothingListMatch === "")
                return this;
            const newCommand = this._commands.find((command) => command.cmd === "default");
            newCommand === null || newCommand === void 0 ? void 0 : newCommand.resolve(this, cmd);
            if (!newCommand) {
                app && app.defaultContext.run(cmd);
                !app && console.log(this.errorHandler(cmd));
            }
        }
        return this;
    }
    nothing(...strings) {
        this._nothingList = [...this._nothingList, ...strings];
        return this;
    }
}
exports.HyperContext = HyperContext;
exports.default = { HyperContext };
