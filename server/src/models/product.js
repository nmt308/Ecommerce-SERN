'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Category, {
                foreignKey: 'category_id',
            });
            Product.belongsTo(models.Brand, {
                foreignKey: 'brand_id',
            });
            Product.hasMany(models.Order_detail, {
                foreignKey: 'product_id',
            });
            Product.hasMany(models.Banner_detail, {
                foreignKey: 'product_id',
            });
            Product.hasMany(models.News_detail, {
                foreignKey: 'product_id',
            });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            oldprice: DataTypes.INTEGER,
            image: DataTypes.TEXT,
            description: DataTypes.TEXT,
            specification: DataTypes.TEXT,
            buyturn: DataTypes.INTEGER,
            quantity: DataTypes.INTEGER,
            brand_id: DataTypes.INTEGER,
            category_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: 'Product',
        },
    );
    return Product;
};
