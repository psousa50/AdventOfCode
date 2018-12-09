import { Rectangle, getClosestSpot, rectangle, getBoundRectangle, calcArea } from "./common"

import { input } from "./inputs/input";

const calcBorderAreas = (r: Rectangle) => {
  const x1 = r.topLeft.x
  const x2 = r.bottomRight.x
  const y1 = r.topLeft.y
  const y2 = r.bottomRight.y
  const top = calcArea(input, rectangle(x1, y1, x2, y1))
  const bottom = calcArea(input, rectangle(x1, y2, x2, y2))
  const left = calcArea(input, rectangle(x1, y1, x1, y2))
  const right = calcArea(input, rectangle(x2, y1, x2, y2))

  return top.map((v, i) => v + bottom[i] + left[i] + right[i])
}

const part1 = () => {
  const boundRectangle = getBoundRectangle(input)

  const areasCount = calcArea(input, boundRectangle)
  const borderAreasCount = calcBorderAreas(boundRectangle)

  const finalAreas = areasCount.filter((a, i) => borderAreasCount[i] === 0)

  console.log("=====>", Math.max(...finalAreas))
}

part1()
