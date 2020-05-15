const Router = require('koa-router')
const Db  = require("../../controller/student/index")
var router = new Router();

router.get("/myCource",Db.myCorce.bind(Db))
router.post("/searchCource",Db.searchCource.bind(Db))
router.post("/chooseCource",Db.chooseCource.bind(Db))


// router.get("/studentForCource",Db.studentForCource.bind(Db))
// router.get("/studentForScore",Db.studentForScore.bind(Db))
module.exports = router