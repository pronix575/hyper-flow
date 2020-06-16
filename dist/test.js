"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Hyper_1 = require("./hyperFlow/Hyper/Hyper");
const HyperContext_1 = require("./hyperFlow/Hyper/HyperContext");
const _1 = require(".");
const app = new Hyper_1.Hyper();
const ctx = new HyperContext_1.HyperContext();
const ctx2 = new HyperContext_1.HyperContext();
ctx.on('/', () => {
    console.log('hello');
    app.pushContext(ctx2);
});
ctx2
    .on('/', () => console.log('end'))
    .on('/ask', () => {
    // question must be a sync call ->
    const response = _1.question('what is your name?');
    // processing response
    console.log(response);
})
    .default((ctx, cmd) => {
    console.log(cmd);
});
app.next(ctx);
app.listen();
