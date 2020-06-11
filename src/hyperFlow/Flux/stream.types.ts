export interface Subscriber<T> {
    name: string
    do: (data: T) => void
} 

export type SetDataParam<T> = (prev: T) => T
