/**
 * Created by happyu on 2017/10/9.
 */
const userModel = require('../models/userInfo');

const user = {
    /**
     * 登陆
     * @param userName
     * @param password
     * @returns {Promise.<*|Promise.<*>>}
     */
    async login(userName, password) {
        "use strict";
        let result = await userModel.findUserByNameAndPwd(userName, password);
        return result
        
    },
    async register(userInfo) {
        "use strict";
        let result = await userModel.insertUserInfo(userInfo);
        return result
    }
};

module.exports = user;