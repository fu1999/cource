const db = require("../db/index")
// const lis = require("../config/index")

class DBController{


    async getInfo(ctx){
        // console.log(req.query)
        let result = await db(`select * from teacher_menu`);
        console.log(result)
        ctx.body = result[0]
    }


    // async getList(req,res){ 
    //     // console.log(req.query)
    //     let {page,size} = req.query
    //     let result = await db(`select * from ${lis[req.query.num]}`);
    //     // console.log(result.length)
    //     let pages = (page-1)*size
    //     let sizes = page*size
    //     let rs = await db(`select * from ${lis[req.query.num]} limit  ${pages},${sizes}`)
    //     res.send({
    //         code:1,
    //         total:result.length,
    //         list:rs
    //     })
    // }



}

module.exports = new DBController()