/**
 * Created by happyu on 2017/10/11.
 */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import userReducer from './userReducer'
const rootReducers = combineReducers({
    userReducer,
    routing: routerReducer
});
export default rootReducers