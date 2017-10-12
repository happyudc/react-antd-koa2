/**
 * Created by happyu on 2017/10/9.
 */
const userInfoService = require('../service/userInfo');

module.exports = {

    async login(ctx) {
        "use strict";
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            code: '',
            data: null
        };
        let userResult = await userInfoService.login(formData.userName, formData.password);
        if (userResult) {
            result.success = true;
            result.data = userResult
        } else {
            result.message = "用户名或密码错误!";
            result.code = "USERNAME_OR_PASSWORD_ERROR";
        }

        // 登陆成功将用户信息保存到session
        if (result.success) {
            let session = ctx.session;
            session.isLogin = true;
            session.userName = result.username
        }
        // 将用户名保存到cookies中
        if (result.success && formData.remember) {
            ctx.cookies.set(
                'USER_CID',
                userResult.username,
                {
                    domain: 'localhost',
                    path: '/',
                    maxAge: 60 * 60 * 1000 * 24,
                    httpOnly: false,
                    overwrite: false
                }
            )
        }
        ctx.body = result
    },

    async register(ctx) {
        "use strict";
        let formData = ctx.request.body;
        let result = {
            success: false,
            message: '',
            code: '',
            data: null
        };
        let userInfo = {
            username: formData.nickname,
            password: formData.password,
            email: formData.email,
            create_time: new Date()
        };
        let userResult = await userInfoService.register(userInfo);
        if(userResult) {
            result.success = true
        } else {
            result.message = "注册失败!";
            result.code = "REGISTER_ERROR"
        }
        ctx.body = result
    },

    async getUserList(ctx) {
        "use strict";
        let result = {
            success: false,
            message: '',
            code: '',
            data: null
        }
        let userResult = await userInfoService.findAllUser();
        if(userResult) {
            result.success = true;
            result.data = userResult
        } else {
            result.message = "查询用户失败！";
            result.code = "FIND_USER_ERROR"
        }
        ctx.body = result
    },

    async getUserByPage(ctx) {
        "use strict";
        let result = {
            success: false,
            message: '',
            code: '',
            total: 0,
            data: null
        };
        let reqData = ctx.request.body;
        let begin = reqData.begin || 1, offset = reqData.offset || 5;
        let userResult = await userInfoService.findUserByPage(parseInt(begin), parseInt(offset));
        if(userResult.data) {
            result.success = true;
            result.data = userResult.data;
            result.total = userResult.count
        } else {
            result.message = "分页查询用户失败！";
            result.code = "PAGE_FIND_USER_ERROR"
        }
        ctx.body = result
    },

    async deleteUserById(ctx) {
        "use strict";
        let result = {
            success: false,
            message: '',
            code: '',
            data: null
        };
        let id = ctx.request.body.id;
        let userResult = await userInfoService.deleteUserById(id);
        if(userResult) {
            result.success = true;
        } else {
            result.message = "删除用户失败！";
            result.code = "DELETE_USER_ERROR"
        }
        ctx.body = result
    },

    async findUserById(ctx) {
        "use strict";
        let result = {
            success: false,
            message: '',
            code: '',
            data: null
        };
        let queryString = ctx.request.query;
        let userResult = await userInfoService.findUserById(queryString.id);
        if(userResult) {
            result.success = true;
            result.data = userResult
        } else {
            result.message = "查询用单个户信息失败！";
            result.code = "FIND_ONE_USER_ERROR"
        }
        ctx.body = result
    }
};