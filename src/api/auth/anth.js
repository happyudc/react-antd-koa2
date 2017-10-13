/**
 * Created by happyu on 2017/10/13.
 */
import Request from '../../utils/request'

const authApi = async () => {
    "use strict";
    let result = await Request.get({
        url: 'api//auth',
        data: null
    });
    return result;
};

export { authApi }