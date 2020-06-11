import { Subscriber, SetDataParam } from "./stream.types"

export class Stream<T> {

    constructor(
        private streamData: T,
        private subscrbers: Array<Subscriber<T>> = []
    ) {}

    get data() {
        return this.streamData
    }

    on(name: string, callBack: (data: T) => void): Stream<T> {
        this.addSubscriber({
            name,
            do: callBack
        })

        return this
    }

    addSubscriber(newSubscrber: Subscriber<T>): Stream<T> {

        this.subscrbers.forEach(sub => {
            if (sub.name === newSubscrber.name) { 
                throw new Error('subscriber with that name is already exist') 
            }
        })

        this.subscrbers.push(newSubscrber)

        return this
    }

    unsubscribe(name: string): Stream<T> {
        this.subscrbers = 
        this.subscrbers
            .filter(subscriber => subscriber.name !== name)

        return this
    }    

    setData(callBack: SetDataParam<T>): Stream<T> {
        this.streamData = callBack(this.streamData)
        this.subscrbers
            .forEach(subscriber => 
                subscriber.do(this.streamData)
            )
        
        return this
    }
}

export const safeAddSubscriber = <T>(
    stream: Stream<T>, 
    subscriber: Subscriber<T>, 
    errorHandler?: 
        (e: any) => void
) => {
    try {
        stream.addSubscriber(subscriber)
    } catch (e) {
        errorHandler && errorHandler(e)
    }
}

export default { Stream, safeAddSubscriber }