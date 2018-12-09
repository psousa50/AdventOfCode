import { input } from "./inputs/input"
import { LettersCounts, countLetters } from "./common"

const part1 = (input: string[]) => {
  const letterCounts = input.map(s => countLetters(s))

  const l2 = letterCounts.filter(lc => lc.some(c => c === 2)).length
  const l3 = letterCounts.filter(lc => lc.some(c => c === 3)).length

  console.log(l2 * l3)
}

part1(input)