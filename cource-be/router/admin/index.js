const Router = require('koa-router')

var Db = require("../../controller/admin/index")
var router = new Router();

router.get("/courceList",Db.list.bind(Db))
router.get("/teacherList",Db.listForTeacher.bind(Db))
router.get("/studentList",Db.listForStudent.bind(Db))
router.post("/teacherUpdate",Db.teacherUpdate.bind(Db))
router.post("/courceDel",Db.listDel.bind(Db))
router.post("/courceAdd",Db.add.bind(Db))
router.post("/courceUpdate",Db.upDate.bind(Db))
router.post("/teacherDel",Db.teacherDel.bind(Db))
router.get('/findTeacherCource',Db.findTeacherCource.bind(Db))
router.post('/teacherAdd',Db.teacherAdd.bind(Db))
router.post('/studentDel',Db.studentDel.bind(Db))
// teacherDel

module.exports = router