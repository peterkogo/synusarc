import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import { dimensions } from './dimensions/reducer'
import { console } from './console/reducer'

export default (history) => combineReducers({
  router: connectRouter(history),
  console,
  dimensions
})
