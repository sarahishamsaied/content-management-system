# content-management-system
an upcoming CMS backend system created using Typescript, NodeJs, MySQL.   

# CMS System Documentation

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
   - [Project Setup](#project-setup)
   - [Running the Project](#running-the-project)
   - [Database Migrations](#database-migrations)
   - [Environment Configuration](#environment-configuration)
3. [Technology Stack](#technology-stack)
4. [Authentication and Authorization](#authentication-and-authorization)
5. [API Reference](#api-reference)
6. [Database Diagram](#database-diagram)


## 1. Introduction 

The CMS System is a powerful content management system that enables users to manage job listings, educational institutions, user profiles, and social interactions. It provides a robust platform for companies, educational institutions, and users to connect and engage in a seamless manner.

## 2. Getting Started

### 2.1 Project Setup

To set up the CMS System, follow these steps:

1. Clone the project repository from GitHub.
2. Install the required dependencies using `npm install`.
3. Configure the environment variables by creating a `.env` file.
4. Set up the database connection by configuring the `sequelize.config.js` file.

### 2.2 Running the Project

To run the CMS System locally, use the following command:

      npm run dev

### 2.3 Database Migrations

The CMS System utilizes Sequelize migrations for managing the database schema. To run the migrations, use the following command:

      npm run db:migrate



### 2.4 Environment Configuration

The CMS System relies on environment variables for configuration. Ensure that you have a `.env` file in the project root directory and specify the required variables.

  #### .env sample:
    DATABASE_NAME = ""
    DATABASE_PASSWORD = ""
    DATABASE_HOST = ""
    DATABASE_USER = ""
    DATABASE_DRIVER = ""
    PORT = 
    DATABASE_PORT = 
    SALT_ROUNDS = 
    TOKEN_SECRET = ""


## 3. Technology Stack

The CMS System is built using the following technologies:

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (Database)

## 4. Authentication and Authorization
  ### 4.1 Authentication 
   The authentication system relies on ***JWT (JSON Web Tokens)*** for secure and ***stateless*** authentication. Users receive a JWT upon login, 
   which they include in their requests ***authorization*** header to access protected resources. 
   The JWT is verified by the ***authentication/authorization*** middleware to ensure the user's identity and authorization.
  ### 4.2 ***Authorization Middlewares***
  #### verifyAccessToken:
  his middleware is responsible for verifying the validity and authenticity of an access token provided by the client.
  It checks if the access token is properly signed and has not expired.

  #### validateAccessToken:
  This middleware validates the access token and extracts the relevant user information from it.
  It ensures that the access token is valid and associated with an existing user.

  #### adminMiddleware:
  It checks if the authenticated user has administrative privileges.
  #### checkOwnership:
  This middleware is used to verify the ownership of a resource, such as a post.
  It ensures that only the user who owns the post has permission to ***delete*** or ***edit*** it.

## 5. API Reference

For the ***API Documentation***, Enter the following url in your browser: <i>http://localhost:{your_port}/api-docs</i> to interact with the APIs within your browser.

***Sample:*** 
a. APIs:
![image](https://github.com/sarahishamsaied/content-management-system/assets/71923204/0f06886c-4c4f-4f30-984b-5445c425b3ce)

b. Model Definitions:
<div>
  <img src="https://github.com/sarahishamsaied/content-management-system/assets/71923204/efb3f3d2-0660-4e59-847a-a559784300fb" alt="Image 1" style="width: 35%;">
  <img src="https://github.com/sarahishamsaied/content-management-system/assets/71923204/dfc2c2b0-e026-4d26-8e37-60e2d6e82a02" alt="Image 2" style="width: 30%;">
</div>


## Database Diagram:
![Flowcharts](https://github.com/sarahishamsaied/content-management-system/assets/71923204/8bfbda21-c0da-4794-8c12-3dc31cb8d06b)


