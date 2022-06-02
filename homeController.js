const db = require("../models/index");//다 가져와서
Crew = db.crew_info;//db등록

exports.showLogin = (req,res) => {
    res.render("crewpass_login");
};

exports.saveLogin = (req,res) => {
    try{
        await Member.create({
            email:req.body.email,
            password: req.body.password
        });
        res.render("crewpass_login");
    }catch(err){
        res.status(500).send({
            message:err.message
        });
    }
};