import { range } from "../Common/util"

const MAX_MARBLE = 23 * 6
const N_PLAYERS = 3

interface State {
  marbles: number[]
  currentMarblePos: number
  currentPlayer: number
  playersScore: number[]
}

const insert = <T>(values: ReadonlyArray<T>, value: T, pos: number) => [
  ...values.slice(0, pos),
  value,
  ...values.slice(pos),
]

const replace = <T>(values: ReadonlyArray<T>, value: T, pos: number) => [
  ...values.slice(0, pos),
  value,
  ...values.slice(pos + 1),
]

const remove = <T>(values: ReadonlyArray<T>, pos: number) => [...values.slice(0, pos), ...values.slice(pos + 1)]

const part1 = () => {
  const initialState: State = {
    marbles: [0],
    currentMarblePos: 0,
    currentPlayer: 0,
    playersScore: new Array(N_PLAYERS).fill(0),
  }

  const move = (pos: number, step: number, range: number) => (pos + range + step) % range || range

  const final = range(1, MAX_MARBLE).reduce((state, marble) => {
    const newPos = move(state.currentMarblePos, 2, state.marbles.length)
    const newPosFor23 = move(state.currentMarblePos, -7, state.marbles.length)
    if (marble % 23 === 0) {
      console.log(state.marbles[newPosFor23], marble, state.currentMarblePos, newPosFor23)
    }
    return marble % 23 !== 0
      ? {
          ...state,
          marbles: insert(state.marbles, marble, newPos),
          currentMarblePos: newPos,
          currentPlayer: (state.currentPlayer + 1) % N_PLAYERS,
        }
      : {
          ...state,
          marbles: remove(state.marbles, newPosFor23),
          currentMarblePos: newPosFor23,
          currentPlayer: (state.currentPlayer + 1) % N_PLAYERS,
          playersScore: replace(
            state.playersScore,
            state.playersScore[state.currentPlayer] + marble + state.marbles[newPosFor23],
            state.currentPlayer,
          ),
        }
  }, initialState)

  // console.log("=====>\n", final)
  //  console.log("=====>\n", Math.max(...final.playersScore))
}

part1()

// console.log("=====>\n", replace([1, 2, 3, 4], 10, 6))

// console.log("=====>\n", -2 % 5)
