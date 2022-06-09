const express = require("express"),
    layouts = require("express-ejs-layouts"),
    app = express(),
    

    router = require('express').Router(),

    loginController = require("./controllers/loginController"),
    errorController = require("./controllers/errorController"),

    db = require("./models/index");

const passport = require("passport");

const session = require("express-session"),
    flash = require("connect-flash");

// db.sequelize.sync();
db.sequelize.sync({force: true});

const Member = db.memberinfo;

//ejs를 템플릿용으로 사용
app.set("views", __dirname + "/views");
app.set("view engine","ejs");
app.set("port", process.env.PORT || 80);

router.use(express.json());
router.use(layouts);
router.use(express.static(__dirname+"/public"));

router.use(
    express.urlencoded({
        extended: false
    })
);

// 세션유지 쿠키
router.use(
    session({
        secret: "crewpass_sswu11",
        cookie: {
            maxAge: 4000000
        },
        resave: false,
        saveUninitialized: false
    })
);

router.use(flash());

router.use(passport.initialize());
router.use(passport.session());
passport.serializeUser(Member.serializeUser());
passport.deserializeUser(Member.deserializeUser());

router.use((req, res, next) => {
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.flashMessages = req.flash();
    next();
});

//컨트롤러-로그인 & 로그아웃
router.get("/login", loginController.login);
router.post('/login', loginController.authenticate);
// router.post('/login', loginController.authenticate, loginController.redirectView);
router.get("/logout", loginController.logout, loginController.redirectView);

router.get("/users/:id", usersController.show, usersController.showView);

//컨트롤러-에러시
router.use(errorController.pageNotFoundError);
router.use(errorController.internalServerError);

app.use("/",router);//루트로 들어오면 router로 연결

app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);

});

module.exports = router;