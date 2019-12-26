import { createStore, compose } from 'redux'
import { createBrowserHistory } from 'history'

import rootReducer from './rootReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const history = createBrowserHistory()

export default function configureStore () {
  const store = createStore(
    rootReducer(history),
    composeEnhancers()
  )
  return store
}
