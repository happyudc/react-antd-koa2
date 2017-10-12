/**
 * Created by happyu on 2017/10/11.
 */
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkWimmdleware from 'redux-thunk'
import rootReducer from '../reducers/index'
const middlewares = [routerMiddleware, thunkWimmdleware];
export default function configStore() {
    return createStore(rootReducer,applyMiddleware(...middlewares))
}
