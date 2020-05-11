const Router = require('koa-router')
const auth = require('./router/index')
const admin = require('./router/admin/index')
const teacher = require("./router/teacher/index")
const student = require("./router/student/index")
// bodyParser
const bodyParser = require('koa-bodyparser')
//  KoaStatic
const koaStatic = require('koa-static')
// view ejs
const views = require('koa-views')
const ejs = require('ejs')

const path = require('path')

const staticPath = path.join(__dirname,'./static')

const Koa = require('koa')

const app = new Koa()

// 模板
const ejsPath = path.join(__dirname,"./views")
app.use(views(
    ejsPath,{
        extension:'ejs'
    }
))

// static
app.use(koaStatic(staticPath))

// bodyparser

app.use(bodyParser())
// 中间件
// app.use( async (ctx)=>{
//     // ctx.body = "helo"
//     await ctx.render('home',{
//         title:'学生选课系统'
//     })
// })

// router挂载到app
var router = new Router()
// 人员相关
router.use('/auth',auth.routes())
router.use('/super',admin.routes())
router.use('/teacher',teacher.routes())
router.use('/student',student.routes())

// router.use('/super',admin.routes())


app.use(router.routes())


// 监听端口
app.listen(9088,()=>{
    console.log('此服务已启动')
})