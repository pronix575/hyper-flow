import { Hyper } from "./hyperFlow/Hyper/Hyper";
import { HyperContext } from "./hyperFlow/Hyper/HyperContext";

const app = new Hyper()
const ctx = new HyperContext('start')

import { error } from "./hyperFlow/Hyper/standartModules/errorsGenerator";

ctx.permanentMarker = () => 'ctx1:\\> '

ctx
    .on('', () => {})
    .on('/', (ctx) => console.log('hello'))
    .on('/error', () => console.log(error('error handler', 1)))
    .on('exit', () => process.exit(0))
    .on('/exit', (ctx) => ctx.run('exit'))

app.setCurrentContext(ctx)
app.listen()

