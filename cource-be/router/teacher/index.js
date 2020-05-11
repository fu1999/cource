const Router = require('koa-router')
const Db  = require("../../controller/teacher/index")
var router = new Router();

router.get("/myCource",Db.myCorce.bind(Db))
router.get("/studentForCource",Db.studentForCource.bind(Db))
router.get("/studentForScore",Db.studentForScore.bind(Db))
module.exports = router