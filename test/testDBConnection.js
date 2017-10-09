/**
 * Created by happyu on 2017/10/9.
 */
let dbUtil = require('../server/utils/dbUtil');

describe('测试数据库连接', function () {
    it('测试getConnection', function () {
        let _sql = "select * from userInfo";
        console.log(dbUtil.query(_sql))
    })
});

describe('测试查询', function () {
    it('测试selectById', function () {
        let result = dbUtil.selectById('userInfo',1);
        result.then((data) => {
            "use strict";
            console.log(data)
        })
    })
    it("测试查询指定列", function () {
        let result = dbUtil.selectColumnsById('userInfo',['id','username'],1);
        result.then((data) => {
            "use strict";
            console.log(data)
        })
    })
    it("测试查询添加", function () {
        let result = dbUtil.insert('userInfo',{username:'yudc', password:'123456', email:'yudc@qq.com', create_time: new Date()});
        result.then((data) => {
            "use strict";
            console.log(data)
        })
    })
});