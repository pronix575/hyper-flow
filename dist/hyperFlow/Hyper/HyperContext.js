"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HyperContext = void 0;
const errorsGenerator_1 = require("./standartModules/errorsGenerator");
const chalk_1 = __importDefault(require("chalk"));
class HyperContext {
    constructor(permanentMarkerOfCtx = '', commands = [], errorHandlerOfCtx = (cmd) => errorsGenerator_1.error(`no such a command '${chalk_1.default.blueBright(cmd)}'`, 1)) {
        this.permanentMarkerOfCtx = permanentMarkerOfCtx;
        this.commands = commands;
        this.errorHandlerOfCtx = errorHandlerOfCtx;
    }
    get marker() {
        return this.permanentMarkerOfCtx;
    }
    set marker(pm) {
        this.permanentMarkerOfCtx = pm;
    }
    get cmds() {
        return this.commands;
    }
    set cmds(commands) {
        this.commands = commands;
    }
    get errorHandler() {
        return this.errorHandlerOfCtx;
    }
    set errorHandler(eh) {
        this.errorHandlerOfCtx = eh;
    }
    addCommand(command) {
        const cmd = this.commands.find(cmd => cmd.cmd === command.cmd);
        if (cmd) {
            this.commands = this.commands.map(cmd => {
                if (cmd.cmd === command.cmd) {
                    cmd = command;
                }
                return cmd;
            });
            return this;
        }
        this.commands.push(command);
        return this;
    }
    on(cmd, resolve) {
        this.addCommand({ cmd, resolve });
        return this;
    }
    default(resolve) {
        const cmd = this.commands.find(cmd => cmd.cmd === 'default');
        if (!cmd) {
            this
                .commands
                .push({ cmd: 'default', resolve });
            return this;
        }
        this.commands = this.commands.map(cmd => {
            if (cmd.cmd === 'default')
                cmd = Object.assign(Object.assign({}, cmd), { resolve });
            return cmd;
        });
        return this;
    }
    run(cmd) {
        var _a;
        if (cmd || cmd === '') {
            const command = (_a = this
                .commands) === null || _a === void 0 ? void 0 : _a.find(command => command.cmd === cmd);
            command === null || command === void 0 ? void 0 : command.resolve(this);
            if (!command) {
                const newCommand = this
                    .commands
                    .find(command => command.cmd === 'default');
                newCommand === null || newCommand === void 0 ? void 0 : newCommand.resolve(this, cmd);
                !newCommand && console.log(this.errorHandlerOfCtx(cmd));
            }
        }
        return this;
    }
}
exports.HyperContext = HyperContext;
exports.default = { HyperContext };
