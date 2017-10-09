/**
 * Created by happyu on 2017/10/9.
 */
import 'babel-polyfill';
import Request from '../utils/request'

/**
 * 用户登陆api
 * @param userInfo 用户登陆信息
 * @returns {Promise.<*>}
 * @constructor
 */
const signInApi = async (userInfo) => {
    let result = await Request.post({
        url: '/api/user/login.json',
        data: userInfo
    })
    return result
};

export { signInApi }