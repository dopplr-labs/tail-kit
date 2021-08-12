export declare type State = {
    dateSelected?: Date;
    open: boolean;
    activeMonth: Date;
};
export declare enum ActionType {
    TOGGLE_OPEN = "TOGGLE_OPEN",
    OPEN = "OPEN",
    CLOSE = "CLOSE",
    MOVE_TO_CURRENT_MONTH = "MOVE_TO_CURRENT_MONTH",
    MOVE_TO_NEXT_MONTH = "MOVE_TO_NEXT_MONTH",
    MOVE_TO_NEXT_YEAR = "MOVE_TO_NEXT_YEAR",
    MOVE_TO_PREV_MONTH = "MOVE_TO_PREV_MONTH",
    MOVE_TO_PREV_YEAR = "MOVE_TO_PREV_YEAR",
    SELECT_DATE = "SELECT_DATE",
    CLEAR_DATE = "CLEAR_DATE"
}
export declare type ToggleOpenAction = {
    type: ActionType.TOGGLE_OPEN;
};
export declare type OpenCalendarAction = {
    type: ActionType.OPEN;
};
export declare type CloseCalendarAction = {
    type: ActionType.CLOSE;
};
export declare type MoveToCurrentMonthAction = {
    type: ActionType.MOVE_TO_CURRENT_MONTH;
};
export declare type MoveToNextMonthAction = {
    type: ActionType.MOVE_TO_NEXT_MONTH;
};
export declare type MoveToNextYearAction = {
    type: ActionType.MOVE_TO_NEXT_YEAR;
};
export declare type MoveToPrevMonthAction = {
    type: ActionType.MOVE_TO_PREV_MONTH;
};
export declare type MoveToPrevYearAction = {
    type: ActionType.MOVE_TO_PREV_YEAR;
};
export declare type SelectDateAction = {
    type: ActionType.SELECT_DATE;
    payload: {
        date: Date;
    };
};
export declare type ClearDateAction = {
    type: ActionType.CLEAR_DATE;
};
export declare type Action = ToggleOpenAction | OpenCalendarAction | CloseCalendarAction | MoveToCurrentMonthAction | MoveToNextMonthAction | MoveToNextYearAction | MoveToPrevMonthAction | MoveToPrevYearAction | SelectDateAction | ClearDateAction;
export declare function reducer(state: State, action: Action): State;
