/**
 * Created by happyu on 2017/10/9.
 */
const router = require('koa-router')();
const api = require('./api');
const auth = require('./auth');

router.use('/api', api.routes(), api.allowedMethods());
router.use('/api/auth', auth.routes(), auth.allowedMethods());

module.exports = router;