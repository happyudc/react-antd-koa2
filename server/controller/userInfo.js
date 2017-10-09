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
            username: formData.userName,
            password: formData.password,
            email: formData.email,
            create_time: new Date()
        };
        let userResult = await userInfoService.register(userInfo);
        if(userResult) {
            result.success = true
        } else {
            result.message = "注册失败!"
            result.code = "REGISTER_ERROR"
        }
        ctx.body = result
    }


}