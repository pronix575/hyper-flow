"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = require("readline");
const readline_sync_1 = require("readline-sync");
exports.questionAsync = (text = '') => {
    const readline = readline_1.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    return new Promise((resolve, reject) => {
        readline.question(text, (answer) => {
            readline.close();
            resolve(answer);
        });
    });
};
exports.questionSync = (text = '') => {
    return readline_sync_1.question(text);
};
exports.default = { question: readline_sync_1.question, questionAsync: exports.questionAsync, questionSync: exports.questionSync };
