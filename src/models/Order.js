const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');

const Order = sequelize.define('Order', {
    idCustomer: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idCart: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProduct: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'validate',
    }
}, {
    tableName: 'orders',
    updatedAt: false
});

module.exports = Order;