const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');

const Cart = sequelize.define('Cart', {
    idCustomer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'active',
    }
}, {
    tableName: 'cart',
    updatedAt: false
});

module.exports = Cart;