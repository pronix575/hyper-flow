![](/screenshots/logo.png)

# HyperFlow.js
![](https://img.shields.io/github/package-json/v/pronix575/hyper-flow) ![](https://img.shields.io/npm/dt/@pronix/hyper-flow.svg)
### Framework for building progressive console applications on node.js platform

## Getting started
```bash
$ yarn add @pronix/hyper-flow
#or
$ npm i @pronix/hyper-flow
```
```javascript
const { Hyper, HyperContext } = require('@pronix/hyper-flow')
// or
// import { Hyper, HyperContext } from '@pronix/hyper-flow''

const app = new Hyper()
const ctx = new HyperContext()

ctx.on('/', () => console.log('hello'))

app.pushContext(ctx)
app.listen()
```

## Documentation 📄
### using
at first, you need to create application
```typescript
import { Hyper } from '@pronix/hyper-flow'

const app = new Hyper()
```
next you need to create ctx - this is the object that will process the commands, you can create more than one context and then you can change current context in runtime 
```typescript
import { Hyper, HyperContext, utils } from '@pronix/hyper-flow'

const app = new Hyper()

const ctx1 = new HyperContext(utils.marker('ctx1'))
const ctx2 = new HyperContext(utils.marker('ctx2'))

ctx1
    .on('', () => {})
    .on('/next', () => app.next(ctx2))
    .on('/back', () => app.back())

ctx2
    .on('', () => {})
    .on('/next', () => app.next(ctx1))
    .on('/back', () => app.back())

app
    .next(ctx1)
    .listen()
```
also you can use async code in your program, it will works, because the readline is async
```typescript
const app = new Hyper()

const ctx = new HyperContext()
const ctx2 = new HyperContext()


ctx.on('/', () => {
    console.log('hello')
    app.next(ctx2)
})

ctx2
    .on('/', () => console.log('end'))
    .on('/ask', () => {
        // question must be a sync call ->
        const response = question('what is your name?')
        // processing response
        console.log(response)
    })
    .default((ctx, cmd) => {
        console.log(cmd)
    })

app.next(ctx)

// you can use async side-effects ->
setTimeout(() => {
    console.log('async call')
}, 3000)

app.listen()
```
marker is a tool, which writes the text in comand line befor every command, it is a string
```typescript
import { error } from "@pronix/hyper-flow";

ctx.marker = 'ctx1:\\> '

ctx
    .on('', () => {})
    .on('/', () => console.log('hello'))
    
    .on('/error', () => console.log(error('error handler', 1)))
    
    .on('exit', () => process.exit(0))
    .on('/exit', ctx => ctx.run('exit'))

app
    .next(ctx)
    .listen()
```
stop word:
```typescript
ctx
    .on('/', () => console.log('hello world'))

app.next(ctx)

app.stopWord = 'stop'

app.listen()
```

## for developing
## setup ⚙️
```bash
$ git clone http://github.com/pronix575/hyper-flow
$ cd hyper-flow

$ yarn setup
# or
$ npm setup
```
## build 🛠
```bash
$ yarn build
```
## start 🚀
```bash
$ yarn start
```

## developing 🧱
```bash
$ yarn dev:build
```
```bash
$ yarn dev:start
```
