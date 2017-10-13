/**
 * Created by happyu on 2017/10/13.
 */

const router = require('koa-router')();
const authController = require('../controller/auth');

const routers = router.get('/', authController.auth);

module.exports = routers