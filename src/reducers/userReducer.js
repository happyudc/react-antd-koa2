/**
 * Created by happyu on 2017/10/13.
 */
import { message } from 'antd'
import * as types from '../constants/userActionType'

const initialState = {
    authenticated: false,
    isAuthenticating: false,
    token: '',
    isAdmin: false,
    userName: '',
    statusText: ''
};

export default (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isAuthenticating: true
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                authenticated: true,
                isAuthenticating: false,
                token: action.payload.token,
                isAdmin: action.payload.isAdmin,
                userName: action.payload.userName
            };
        case types.LOGIN_FAILURE:
            message.error(action.payload.msg);
            return {
                ...state,
                authenticated: false,
                isAuthenticating: false,
                token: '',
                isAdmin: false,
                userName: '',
                statusText: action.payload.msg
            };
        case types.LOGOUT_REQUEST:
            return {
                ...state
            };
        case types.LOGOUT_SUCCESS:
            return {
                ...state,
                authenticated: false,
                isAuthenticating: false,
                token: '',
                isAdmin: false,
                userName: '',
            };
        case types.LOGOUT_FAILURE:
            return {
                ...state,
                authenticated: true,
                statusText: action.payload.msg
            };
        default:
            return state
    }
};
