var db = require("../../db/index")
class Teacher {
    async myCorce(ctx){
        let { teacherId} = ctx.request.query
        let rs = await db(`select * from cource where teacherId =? `,teacherId)
        ctx.body = rs
    }

    async studentForCource(ctx){
        let { courceId} = ctx.request.query
        // console.log(courceId)
        let rs = await db(`select * from studentCource where courceId =? `,courceId)
        // console.log(rs)
        ctx.body = rs
    }
    // 学生得分与否
    async studentForScore(ctx){
        // UPDATE `Gp16`.`studentCource` SET `score` = '0', `status` = '0' WHERE (`id` = '1');
        let { id,status,courceScore} = ctx.request.query
        // console.log(ctx.request.query)
        if(status == '1'){
            await db(`update studentCource set score = '${courceScore}', status = '${status}' WHERE id = ${id}`)
            ctx.body = {
                code:1,
                message:"评分成功"
            }
        }else {
            await db(`update studentCource set score = '0', status = '${status}' WHERE id = ${id}`)
            ctx.body = {
                code:1,
                message:"评分成功"
            }
        }
        
        // console.log(rs)
        
    }
}


module.exports = new Teacher()