import { getConsoleState } from '../InitialStates'
import { PRINT_ERROR } from './actions'

let key = 20

export function addConsoleLine (text, delay = 0) {
  key += 1
  return {
    type: 'line',
    text,
    delay,
    key
  }
}

export function console (state = getConsoleState(), action) {
  switch (action.type) {
    case PRINT_ERROR: {
      const elements = state.elements.slice()
      elements.push(addConsoleLine(action.message))
      return {
        ...state,
        elements
      }
    }
    default:
      return state
  }
}
