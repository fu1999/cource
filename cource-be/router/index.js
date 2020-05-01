const Router = require('koa-router')

var Db = require("../controller/DBController")
var router = new Router();

router.get("/admin",(ctx)=>{
    // get 过来 获取接口后的数据
    ctx.body = ctx.request.query
    
})

// router.post("/login",(ctx)=>{
//     // post 过来 获取接口后的数据
//     // body-parser 装上
//     ctx.body = ctx.request.body

    
// })
router.get("/login",Db.getInfo.bind(Db))
module.exports = router