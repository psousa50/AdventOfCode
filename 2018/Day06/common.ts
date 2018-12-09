export interface Point {
  x: number
  y: number
}

export interface Rectangle {
  topLeft: Point
  bottomRight: Point
}

export type Spots = ReadonlyArray<Point>

export const point = (x: number, y: number) => ({ x, y })
export const rectangle = (x1: number, y1: number, x2: number, y2: number) => ({
  topLeft: point(x1, y1),
  bottomRight: point(x2, y2),
})

export const manhattanDistance = (p1: Point, p2: Point) => Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)

export const getBoundRectangle = (spots: Spots) => {
  const xCoords = spots.map(p => p.x)
  const yCoords = spots.map(p => p.y)

  return {
    topLeft: {
      x: Math.min(...xCoords),
      y: Math.min(...yCoords),
    },
    bottomRight: {
      x: Math.max(...xCoords),
      y: Math.max(...yCoords),
    },
  }
}

export const getClosestSpot = (x: number, y: number, possibleFiniteSpots: Spots) => {
  const initialClosest = {
    index: 0,
    distance: Number.MAX_SAFE_INTEGER,
    equal: false,
  }

  const closest = possibleFiniteSpots.reduce((acc, cur, index) => {
    const distance = manhattanDistance({ x, y }, cur)
    return distance <= acc.distance
      ? {
          ...acc,
          distance,
          index,
          equal: distance === acc.distance,
        }
      : acc
  }, initialClosest)

  return closest.equal ? -1 : closest.index
}

export const calcArea = (input: Spots, r: Rectangle) => {
  const areas: number[] = new Array(input.length).fill(0)

  for (let x = r.topLeft.x; x <= r.bottomRight.x; x++) {
    for (let y = r.topLeft.y; y <= r.bottomRight.y; y++) {
      const closest = getClosestSpot(x, y, input)
      if (closest >= 0) areas[closest]++
    }
  }

  return areas
}
