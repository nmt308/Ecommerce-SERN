'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Banner_details', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            banner_id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: 'Banners',
                    key: 'id',
                },
            },
            product_id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: 'Products',
                    key: 'id',
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Banner_details');
    },
};
