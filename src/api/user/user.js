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

const userDeleteApi = async (id) => {
    "use strict";
    let result = Request.post({
        url: '/api/user/delete.json',
        data: {
            id
        }
    });
    return result
};

const userUpdateAPi = async (user) => {
    "use strict";
    let result = Request.post({
        url: '/api/user/update.json',
        data: user
    })
    return result
};

export { userListApi, userPageApi, userDeleteApi, userUpdateAPi }