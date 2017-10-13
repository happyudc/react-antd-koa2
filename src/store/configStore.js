/**
 * Created by happyu on 2017/10/11.
 */
import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from '../reducers/'
const middlewares = [routerMiddleware, thunk, createLogger()];
export default function configStore() {
    return createStore(rootReducer) // 此处使用applyMiddleware(...middlewares)导致不能dispatch,原因还没找到!很奇怪
}
