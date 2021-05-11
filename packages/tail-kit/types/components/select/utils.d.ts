import { OptionType } from './types'
/**
 * Utility function to calculate the next option index. It would return the
 * index of the next option which is not disabled.
 *
 * @param options Array of options
 * @param activeIndex The current index
 */
export declare function findNextIndex(
  options: OptionType[],
  activeIndex: number,
): number
/**
 * Utility function to calculate the previous option index. It would return the index of the
 * previous item which is not disabled.
 *
 * @param options Array of options
 * @param activeIndex The current index
 */
export declare function findPrevIndex(
  options: OptionType[],
  activeIndex: number,
): number
