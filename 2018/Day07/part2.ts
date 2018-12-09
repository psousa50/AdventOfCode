import { input } from "./inputs/input"
import { getSteps, Steps, getNextSteps, applyStep, orderStepsByCount } from "./common"
// const MAX_WORKERS = 2
// const BASETIME = 0
const MAX_WORKERS = 5
const BASETIME = 60

interface Worker {
  stepName: string
  timeCompleted: number
}

type Workers = ReadonlyArray<Worker>

const getStepTime = (stepName: string) => stepName.charCodeAt(0) - 65 + 1 + BASETIME

const orderWorkerAsc = (w1: Worker, w2: Worker) => w1.timeCompleted - w2.timeCompleted

const addWorkers = (workers: Workers, steps: Steps, time: number) => {
  const nextSteps = getNextSteps(steps)
  const newWorkers = nextSteps
    .filter(s => !workers.some(w => w.stepName === s.name))
    .map(s => ({ stepName: s.name, timeCompleted: time + getStepTime(s.name) }))
  return [...workers, ...newWorkers].slice(0, MAX_WORKERS).sort(orderWorkerAsc)
}

const processWorkers = (workers: Workers, steps: Steps, time: number): number => {
  const [first, ...rest] = addWorkers(workers, steps, time)

  return first ? processWorkers(rest, applyStep(first.stepName, steps), first.timeCompleted) : time
}

const part2 = (input: string[][]) => {
  const steps = getSteps(input)

  const time = processWorkers([], steps, 0)

  console.log(time)
}

part2(input)
