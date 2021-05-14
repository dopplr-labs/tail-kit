export declare type State = {
  highlightedIndex: number
  open: boolean
}
export declare enum ActionType {
  OPEN = 'OPEN',
  CLOSE = 'CLOSE',
  HIGHLIGHT = 'HIGHLIGHT',
}
declare type OpenAction = {
  type: ActionType.OPEN
  payload: {
    selectedOptionIndex: number
  }
}
declare type CloseAction = {
  type: ActionType.CLOSE
}
declare type HightlightAction = {
  type: ActionType.HIGHLIGHT
  payload: {
    index: number
  }
}
export declare type Action = OpenAction | CloseAction | HightlightAction
export declare function reducer(state: State, action: Action): State
export {}
