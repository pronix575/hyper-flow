"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Stream {
    constructor(streamData, subscrbers = []) {
        this.streamData = streamData;
        this.subscrbers = subscrbers;
    }
    get data() {
        return this.streamData;
    }
    on(name, callBack) {
        this.addSubscriber({
            name,
            do: callBack
        });
        return this;
    }
    addSubscriber(newSubscrber) {
        this.subscrbers.forEach(sub => {
            if (sub.name === newSubscrber.name) {
                throw new Error('subscriber with that name is already exist');
            }
        });
        this.subscrbers.push(newSubscrber);
        return this;
    }
    unsubscribe(name) {
        this.subscrbers =
            this.subscrbers
                .filter(subscriber => subscriber.name !== name);
        return this;
    }
    setData(callBack) {
        this.streamData = callBack(this.streamData);
        this.subscrbers
            .forEach(subscriber => subscriber.do(this.streamData));
        return this;
    }
}
exports.Stream = Stream;
exports.safeAddSubscriber = (stream, subscriber, errorHandler) => {
    try {
        stream.addSubscriber(subscriber);
    }
    catch (e) {
        errorHandler && errorHandler(e);
    }
};
exports.default = { Stream, safeAddSubscriber: exports.safeAddSubscriber };
