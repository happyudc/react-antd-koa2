/**
 * Created by happyu on 2017/10/9.
 */
const path = require('path');
const Koa = require('koa');
const koaStatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger = require('koa-logger');
const session = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');
const cors = require('koa2-cors');

const config = require('../config');
const routers = require('./routers/index');
const handleError = require('./exception/handleError');

const app = new Koa();
// 解决跨域问题
app.use(cors({
    origin: function (ctx) {
        if (ctx.url.indexOf('/api') > 0) {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],

}));

const sessionMysqlConfig = {
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host: config.database.HOST,
};

app.use(session({
    key: 'USER_SID',
    store: new MysqlStore(sessionMysqlConfig),
    cookie: {
        maxAge: 1000 * 60
    }
}));

app.use(koaLogger());

app.use(bodyParser());

app.use(koaStatic(
    path.join(__dirname, '../src')
));

app.use(routers.routes()).use(routers.allowedMethods());

app.on('error', handleError);

app.listen(config.port, function () {
    console.log(`the server is running at port ${config.port}`)
});


