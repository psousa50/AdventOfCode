import { input } from "./Inputs/input"
import { range } from "../Common/util"

interface State {
  position: number
  nodeValue: number
  childrenValues: number[]
}

const processTree = (tree: number[], state: State): State => {
  const nodeCount = tree[state.position]
  const metaCount = tree[state.position + 1]
  const newState = range(1, nodeCount).reduce(
    acc => {
      const state = processTree(tree, acc)
      return {
        ...state,
        childrenValues: [...acc.childrenValues, state.nodeValue],
      }
    },
    {
      ...state,
      position: state.position + 2,
      childrenValues: [] as number[],
    },
  )

  const metaValues = tree.slice(newState.position, newState.position + metaCount)
  return {
    ...newState,
    position: newState.position + metaCount,
    nodeValue:
      nodeCount === 0
        ? metaValues.reduce((sum, v) => sum + v, 0)
        : metaValues.reduce(
            (acc, cur) => acc + (cur <= newState.childrenValues.length ? newState.childrenValues[cur - 1] : 0),
            0,
          ),
  }
}

const part2 = () => {
  const solution = processTree(input, { position: 0, nodeValue: 0, childrenValues: [] })

  console.log(solution.nodeValue)
}

part2()
