import React from 'react';
import dayjs from 'dayjs';
export declare type WeekProps = {
    /** Start date of the week */
    weekStartDate: dayjs.Dayjs;
    /**
     * Active month. This is helpful show distinguish days between the active month and other months
     */
    activeMonth: Date;
    /**
     * Date selected by the user
     */
    dateSelected?: dayjs.Dayjs;
    /**
     * Callback function called when user selects a date
     */
    onDateClick: (date: Date, event: React.MouseEvent<HTMLButtonElement>) => void;
    /**
     * Start date for the date picker.
     * All the dates before the start date would be disabled
     */
    startDate?: Date;
    /**
     * End date for the date picker
     * All the dates after the end date would be disabled
     */
    endDate?: Date;
    /**
     * Function to determine whether a particular date should be disabled or not
     * It is helpful in the cases where we want to disable dates based on a custom
     * logic rather than range values specfied by `startDate` and `endDate` prop
     */
    disableDate?: (date: Date) => boolean;
    /** Additional classes for styling a week */
    className?: string;
    /** Additional styles */
    style?: React.CSSProperties;
};
export declare function Week({ weekStartDate, activeMonth, dateSelected, onDateClick, startDate, endDate, disableDate, className, style, }: WeekProps): JSX.Element;
