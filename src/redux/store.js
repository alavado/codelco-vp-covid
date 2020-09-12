import { combineReducers, createStore } from 'redux'
import reducer from './ducks'

const store = createStore(
  combineReducers(reducer)
)

export default store