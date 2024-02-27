const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');

const CartProduct = sequelize.define('CartProduct', {
    idCart: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProduct: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    }
}, {
    tableName: 'cart_product',
    timestamps: false
});

module.exports = CartProduct;