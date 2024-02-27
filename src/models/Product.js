const { DataTypes } = require('sequelize');
const sequelize = require('../dbConfig/dbConfig');

const Product = sequelize.define('Product', {

    id_category: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    thumbnail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    excerpt: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_product_associated: {
        type: DataTypes.STRING,
        allowNull: true
    }


}, {
    tableName: 'products',
    timestamps: false

});

module.exports = Product;