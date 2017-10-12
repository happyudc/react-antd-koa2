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
    /**
     * 注册
     * @param userInfo
     * @returns {Promise.<*|Promise.<boolean>>}
     */
    async register(userInfo) {
        "use strict";
        let result = await userModel.insertUserInfo(userInfo);
        return result
    },

    async findAllUser() {
        "use strict";
        let result = await userModel.selectAllUser();
        return result
    },

    async findUserByPage(begin, offset) {
        "use strict";
        let result = {
            data: null,
            count: 0,
        };
        let userResult = await userModel.selectUserByPage(begin, offset);
        let count = await userModel.getCount();
        if(userResult && count) {
            result.data = userResult;
            result.count = count
        }
        return result
    },

    async deleteUserById(id) {
        "use strict";
        let result = await userModel.deleteById(id);
        return result
    }
};

module.exports = user;