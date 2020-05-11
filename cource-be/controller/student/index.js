var db = require("../../db/index")
class Student {
    async myCorce(ctx){
        let {userId} = ctx.request.query
        let rs = await db(`select * from Gp16.cource`)
        let myrs = await db(`select * from Gp16.studentCource where studentId =? `,userId)
        // console.log(myrs)
        if(myrs.length == 0){
            ctx.body = {
                code:1,
                arr:rs,
                message:"未选课列表查询成功"
            }
        }else {
            let arr = []
            for(let i = 0;i< rs.length;i++){
                let bool = false
                for(let k = 0; k<myrs.length;k++){
                    if(rs[i].cource_id == myrs[k].courceId){
                        bool = true
                    }
                }
                if(!bool){
                    arr.push(rs[i])
                }
            }
            console.log(arr)
            ctx.body = {
                code:1,
                arr,
                message:"未选课列表查询成功"
            }
        }
        
    }

    // 学生选课
    async chooseCource(ctx){
        let {courceId,studentId,studentName,courceName,courceScore,time,teacher,teacherId} = ctx.request.body
        let rs = await db(`insert into studentCource (courceId, studentId, name, courceName, time,courceScore,teacher,teaherId,score,status) values ('${courceId}', '${studentId}', '${studentName}', '${courceName}','${time}','${courceScore}', '${teacher}',${teacherId},'${0}','${0}')`)
        this.findOne(courceId)
        if(rs.affectedRows){
            ctx.body = {
                code:1,
                message:`${studentName}选择${courceName}成功`
            }
        }else {
            ctx.body = {
                code:-2,
                message:`${studentName}选择${courceName}失败`
            }
        }
        
    }
    async findOne(id){
        // console.log(id)
        let rs1  = await db(`select * from cource where cource_id =? `,id)
        let person =  parseInt(rs1[0].person) +1
        let rs = await db(`update cource set person = ${person} where cource_id = '${id}';`)
        console.log(rs)
        return rs
    }
}


module.exports = new Student()