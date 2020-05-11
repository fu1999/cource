var db = require("../../db/index")
const lis = require("../../config/index")
class Admin{
    async list(ctx){
        let rs = await db(`select * from Gp16.cource`)
        // console.log(rs)
        ctx.body = rs
    }

    // 课程删除

    async listDel(ctx){
        // console.log(ctx.request.body)
        let {id} = ctx.request.body
        let res1 =await this.findOne(id)
        // // console.log(res1)
        let teacherIds = res1[0].teacherId
        let rs = await db(`select * from teacher where teacherId =? `,teacherIds)
        // console.log(rs)
        let num1 = parseInt(rs[0].courceNum)-1
        let rss = await db(`update teacher set courceNum = '${num1}' where teacherId = '${teacherIds}';`)
        //
        let result = await db(`delete from cource where cource_id = ${id};`)
         console.log(result)
        if(result.affectedRows&&rss.affectedRows){
           ctx.body = {
                code:1,
                message:"删除成功"
            }
        }else{
           ctx.body = {
                code:-1,
                message:"请稍后再试"
            }
        }
        
    }
    // 查找唯一的课程
    async findOne(id){
        // console.log(id)
        let rs = await db(`select * from cource where cource_id =? `,id)
        // console.log(rs)
        return rs
    }

    // 添加课程

    async add(ctx){
        let {teacher,name,score,time,cource_id,person,shouldperson,teacherId} = ctx.request.body
        // console.log(ctx.request.body)
        // let rs = await this.findOne(cource_id)//Id课程是否重复
        // console.log(teacher,cource_id,teacherId)
        let rss = await this.findTeachers(teacher,cource_id,teacherId) //教师是否存在
        console.log( rss)
        // &&rss.length!==0
        if(rss[0].code != -5){
            let result = await db(`insert into cource (teacher, name, cource_id, score, time,person,shouldperson,teacherId) values ('${teacher}', '${name}', '${cource_id}', '${score}', '${time}',${person},'${shouldperson}','${teacherId}')`)
            // console.log(result)
            if(result.affectedRows){
                ctx.body = {
                    code:1,
                    message:"添加成功"
                }
            }else{
                ctx.body = {
                    code:2,
                    message:"添加失败"
                }
            }
        }else{
            ctx.body = {
                code:-3,
                message:"课程Id重复或教师不存在"
            }
            // return
        }
        // INSERT INTO `Gp16`.`cource` (`teacher`, `name`, `cource_id`, `score`, `time`) VALUES ('谢天', 'JS高级阶段', '000003', '6', '2010-2-3 - 3203-50-5');
        
    }

    // 
    async findTeachers(teachers,id,teacherId){
        
        let rses = await this.findOne(id)
        let rs = await db(`select * from teacher where teacherId =? `,teacherId)
        // console.log(rses,rs) 
        // console.log(teacherId)
        if(rses.length === 0&&rs.length !==0){
                let num2 = parseInt(rs[0].courceNum) +1
                await db(`update teacher set courceNum = '${num2}' where teacherId = '${teacherId}';`)
                let rsess = [{
                    code:1
                },
                rses
            ]
                return rsess //课程名不重复、老师也能出查询到

        }else{
            return [{code:-5}]
        }
    }

// --------------------------------------------------------------------------------------
    async listForTeacher(ctx){
        let rs = await db(`select * from Gp16.teacher`)
        // console.log(rs)
        rs.forEach(v=>{
            for(let key in v){
                delete v['password']
            }
        })
        ctx.body = rs
    }
    async listForStudent(ctx){
        let rs = await db(`select * from Gp16.student`)
        // console.log(rs)
        rs.forEach(v=>{
            for(let key in v){
                delete v['password']
            }
        })
        ctx.body = rs
    }

    // 教师修改信息
    async teacherUpdate(ctx){
        // console.log(ctx.request.body)
        let { id , time, password} = ctx.request.body
        let rs= await db(`update Gp16.teacher set password = '${password}', time = '${time}' where id = '${id}';`)
        ctx.body = rs
    }

    //  -------------------------------------------课程信息编辑 -【---------------
    async findTeacherUp(teachers,id,teacherIds){
        let rses = await this.findOne(id)
        // console.log(rses)
        let teaccher1 = rses[0].teacherId//原本的teacherid
        let rs = await db(`select * from teacher where teacherId =? `,teacherIds)//更新的老师ID
        let rs2 = await db(`select * from teacher where teacherId =? `,teaccher1)//未更新的
        await db(`update cource set teacherId = '${teacherIds}' where cource_id = '${id}';`)
        // console.log(rs)
        // return rs
        let num1 = parseInt(rs2[0].courceNum)-1
        let num2 = parseInt(rs[0].courceNum) +1
        // console.log(teaccher1,teachers)
        if(rs.length!==0){
            if(teaccher1 === teacherIds){
                return rs
            }else{
                await db(`update teacher set courceNum = '${num1}' where teacherId = '${teaccher1}';`)
                await db(`update teacher set courceNum = '${num2}' where teacherId = '${teacherIds}';`)
                return rs
            }
        }else{
            return rs
        }
    }
    async upDate(ctx){
        // console.log(req.body)
        let {teacher,name,score,time,cource_id,shouldperson,teacherId} = ctx.request.body
        let rses = await this.findTeacherUp(teacher,cource_id,teacherId)
        if(rses.length !==0){
            let rs = await  db(`update cource set teacher = '${teacher}' , name='${name}', score ='${score}',time ='${time}',shouldperson='${shouldperson}' where cource_id = ${cource_id};`)
            if(rs.affectedRows){
                ctx.body = {
                    code:1,
                    message:"修改成功"
                }
            }else{
                ctx.body = {
                    code:2,
                    message:"修改失败"
                }
            }
        }else{
            ctx.body = {
                code:-4,
                message:"查无此教师"
            }
        }
        // UPDATE `Gp16`.`cource` SET `teacher` = '王伟2',
        //  `name` = '数据结构2', `cource_id` = '000003', 
        // `score` = '3', `time` = '2017-7-8 - 2020-4-8' WHERE (`id` = '8');
       
    }
    // --------------------------------教师管理----------------------------------

    // 寻找当前教师
    async findTeacher(teacherId){
        let rs = await db(`select * from teacher where teacherId =? `,teacherId)
        return rs
    }
    // 教师删除
    async teacherDel(ctx){
        let {teacherId} = ctx.request.body
        let rs =await this.findTeacher(teacherId)
        if(rs[0].courceNum != 0){
            ctx.body = {
                code : -5,
                message: "此教师下仍有代课课程,请把课程指派给其他老师"
            }
        }else {
            let result = await db(`delete from teacher where teacherId = ${teacherId};`)
            if(result.affectedRows){
                ctx.body = {
                    code : 1,
                    message: "教师删除成功"
                }
            }else{
                ctx.body = {
                    code : -1,
                    message: "失败"
                }
            }
            console.log(result)
        }
        // console.log(rs)
    }

    // 教师任课情况
    async findTeacherCource(ctx){
        let {teacherId} = ctx.request.query
        // console.log(teacherId)
        let rs = await db(`select * from cource where teacherId =? `,teacherId)
        ctx.body={
            code:1,
            list:rs
        }
    }

    // 添加教师
    async teacherAdd(ctx){
        let {teacherId,name,password,courceNum,time} = ctx.request.body
        let rs = await this.findTeacher(teacherId)
        console.log(rs)
        if(rs.length != 0){
            ctx.body = {
                code: -3,
                message: "此Id已存在,请修改"
            }
        }else {
            let result = await db(`insert into teacher (teacherId, name, password, courceNum, time) values ('${teacherId}', '${name}','${password}', '${courceNum}', '${time}')`)
                    // console.log(result)
                    if(result.affectedRows){
                        ctx.body = {
                            code:1,
                            message:`${name}教师添加成功`
                        }
                    }else {
                        ctx.body = {
                            code:-2,
                            message:`${name}教师添加失败`
                        }
                    }
        }
        
        // INSERT INTO `Gp16`.`teacher` (`id`, `name`, `password`, `teacherId`, `courceNum`, `time`) VALUES ('6', '王静', '123456', '000006', '0', '2015-03-30');
    }


    // 删除学生
    async studentDel(ctx){
        let { studentId} = ctx.request.body
        let result = await db(`delete from student where studentId = ${studentId};`)
        if(result.affectedRows){
            ctx.body = {
                code : 1,
                message: "学生删除成功"
            }
        }else{
            ctx.body = {
                code : -1,
                message: "删除失败"
            }
        }
    }
}

module.exports = new Admin()