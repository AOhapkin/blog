import { combineReducers } from 'redux'

import articlesReducers from './articlesReducers'
import userReducers from './userReducers'

const rootReducer = combineReducers({articlesReducers, userReducers})

export default rootReducer
