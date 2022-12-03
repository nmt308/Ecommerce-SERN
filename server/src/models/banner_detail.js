'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner_detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Banner_detail.belongsTo(models.Product,{ foreignKey: 'product_id' })
      Banner_detail.belongsTo(models.Banner,{ foreignKey: 'banner_id' })
    }
  }
  Banner_detail.init({
    banner_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Banner_detail',
  });
  return Banner_detail;
};