var db = require("../../db/index")
// var token = require("jsonwebtoken")

const users = require("../../config/login")
class Login {

    // _createJWT(name){
    //     return token.sign(name, 'edu')
    // }

    async login(ctx){
        let rs = await db(`select * from ${users[ctx.request.body.value]} where name =? `,ctx.request.body.name)
        let res = await db(`select * from ${users[ctx.request.body.value]}_menu`)
        // console.log("--------------------")
        // console.log(res)
        
        if(JSON.stringify(ctx.request.body) == "{}"){
            ctx.body = {
                code:-3,
                message:"请输入用户名密码"
            }
        }else {
            if(rs.length===0){
                let result = {
                    code:-2,
                    msg:"用户名不存在、请先注册"
                }
                ctx.body = result
                return
            }else{
                if(ctx.request.body.password === rs[0].password){
                    // sessionStorage.setItem()
                    // req.session.username = rs[0]["name"];
                    // let tokens = this._createJWT(rs[0]["name"]);
                    // res.set("X-ACCESS-TOKEN", tokens);
                    let info = delete rs[0].password
                    let icar = users[ctx.request.body.value]
                    let result = {
                        code:1,
                        username:rs[0]["name"],
                        message:"用户登陆成功",
                        menu:res[0],
                        icar:icar,
                        rs
                    }
                    ctx.body = result
                }else{
                    let result = {
                        code:-1,
                        msg:"密码错误"
                    }
                    ctx.body = result
                }
            }
        }

        
    }

    

}

module.exports = new Login()