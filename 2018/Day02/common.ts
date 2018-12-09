export type LettersCounts = ReadonlyArray<number>

export const countLetters = (s: string) =>
  [...s].reduce((acc, c) => {
    const p = c.charCodeAt(0) - "a".charCodeAt(0)
    return Object.assign([], acc, { [p]: acc[p] + 1 })
  }, Array<number>(26).fill(0))

