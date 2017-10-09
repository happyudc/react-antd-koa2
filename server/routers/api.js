/**
 * Created by happyu on 2017/10/9.
 */

const router = require('koa-router')();
const userInfoController = require('../controller/userInfo');
const routers = router
    .post('/user/login.json', userInfoController.login)
    .post('/user/register.json', userInfoController.register);

module.exports = routers;
