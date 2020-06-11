"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("../Readline/readline");
const errorsGenerator_1 = require("./standartModules/errorsGenerator");
class Hyper {
    constructor(commands = [], stopWord = 'exit', permanentMarker) {
        this.commands = commands;
        this.stopWord = stopWord;
        this.permanentMarker = permanentMarker;
    }
    addCommand(command) {
        this.commands.push(command);
        return this;
    }
    run(cmd) {
        if (cmd) {
            const command = this
                .commands
                ?.find(command => command.cmd === cmd);
            command?.resolve();
            if (!command) {
                const newCommand = this
                    .commands
                    .find(command => command.cmd === 'default');
                newCommand?.resolve();
                !newCommand && console.log(errorsGenerator_1.error('no such a command', 1));
            }
        }
        return this;
    }
    listen(text) {
        if (text === this.stopWord)
            return this;
        readline_1.question(text || this.permanentMarker).then((response) => {
            this
                .run(response)
                .listen(this.permanentMarker);
        });
        return this;
    }
}
exports.Hyper = Hyper;
const app = new Hyper();
