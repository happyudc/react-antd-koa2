/**
 * Created by happyu on 2017/10/13.
 */
module.exports = {
    async auth(ctx) {
        "use strict";
        let session = ctx.session;
        console.log("auth: ",session);
        if(session && session.isLogin && session.userName) {
            ctx.body = {isLogin: true}
        } else {
            ctx.body = {isLogin: false}
        }
    }
};