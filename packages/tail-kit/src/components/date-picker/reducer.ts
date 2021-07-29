import dayjs from 'dayjs'

export type State = {
  dateSelected?: Date
  open: boolean
  activeMonth: Date
}

export enum ActionType {
  TOGGLE_OPEN = 'TOGGLE_OPEN',
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  MOVE_TO_CURRENT_MONTH = 'MOVE_TO_CURRENT_MONTH',
  MOVE_TO_NEXT_MONTH = 'MOVE_TO_NEXT_MONTH',
  MOVE_TO_NEXT_YEAR = 'MOVE_TO_NEXT_YEAR',
  MOVE_TO_PREV_MONTH = 'MOVE_TO_PREV_MONTH',
  MOVE_TO_PREV_YEAR = 'MOVE_TO_PREV_YEAR',
  SELECT_DATE = 'SELECT_DATE',
  CLEAR_DATE = 'CLEAR_DATE',
}

export type ToggleOpenAction = {
  type: ActionType.TOGGLE_OPEN
}

export type OpenCalendarAction = {
  type: ActionType.OPEN
}

export type CloseCalendarAction = {
  type: ActionType.CLOSE
}

export type MoveToCurrentMonthAction = {
  type: ActionType.MOVE_TO_CURRENT_MONTH
}

export type MoveToNextMonthAction = {
  type: ActionType.MOVE_TO_NEXT_MONTH
}

export type MoveToNextYearAction = {
  type: ActionType.MOVE_TO_NEXT_YEAR
}

export type MoveToPrevMonthAction = {
  type: ActionType.MOVE_TO_PREV_MONTH
}

export type MoveToPrevYearAction = {
  type: ActionType.MOVE_TO_PREV_YEAR
}

export type SelectDateAction = {
  type: ActionType.SELECT_DATE
  payload: {
    date: Date
  }
}

export type ClearDateAction = {
  type: ActionType.CLEAR_DATE
}

export type Action =
  | ToggleOpenAction
  | OpenCalendarAction
  | CloseCalendarAction
  | MoveToCurrentMonthAction
  | MoveToNextMonthAction
  | MoveToNextYearAction
  | MoveToPrevMonthAction
  | MoveToPrevYearAction
  | SelectDateAction
  | ClearDateAction

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.TOGGLE_OPEN: {
      return {
        ...state,
        open: !state.open,
      }
    }

    case ActionType.OPEN: {
      return {
        ...state,
        open: true,
      }
    }

    case ActionType.CLOSE: {
      return {
        ...state,
        open: false,
      }
    }

    case ActionType.MOVE_TO_CURRENT_MONTH: {
      return {
        ...state,
        activeMonth: dayjs().startOf('month').toDate(),
      }
    }

    case ActionType.MOVE_TO_NEXT_MONTH: {
      return {
        ...state,
        activeMonth: dayjs(state.activeMonth).add(1, 'month').toDate(),
      }
    }

    case ActionType.MOVE_TO_NEXT_YEAR: {
      return {
        ...state,
        activeMonth: dayjs(state.activeMonth).add(1, 'year').toDate(),
      }
    }

    case ActionType.MOVE_TO_PREV_MONTH: {
      return {
        ...state,
        activeMonth: dayjs(state.activeMonth).subtract(1, 'month').toDate(),
      }
    }

    case ActionType.MOVE_TO_PREV_YEAR: {
      return {
        ...state,
        activeMonth: dayjs(state.activeMonth).subtract(1, 'year').toDate(),
      }
    }

    case ActionType.SELECT_DATE: {
      const { date } = action.payload
      return {
        ...state,
        open: false,
        dateSelected: date,
        activeMonth: dayjs(date).startOf('month').toDate(),
      }
    }

    case ActionType.CLEAR_DATE: {
      return {
        ...state,
        open: false,
        dateSelected: undefined,
        activeMonth: dayjs().startOf('month').toDate(),
      }
    }

    default: {
      return state
    }
  }
}
