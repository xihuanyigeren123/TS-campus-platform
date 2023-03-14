const mysql = require('mysql')
const { dbmysql } = require('./DataBase.ini') //数据库配置文件
const { debug } = require('./config.js') //debug配置文件
function connection() {
  return mysql.createConnection({
    user:'root',          //用户名
    password:'12345678',	//密码
    host:'localhost',		//主机（默认都是local host）
    database:'test' 
  })
}
function query(sql, data) {
  const conn = connection()
  return new Promise((resovle, reject) => {
    debug && console.log('sql语句：' + JSON.stringify(sql))
    try {
      conn.query(sql, data, function (error, results, fields) {
        if (error) {
          reject(error)
          debug && console.log('数据库操作失败:' + JSON.stringify(error))
          return
        } else {
          resovle(results)
          // debug && console.log('数据库操作成功:' + JSON.stringify(results))
        }
      })
    } catch (e) {
      reject(e)
    } finally {
      conn.end()
    }
  })
}
module.exports = {
  query,
}
