import isNumber from './isNumber'

/**
 * Creates an array of numbers (positive and/or negative) progressing
 * from start up to, but not including, end.
 *
 * @param start - the start of the range
 * @param end - the end of the range
 * @param step - the value to increment or decrement by
 * @returns array of numbers
 */
function range(start: number, end?: number, step?: number): number[] {
  let startPos: number = 0
  let endPos: number = 0
  if (isNumber(start) && isNumber(end)) {
    startPos = start
    endPos = <number>end
  } else {
    startPos = 0
    endPos = start
  }

  const increment = step ?? 1

  const size = Math.floor((endPos - startPos) / increment)
  return Array.from({ length: size }).map(
    (_, index) => startPos + index * increment,
  )
}

export default range
