/**
 * Created by happyu on 2017/10/11.
 */
import Request from '../../utils/request'

const userListApi = async () => {
    "use strict";
    let result = Request.get({
        url: '/api/user/userList.json'
    })
    return result
};

const userPageApi = async (begin, offset) => {
    "use strict";
    let result = Request.post({
        url: '/api/user/page.json',
        data: {
            begin, offset
        }
    });
    return result
};

export { userListApi, userPageApi }