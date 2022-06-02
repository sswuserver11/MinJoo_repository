module.exports=(sequelize, Sequelize)=>{
    const Member=sequelize.define("memberinfo",{
        email:{
            type:Sequelize.STRING(40),
            primaryKey:true
        },
        password:{
            type:Sequelize.STRING(20)
        },
        name:{
            type:Sequelize.STRING(10)
        },
        birth:{
            type:Sequelize.DATE
        },
        phone_numb:{
            type:Sequelize.STRING(11)
        }
    },{ //기본코드
        sequelize,
        modelName:'memberinfo', //DB 속 테이블명과 동일할 것
        freezeTableName:true, //DB에 테이블을 생성할 때, 위 modelName 뒤에 s를 붙여 테이블 생성하는 것을 방지
        timestamps:false //createdAt, updateAt 속성이 생성됨을 방지
    });
    return Member;
};