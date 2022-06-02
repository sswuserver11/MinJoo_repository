const db = require("../models/index");//다 가져와서
Member = db.memberinfo;//db등록

exports.saveLogin = async (req,res)=>{
    try{
        data = await memberinfo.findByPk(req.params.email);
        console.log(data);

        if(req.body.email == data.email){
            if(req.body.password == data.password){ //db 와 사용자 입력값 비교
                url = '/useremail/main'
            } else {
                res.render("invalid password")//비밀번호 틀린 창
            }
        } else{
            res.render("invalid email") //이메일 틀린 창
        }
    }
};