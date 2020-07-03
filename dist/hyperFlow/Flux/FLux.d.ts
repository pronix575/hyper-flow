import { Subscriber, SetDataParam } from "./stream.types";
export declare class Stream<T> {
    private streamData;
    private subscrbers;
    constructor(streamData: T, subscrbers?: Array<Subscriber<T>>);
    get data(): T;
    on(name: string, callBack: (data: T) => void): Stream<T>;
    addSubscriber(newSubscrber: Subscriber<T>): Stream<T>;
    unsubscribe(name: string): Stream<T>;
    setData(callBack: SetDataParam<T>): Stream<T>;
}
export declare const safeAddSubscriber: <T>(stream: Stream<T>, subscriber: Subscriber<T>, errorHandler?: (e: any) => void) => void;
declare const _default: {
    Stream: typeof Stream;
    safeAddSubscriber: <T>(stream: Stream<T>, subscriber: Subscriber<T>, errorHandler?: (e: any) => void) => void;
};
export default _default;
