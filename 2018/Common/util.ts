export const first = <T>(values: ReadonlyArray<T>) => values.length > 0 ? values[0] : undefined

export const ifInfiniteThen0 = (n: number) => (isFinite(n) ? n : 0)

export const orderAsc = (n1: number, n2: number) => n1 - n2

export const range = (min: number, max: number) => Array.from(Array(max - min + 1).keys()).map(v => v + min)


