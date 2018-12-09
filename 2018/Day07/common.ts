export interface Step {
  name: string
  deps: string[]
  count: number
}

export type Steps = ReadonlyArray<Step>

export const getSteps = (input: string[][]): Steps =>
  input
    .reduce((acc, link) => [...acc, link[0], link[1]], [])
    .filter((s, i, a) => a.indexOf(s) === i)
    .map(s => ({ name: s, deps: input.filter(link => link[1] === s).map(link => link[0]), count: 0 }))
    .map(s => ({ ...s, count: s.deps.length }))

export const orderStepsByName = (s1: Step, s2: Step) => s1.name.charCodeAt(0) - s2.name.charCodeAt(0)

export const orderStepsByCount = (s1: Step, s2: Step) => s1.count - s2.count

export const getNextSteps = (steps: Steps) =>
  steps
    .filter(s => s.count === 0)
    .slice()
    .sort(orderStepsByName)

export const applyStep = (stepName: string, steps: Steps) =>
  steps
    .filter(s => s.name !== stepName)
    .map(s => ({ ...s, count: s.deps.some(d => d === stepName) ? s.count - 1 : s.count }))
