/**
 * Created by happyu on 2017/10/9.
 */
const mysql = require('mysql');
const allConfig = require('../../config');
const config = allConfig.database;
const pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DATABASE
});

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        "use strict";
        pool.getConnection(function (err, connection) {
            if(err) {
                resolve(err)
            } else {
                let query = connection.query(sql, values, (err, rows) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
                console.info("sql: " + query.sql)
            }
        })
    })
};

/**
 * 根据id查询用户信息
 * @param table 表名称
 * @param id
 */
let selectById = function (table, id) {
    let _sql = "select * from ?? where id = ?";
    return query(_sql, [table, id])
};

/**
 * 查询所有用户信息
 * @param table
 */
let selectAll = function (table) {
    let _sql = "select * from ??";
    return query(_sql, [table])
};

/**
 * 不带条件分页查询
 * @param table 表名称
 * @param begin 起始
 * @param offset 偏移量
 */
let selectByPage = function (table, begin, offset) {
    let _sql = "select * from ?? limit ?, ?";
    return query(_sql, [table, begin, offset])
};

/**
 * 查询总记录数
 * @param table
 */
let count = function (table) {
    let _sql = "select count(id) as count from ??";
    return query(_sql, [table])
};

/**
 * 根据id查询指定列
 * @param table
 * @param columns 列名称
 * @param id
 */
let selectColumnsById = function (table, columns, id) {
    if(columns && columns.length > 0) {
        selectById(table, id)
    } else {
        let _sql = "select ?? from ?? where id = ?";
        return query(_sql, [columns, table, id])
    }
};

/**
 * 添加数据
 * @param table 表名称
 * @param values {columnName: columnValue,....}
 */
let insert = function (table, values) {
    let _sql = "insert into ?? set ?"; // 该方式可以获取刚插入数据的主键id，同过insertedId获取
    return query(_sql, [table, values])
};

/**
 * 修改数据
 * @param table
 * @param values
 */
let update = function (table, values) {
    let _sql = "update ?? set ? where id = ?";
    return query(_sql, [table, values, values.id])
}

/**
 * 删除数据
 * @param table
 * @param value
 */
let deleteData = function (table, value) {
    let _sql = "delete from ?? where id = ?";
    return query(_sql, [table, value])
};



module.exports = {
    query,
    selectAll,
    selectById,
    selectColumnsById,
    insert,
    selectByPage,
    count,
    deleteData,
    update
};