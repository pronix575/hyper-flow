import { Hyper } from "./hyperFlow/Hyper/Hyper";
import { HyperContext } from "./hyperFlow/Hyper/HyperContext";

const app = new Hyper()

const ctx = new HyperContext('start')
const ctx2 = new HyperContext('end')


ctx.on('/', (ctx) => {
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

