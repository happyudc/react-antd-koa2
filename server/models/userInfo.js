/**
 * Created by happyu on 2017/10/9.
 */

const dbUtils = require('../utils/dbUtil');
const user = {
    /**
     * 根据用户名和密码查询用户信息
     * @param userName, password 用户登陆信息
     * @returns {Promise.<*>}
     */
    async findUserByNameAndPwd(userName, password) {
        "use strict";
        let _sql = "select * from userInfo where username = ? and password = ?";
        let result = await dbUtils.query(_sql, [userName, password]);
        if(Array.isArray(result) && result.length > 0) {
            result = result[0];
        } else {
            result = null;
        }
        return result;
    },

    /**
     * 添加用户信息
     * @param userInfo
     * @returns {Promise.<boolean>}
     */
    async insertUserInfo(userInfo) {
        "use strict";
        let result = await dbUtils.insert('userInfo', userInfo);
        if(result && result.affectedRows === 1) {
            return true
        } else {
            return false
        }
    },

    async selectAllUser() {
        "use strict";
        let result = await dbUtils.selectAll('userInfo');
        if(Array.isArray(result) && result.length > 0) {
            return result
        } else {
            return null
        }
    },

    async selectUserByPage(begin, offset) {
        "use strict";
        let result = await dbUtils.selectByPage('userInfo', begin, offset);
        if(Array.isArray(result) && result.length > 0) {
            return result
        } else {
            return null
        }
    },

    async getCount() {
        "use strict";
        let result = await dbUtils.count('userInfo');
        if(Array.isArray(result) && result.length > 0) {
            return result[0].count
        } else {
            return null
        }
    },

    async deleteById(id) {
        "use strict";
        let result = await dbUtils.deleteData('userInfo', id);
        if(result && result.affectedRows === 1) {
            return true
        } else {
            return false
        }
    },

    async findUserById(id) {
        "use strict";
        let result = await dbUtils.selectById('userInfo', id);
        if(Array.isArray(result) && result.length > 0) {
            return result[0]
        } else {
            return null
        }
    },

    async updateUserById(user) {
        "use strict";
        let result = await dbUtils.update('userInfo', user);
        if(result && result.affectedRows === 1) {
            return true
        } else {
            return false
        }
    }

};

module.exports = user;
