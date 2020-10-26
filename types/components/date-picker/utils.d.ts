/**
 * Helper function to compare dates
 *
 * @param dateA First date
 * @param dateB Second date
 * @param comparatorFunction Comparator function to compare dates
 */
export declare function isDateEqual(
  dateA: Date | undefined,
  dateB: Date | undefined,
  comparatorFunction?: (date: Date) => number,
): boolean
/**
 * Returns the weeks for the month
 *
 * @param month The date (preferably start of date of the month) whose month weeks are to computed
 */
export declare function getWeeksForMonth(month: Date): any[]
export declare function isDateDisabled(
  date: Date,
  startDate?: Date,
  endDate?: Date,
  disableDate?: (date: Date) => boolean,
): boolean
