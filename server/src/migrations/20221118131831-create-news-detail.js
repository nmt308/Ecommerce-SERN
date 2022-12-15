'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('News_details', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            news_id: {
                type: Sequelize.INTEGER,
                unique: true,
                allowNull: false,
                references: {
                    model: 'News',
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
            content: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('News_details');
    },
};
