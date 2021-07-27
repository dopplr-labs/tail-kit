/**
 * Function to replace `undefined` with `null` in any object. This function
 * sanitizes the object deeply. It is used to sanitize the object before
 * serializing it as `undefined` values cannot be serialized.
 *
 * **This function mutates the object.**
 *
 * @param input - input object to be sanitized
 */
export default function sanitize<T extends object>(input: T): T {
  for (const key of Object.keys(input)) {
    if (typeof input[key] === 'undefined') {
      input[key] = null
    } else if (typeof input[key] === 'object' && input[key] !== null) {
      sanitize(input[key])
    }
  }
  return input
}
