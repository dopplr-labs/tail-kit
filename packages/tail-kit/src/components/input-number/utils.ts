/**
 * Helper function to compute precision
 *
 * @param value The number for which the precision is computed
 */
export function getPrecision(value: number): number {
  const valueString = String(value)
  if (valueString.indexOf('.') >= 0) {
    return valueString.length - valueString.indexOf('.') - 1
  } else {
    return 0
  }
}

/**
 * Helper function to clamp the value between a min and max boundary
 *
 * @param value The value to be clamped
 * @param min The min boundary value
 * @param max The max boundary value
 */
export function clamp(value: number, min?: number, max?: number) {
  let outputValue = value
  if (typeof min !== 'undefined') {
    outputValue = Math.max(outputValue, min)
  }
  if (typeof max !== 'undefined') {
    outputValue = Math.min(outputValue, max)
  }
  return outputValue
}
