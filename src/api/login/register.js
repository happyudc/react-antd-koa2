/**
 * Created by happyu on 2017/10/10.
 */
import 'babel-polyfill'
import Request from '../../utils/request'

/**
 * 用户注册api
 * @param userInfo
 * @returns {Promise.<*>}
 */
const registerApi = async (userInfo) => {
    "use strict";
    let result = await Request.post({
        url: "/api/user/register.json",
        data: userInfo
    });
    return result
};

export { registerApi }

