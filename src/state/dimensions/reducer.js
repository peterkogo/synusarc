import { RESIZE } from './actions'

function getCurrentDimensions () {
  const width = window.innerWidth
  const height = window.innerHeight
  return {
    width,
    height,
    centerX: Math.floor(width * 0.5),
    centerY: Math.floor(height * 0.5)
  }
}

export function dimensions (state = getCurrentDimensions(), action) {
  switch (action.type) {
    case RESIZE:
      return {
        ...state,
        ...getCurrentDimensions()
      }
    default:
      return state
  }
}
