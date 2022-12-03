'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News_detail.belongsTo(models.News,{ foreignKey: 'news_id' })
      News_detail.belongsTo(models.Product,{ foreignKey: 'product_id' })
    }
  }
  News_detail.init({
    news_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'News_detail',
  });
  return News_detail;
};