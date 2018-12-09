import { input } from "./Inputs/demo"
import { range } from "../Common/util"

interface State {
  position: number
  metadataSum: number
}

const processTree = (tree: number[], state: State): State => {
  const nodeCount = tree[state.position]
  const metaCount = tree[state.position + 1]
  const newState = range(1, nodeCount).reduce((acc, _) => processTree(tree, acc), {
    ...state,
    position: state.position + 2,
  })

  const metaValues = tree.slice(newState.position, newState.position + metaCount)
  const sum = metaValues.reduce((sum, v) => sum + v, 0)
  return {
    position: newState.position + metaCount,
    metadataSum: newState.metadataSum + sum,
  }
}

const part1 = () => {
  const solution = processTree(input, { position: 0, metadataSum: 0 })

  console.log(solution.metadataSum)
}

part1()

