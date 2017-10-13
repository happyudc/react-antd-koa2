/**
 * Created by happyu on 2017/10/13.
 */
import 'babel-polyfill';
import Request from '../../utils/request'

const logoutApi = async () => {
    "use strict";
    let result = await Request.get({
        url: '/api/user/logout.json',
        data: null
    });
    return result
};

export { logoutApi }