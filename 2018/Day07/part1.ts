import { input } from "./inputs/input"
import { first } from "../Common/util"
import { getSteps, getNextSteps, applyStep, Steps } from "./common"

const part1 = (input: string[][]) => {
  const steps = getSteps(input)

  const solve = (steps: Steps, solution: Steps): Steps => {
    const nextStep = first(getNextSteps(steps))
    const newSteps = nextStep ? applyStep(nextStep.name, steps) : undefined
    return newSteps && nextStep ? solve(newSteps, [...solution, nextStep]) : solution
  }

  const solution = solve(steps, []).reduce((acc, cur) => acc + cur.name, "")

  console.log(solution)
}

part1(input)