const db = require("../models/index");//다 가져와서
Member = db.memberinfo;//db등록

exports.saveLogin async function(req,res){
    //console.log( req.body);
    var result =  await service_main.SignIn(req);     
    if(result.code ==0)
    {
        // 로그인 성공시 쿠키 생성
         res.cookie('useremail', result.data.useremail);
         res.cookie('userpassword', result.data.userpassword, {
              maxAge:60*60*1000,
              path:"/"
         });
         
         //  로그인 후 사용자 정보를 세션에 저장
         // req.session.user = result;
    }

    return result;
};