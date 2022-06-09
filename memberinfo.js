module.exports = (sequelize, Sequelize) => {
    class Member extends Sequelize.Model {
        /*
        static async findByPkAndUpdate(email, params) {
            let memberinfo = await MemberfindByPk(email);
            if (memberinfo) {
                memberinfo = await Member.update(params, {
                    where: {email: email}
                });
            }
            return memberinfo;
        }
        static async findByPkAndRemove(email) {
            let memberinfo = await Member.findByPk(email);
            if (memberinfo) {
                memberinfo = await Member.destroy({
                    where: {email: email}
                });
            }
            return memberinfo;
        } 
        */
    };
    Member.init({
        email: {
            type: Sequelize.STRING(40),
            primaryKey: true
        },
        password: {
            type: Sequelize.STRING(20),
            allowNull: false
        },
        birth: {
            type:Sequelize.DATE,
            allowNull: false
        },
        phone_numb: {
            type: Sequelize.STRING(11),
            allowNull: false
        },
        /* myhash: {
            type: Sequelize.STRING(1024)
        },
        mysalt: {
            type: Sequelize.STRING
        }
        */
    }, 
    
    {
        hooks: {
            // 만들어진 instance를 DB에 저장하기 전에
            beforeSave: async (memberinfo) => {
             
                if (memberinfo.subscribedAccount === undefined) {
                    try {
                        let subscriber = await Subscriber.findOne({
                            where: {
                                email: memberinfo.email
                            }
                        });
                        if (subscriber) {
                            console.log(subscriber.getDataValue('id'));
                            memberinfo.subscribedAccount = subscriber.getDataValue('id');
                        }
                    } catch (err) {
                        console.log('Error in connecting Subscriber: $(err.message}');
                    }
                }
            }
        },
        sequelize,
        modelName: 'memberinfo',
        freezeTableName: true,
        timestamps: false
    });

    return Member;
}