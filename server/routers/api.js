/**
 * Created by happyu on 2017/10/9.
 */

const router = require('koa-router')();
const userInfoController = require('../controller/userInfo');
const routers = router
    .get('/user/userList.json', userInfoController.getUserList)
    .get('/user/one.json', userInfoController.findUserById)
    .get('/user/logout.json', userInfoController.logout)
    .post('/user/login.json', userInfoController.login)
    .post('/user/register.json', userInfoController.register)
    .post('/user/delete.json', userInfoController.deleteUserById)
    .post('/user/update.json', userInfoController.updateUserById)
    .post('/user/page.json', userInfoController.getUserByPage);

module.exports = routers;
