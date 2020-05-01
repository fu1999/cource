const mysql = require("mysql")

// 创建数据池
const pool = mysql.createPool({
    host:'101.37.30.78',
    user:'root',
    password:'Baisechenshan90@88',
    database:'Gp16'
})

module.exports = (sql, params) => {
    return new Promise((resolve, reject) => {
      // 在数据池中进行会话操作
      pool.getConnection(function (err, connection) {
        connection.query(sql, params, (error, results, fields) => {
          if (error) {
            reject(error)
          } else {
            resolve(results)
          }
          // 结束会话
          connection.release();
        })
      })
    })
  
  }