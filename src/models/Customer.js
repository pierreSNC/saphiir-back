const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');
const bcrypt = require('bcrypt');


const Customer = sequelize.define('Customer', {
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'customers',
    hooks: {
        beforeCreate: async (customer) => {
            if (customer.password) {
                const salt = await bcrypt.genSalt(10);
                customer.password = await bcrypt.hash(customer.password, salt);
            }
        },
        beforeUpdate: async (customer) => {
            if (customer.password) {
                const salt = await bcrypt.genSalt(10);
                customer.password = await bcrypt.hash(customer.password, salt);
            }
        }
    }
});

module.exports = Customer;
