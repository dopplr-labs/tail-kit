import React from 'react'
declare type OnChangeType = (dateSelected: Date | undefined) => void
/** Date picker properties */
export declare type DatePickerProps = {
  /**
   * Default date selected. It can used to set a default date when using
   * the date picker as uncontrolled component
   */
  defaultDate?: Date
  /**
   * Date selected. It should be used along with `onChange` prop to set the
   * date when using date picker as controlled component
   */
  date?: Date
  /** Callback function called when the date is changed. */
  onChange?: OnChangeType
  /** Placeholder for empty date picker */
  placeholder?: string
  /** Show clear button when a date is selected */
  allowClear?: boolean
  /**
   * Start date for the date picker.
   * All the dates before the start date would be disabled
   */
  startDate?: Date
  /**
   * End date for the date picker
   * All the dates after the end date would be disabled
   */
  endDate?: Date
  /**
   * Function to determine whether a particular date should be disabled or not
   * It is helpful in the cases where we want to disable dates based on a custom
   * logic rather than range values specfied by `startDate` and `endDate` prop
   */
  disableDate?: (date: Date) => boolean
  /** Addtional classes to style date picker */
  className?: string
  /** Additional styles for date picker */
  style?: React.CSSProperties
}
/** Component to render **date picker** */
export declare function DatePicker({
  date,
  defaultDate,
  onChange,
  placeholder,
  allowClear,
  startDate,
  endDate,
  disableDate,
  className,
  style,
}: DatePickerProps): JSX.Element
export {}
