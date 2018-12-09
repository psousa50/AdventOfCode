import { getBoundRectangle, rectangle, calcArea } from "./common";
import { input } from "./inputs/input";

const calcNumberOfPoints = (maxDistance: number) => {
  const r = getBoundRectangle(input)

  const distancesTop: number[] = new Array(r.bottomRight.x - r.topLeft.x + 1).fill(0)
  const distancesBottom: number[] = new Array(r.bottomRight.x - r.topLeft.x + 1).fill(0)
  const distancesLeft: number[] = new Array(r.bottomRight.y - r.topLeft.y + 1).fill(0)
  const distancesRight: number[] = new Array(r.bottomRight.y - r.topLeft.y + 1).fill(0)

  const x1 = r.topLeft.x
  const x2 = r.bottomRight.x
  const y1 = r.topLeft.y
  const y2 = r.bottomRight.y
  const top = calcArea(input, rectangle(x1, y1, x2, y1))
  const bottom = calcArea(input, rectangle(x1, y2, x2, y2))
  const left = calcArea(input, rectangle(x1, y1, x1, y2))
  const right = calcArea(input, rectangle(x2, y1, x2, y2))

}

calcNumberOfPoints(32)