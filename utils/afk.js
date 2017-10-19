const Sequelize = require('sequelize');
const Database  = require('../database.js');
const database  = Database.db

const afkUsers = database.define('afkUsers', {
    guild: {
        type: Sequelize.STRING(25),
		unique: true
    },
    user: {
		type: Sequelize.STRING(25),
		unique: true
	},
	reason: {
		type: Sequelize.TEXT,
	}
});

module.exports = {
    goAFK: async (msg, reason, global) => {
        afkUsers.upsert({
            guild: global ? "global" : msg.guild.id,
			user: msg.member.id,
			reason: reason
		});
    },
    unAFK: async (msg) => {
        afkUsers.findOne({
			where: {
                user: msg.member.id,
                $or: [
                    {
                        guild: msg.guild.id
                    },
                    {
                        guild: "global"
                    }
                ]
			}
		}).then((entry) => {
            if(!entry) return;
            msg.channel.send(`⌨ | I've removed your AFK, ${msg.member.displayName}.`);
            return entry.destroy();
        })
    },
    checkMentions: (msg, userCollection) => {
        let orArray = [];
        userCollection.keyArray().forEach((id) => {
            orArray.push({
                user: id,
                guild: msg.guild.id
            });
            orArray.push({
                user: id,
                guild: "global"
            })
        });

        userCollection.keyArray().forEach((id) => {
            afkUsers.findAll({
                where: {
                    user: id,
                    $or: orArray
                }
            }).then((entries) => {
                entries.forEach((entry) => {
                    return msg.channel.send(`💤 | ${userCollection.get(id).username} is AFK${entry.dataValues.reason == "noreason" ? "." : ': "' + entry.dataValues.reason + '"'}`);                    
                })
            })
        })
    },
    isAFK: async (msg) => {
        return new Promise((resolve) => {
            afkUsers.findOne({
                where: {
                    user: msg.member.id,
                    $or: [
                        {
                            guild: msg.guild.id
                        },
                        {
                            guild: "global"
                        }
                    ]
                }
            }).then((entry) => {
                if(!entry) return resolve(false);
                return resolve(true);
            })
        })
    }
}