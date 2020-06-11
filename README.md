![Version](https://img.shields.io/badge/version-0.1.4-g.svg)

![](/screenshots/logo.png)
# HyperFlow.js
### Framework for building progressive console applications on node.js platform

## Getting started (JavaScript)
```bash
yarn add @pronix/hyper-flow
#or
npm i @pronix/hyper-flow
```
```javascript
const { Hyper, HyperContext } = require('@pronix/hyper-flow')

const app = new Hyper()
const ctx = new HyperContext('/start')

ctx.on('/', () => console.log('hello'))

app.setCurrentContext(ctx)
app.listen()
```

## Documentation 📄 (TypeScript)
### how it works?
at first, you need to create application
```typescript
import { Hyper } from '@pronix/hyper-flow'

const app = new Hyper()
```
next you need to create ctx - this is the object that will process the commands, you can create more than one context and then you can change current context in runtime 
```typescript
import { Hyper, HyperContext } from '@pronix/hyper-flow'

const app = new Hyper()

const ctx = new HyperContext('start')

ctx.on('/', (ctx) => {
    console.log('hello')
})

app.addContext(ctx)
app.setCurrentContext(ctx)

app.listen()
```
also you can use async code in your program, it will works, because the readline is async
```typescript
const ctx = new HyperContext('start')
const ctx2 = new HyperContext('end')


ctx.on('/', () => {
    console.log('hello')
    app.setCurrentContext(ctx2)
})

ctx.permanentMarker = () => 'ctx1:\\>'

ctx2.on('/', () => console.log('end'))

ctx2.permanentMarker = () => 'ctx2:\\>'

app.addContext(ctx)
app.setCurrentContext(ctx)

setTimeout(() => {
    console.log('async call')
}, 3000)

app.listen()
```
in runtime:
```bash
ctx1:\>

[error] code: 1
message: no such a command ''

ctx1:\>/async call

hello
ctx2:\>
```
permanent marker is a tool, which writes the text in comand line befor every command, it is a function, which returns string, and it let to create dynamyc marker
```typescript
import { error } from "./hyperFlow/Hyper/standartModules/errorsGenerator";

ctx.permanentMarker = () => 'ctx1:\\> '

ctx
    .on('', () => {})
    .on('/', (ctx) => console.log('hello'))
    
    .on('/error', () => console.log(error('error handler', 1)))
    
    .on('exit', () => process.exit(0))
    .on('/exit', (ctx) => ctx.run('exit'))

    .default((ctx, cmd) => {
        console.log(cmd)
    })

app.setCurrentContext(ctx)
app.listen()
```
## for developing
## setup ⚙️
```bash
git clone http://github.com/pronix575/hyper-flow
cd hyper-flow

yarn setup
# or
npm setup
```
## build 🛠
```bash
yarn build
```
## start 🚀
```bash
yarn start
```

## developing 🧱
```bash
yarn dev:build
```
```bash
yarn dev:start
```
