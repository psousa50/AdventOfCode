import { input } from "./inputs/input"
import { LettersCounts, countLetters } from "./common";

const calcSum = (lettersCount: LettersCounts) =>
  lettersCount.reduce((acc, cur, i, a) => [acc[0] + a[a.length - i - 1] * acc[1], acc[1] * 2], [0, 1])[0]

const calcDiff = (lc1: LettersCounts, lc2: LettersCounts) =>
  lc1.reduce((acc, cur, i) => acc + (lc1[i] === lc2[i] ? 0 : 1), 0)

const getSimilarLetters = (v1: string, v2: string) =>
  [...v1].reduce((acc, _, i) => acc.concat(v1[i] === v2[i] ? v1[i] : ""), "")

const part2 = (input: string[]) => {
  const letterCounts = input.map((value, i) => ({ pos: i, value, counts: countLetters(value), sum: 0 }))
  const letterCountsOrderedBySum = letterCounts
    .map(l => ({ ...l, sum: calcSum(l.counts) }))
    .slice()
    .sort((s1, s2) => s1.sum - s2.sum)

  const letterCountsWithDiffToNext = letterCountsOrderedBySum.map((l, i, a) => ({
    ...l,
    diffToNext: i < letterCounts.length - 2 ? calcDiff(a[i].counts, a[i + 1].counts) : 0,
  }))

  const candidates = letterCountsWithDiffToNext.reduce(
    (acc, cur, i, a) => (cur.diffToNext === 2 ? [...acc, { v1: a[i].value, v2: a[i + 1].value }] : acc),
    [] as { v1: string; v2: string }[],
  )

  const stringsLength = input[0].length

  const similar = candidates.map(c => getSimilarLetters(c.v1, c.v2))
  const solution = similar.filter(s => s.length === stringsLength - 1)[0]

  console.log(solution)

}

part2(input)
