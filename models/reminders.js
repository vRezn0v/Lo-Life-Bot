const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	return sequelize.define('reminders', {
        purpose: {
            type: DataTypes.STRING
        },
        authorid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        period: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: false
        },
        public: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
		timestamps: true,
	});
};