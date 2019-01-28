import { createStore, combineReducers } from 'redux'

import chatReducer from './reducers/chatReducer'
// import all reducers here

const rootReducer = combineReducers({
  chatReducer
  // put reducers here
})

const store = createStore(rootReducer)

export default store