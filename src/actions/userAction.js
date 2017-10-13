/**
 * Created by happyu on 2017/10/13.
 */
import * as types from '../constants/userActionType'

const removeLocalStorage = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userName');
}

export const loginRequest = (data) => {
    return { type: types.LOGIN_REQUEST, payload: data}
};

export const loginSuccess = (token, isAdmin, userName) => {
    localStorage.setItem('token', token);
    localStorage.setItem('isAdmin', isAdmin);
    localStorage.setItem('userName', userName);
    localStorage.setItem('isLogin', true);
    return { type: types.LOGIN_SUCCESS, payload: { token, isAdmin, userName } }
};

export const loginFailure = (data) => {
    removeLocalStorage();
    return { type: types.LOGIN_FAILURE, payload: { status: data.status, msg: data.msg } }
};

export const logoutRequest = () => {
        return { type: types.LOGOUT_REQUEST }
};

export const logoutSuccess = () => {
    removeLocalStorage();
    return { type: types.LOGOUT_SUCCESS}
};

export const logoutFailure = (data) => {
    return { type: types.LOGOUT_FAILURE, payload: {  status: data.status, msg: data.msg }}
};

