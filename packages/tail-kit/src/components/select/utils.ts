import { OptionType } from './types'

/**
 * Utility function to calculate the next option index. It would return the
 * index of the next option which is not disabled.
 *
 * @param options Array of options
 * @param activeIndex The current index
 */
export function findNextIndex(options: OptionType[], activeIndex: number) {
  const nextIndex = options.findIndex(
    (option, index) => index > activeIndex && !option.disabled,
  )
  if (nextIndex === -1) {
    return activeIndex
  }
  return nextIndex
}

/**
 * Utility function to calculate the previous option index. It would return the index of the
 * previous item which is not disabled.
 *
 * @param options Array of options
 * @param activeIndex The current index
 */
export function findPrevIndex(options: OptionType[], activeIndex: number) {
  // To find the previous index
  // 1. reverse the array
  // 2. find the next element (in the reversed array) whose index is greater than the activeIndex
  // 3. return options.length - indexFound - 1 to get the actual index
  const nextIndex = options
    .slice()
    .reverse()
    .findIndex((option, index) => {
      if (activeIndex !== -1 && options.length - index - 1 >= activeIndex) {
        return false
      }
      return !option.disabled
    })
  if (nextIndex === -1) {
    return activeIndex
  }
  return options.length - nextIndex - 1
}
