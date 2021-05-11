export type State = {
  highlightedIndex: number
  open: boolean
}

export enum ActionType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  HIGHLIGHT = 'HIGHLIGHT',
}

type OpenAction = {
  type: ActionType.OPEN
  payload: {
    selectedOptionIndex: number
  }
}

type CloseAction = {
  type: ActionType.CLOSE
}

type HightlightAction = {
  type: ActionType.HIGHLIGHT
  payload: {
    index: number
  }
}

type SelectAction = {
  type: ActionType.HIGHLIGHT
  payload: {
    index: number
  }
}

export type Action = OpenAction | CloseAction | HightlightAction

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.OPEN: {
      return {
        highlightedIndex: action.payload.selectedOptionIndex,
        open: true,
      }
    }

    case ActionType.CLOSE: {
      return {
        ...state,
        open: false,
      }
    }

    case ActionType.HIGHLIGHT: {
      return {
        ...state,
        highlightedIndex: action.payload.index,
      }
    }

    default: {
      return state
    }
  }
}
