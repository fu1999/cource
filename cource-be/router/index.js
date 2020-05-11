const Router = require('koa-router')

var Db = require("../controller/login/index")
var router = new Router();

// router.get("/admin",(ctx)=>{
//     // get 过来 获取接口后的数据
//     ctx.body = ctx.request.query
    
// })

// router.post("/login",(ctx)=>{
//     // post 过来 获取接口后的数据
//     // body-parser 装上
//     ctx.body = ctx.request.body

    
// })
router.post("/login",Db.login.bind(Db))
module.exports = router