const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('servers', {
        name: {
            type: DataTypes.STRING
        },
        serverid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        ownerid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        serverprefix: {
            type: DataTypes.STRING,
            defaultValue: "moth-",
            allowNull: false
        },
        loggingstatus: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        /*power_roles: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },
        trusted_roles: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true
        },*/
        vote_mute_threshold: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            allowNull: false            
        },
        vote_mute_timeout: {
            type: DataTypes.INTEGER,
            defaultValue: 60,
            allowNull: false
        },
        muteRole: {
            type: DataTypes.STRING,
            defaultValue: "Muted",
            allowNull: true
        },
        reportChannel: {
            type: DataTypes.STRING,
            defaultValue: "reports",
            allowNull: true
        },
        logChannel: {
            type: DataTypes.STRING,
            defaultValue: "logs",
            allowNull: true
        }
    }, {
		timestamps: false,
	});
};