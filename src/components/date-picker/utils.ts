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

/**
 * Returns the weeks for the month
 *
 * @param month The date (preferably start of date of the month) whose month weeks are to computed
 */
export function getWeeksForMonth(month: Date) {
  const monthStartWeek = dayjs(month).clone().startOf('month').startOf('week')
  const monthEndWeek = dayjs(month).clone().endOf('month').startOf('week')

  const weeks = []
  for (
    let date = monthStartWeek;
    date <= monthEndWeek;
    date = dayjs(date).add(1, 'week')
  ) {
    weeks.push(date)
  }

  return weeks
}

export function isDateDisabled(
  date: Date,
  startDate?: Date,
  endDate?: Date,
  disableDate?: (date: Date) => boolean,
) {
  let isDisabled = false
  if (!isDisabled && startDate) {
    isDisabled = dayjs(date).startOf('day').isBefore(startDate)
  }
  if (!isDisabled && endDate) {
    isDisabled = dayjs(date).startOf('day').isAfter(endDate)
  }
  if (!isDisabled && disableDate) {
    isDisabled = disableDate(date)
  }

  return isDisabled
}
