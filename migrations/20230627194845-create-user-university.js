"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_universities", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      university_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "universities",
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
      gpa: {
        type: Sequelize.FLOAT,
      },
      degree: {
        type: Sequelize.ENUM(
          "Bachelor's degree",
          "Doctoral Degree",
          "Master Degree",
          "Associate Degree",
          "Professional Degree",
          "Bachelor of Arts",
          "Bachelor of Science",
          "Bachelor of Engineering",
          "Bachelor of Education",
          "Bachelor of Applied Sciences",
          "Bachelor of Architecture",
          "Bachelor of Applied Arts"
        ),
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
    await queryInterface.dropTable("user_universities");
  },
};
