export interface Subscriber<T> {
    name: string;
    do: (data: T) => void;
}
export declare type SetDataParam<T> = (prev: T) => T;
