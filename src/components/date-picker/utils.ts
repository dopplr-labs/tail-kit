import dayjs from 'dayjs'

/**
 * Helper function to compare dates
 *
 * @param dateA First date
 * @param dateB Second date
 * @param comparatorFunction Comparator function to compare dates
 */
export function isDateEqual(
  dateA: Date | undefined,
  dateB: Date | undefined,
  comparatorFunction: (date: Date) => number = (date) =>
    dayjs(date).startOf('day').valueOf(),
): boolean {
  if (typeof dateA === 'undefined' && typeof dateB === 'undefined') {
    return true
  }

  if (!dateA || !dateB) {
    return false
  }

  return comparatorFunction(dateA) === comparatorFunction(dateB)
}
