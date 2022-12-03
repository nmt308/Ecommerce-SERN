'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.hasMany(models.News_detail,{
        foreignKey: 'news_id'
      })
    }
  }
  News.init({
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};