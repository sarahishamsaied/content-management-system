"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("education_institution_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      education_institution: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "education_institutions",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      user_school: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "schools",
          key: "id",
        },
      },
      user_university: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "universities",
          key: "id",
        },
      },
      user_diploma: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "diplomas",
          key: "id",
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
    await queryInterface.dropTable("education_institution_users");
  },
};
