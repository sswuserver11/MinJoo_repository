// npm install passport passport-local-sequelize 확인

const db = require("../models/index"),
    passport =require("passport"),
    Member = db.memberinfo;

module.exports = {
    login: (req, res) => {
        res.render("/login");
    },
    logout: (req, res, next) => {
        req.logout((err) => {
            req.flash("success", "You have been logged out!");
            res.locals.redirect = "/";
            next();
        });
    },

    authenticate: passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: "로그인에 실패하였습니다.",
        successRedirect: "/",
        successFlash: "로그인에 성공하였습니다."
    }),


/*
authenticate: async (req, res, next) => {
    try {
        let memberinfo = await Member.findOne({where: { email: req.body.email } });
        if (memberinfo && memberinfo.password === req.body.password) {
            res.locals.redirect = '/';
            console.log(memberinfo);
            req.flash("success", '로그인에 성공하였습니다');
            res.locals.memberinfo = memberinfo;
            next();
        } else {
            req.flash("error", "이메일 혹은 비밀번호가 일치하지 않습니다. 다시 시도해 주세요");
            res.locals.redirect = "/login";
            next();
        }
    } catch(err) {
        console.log('Error logging in user: ${err.message}');
        next(err);
    };
}
*/

}