# Pizza Order Application

This is a Pizza Order Application built with NestJS, GraphQL, TypeORM, PostgreSQL.

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Database Configuration](#database-configuration)
- [Usage](#usage)
  - [Starting the App](#starting-the-app)
  - [Using GraphQL](#using-graphql)
- [Authentication](#authentication)
  - [Generating JWT Token](#generating-jwt-token)
  - [Authorization Header](#authorization-header)

## Getting Started
- Pizza order application, that handles products, orders and users.
### Installation

1. Clone this repository to your local machine:
   git clone https://github.com/hellscreamz/pizza-order-app.git

2. cd pizza-order-app

3. npm install

## Database Configuration

- Just check the .env file and align your connection with the already provided values

## Starting the App

- npm start

## Using GraphQL

- Visit the GraphQL Playground at http://localhost:3000/graphql to interact with the API. You can use the GraphQL Playground to execute queries and mutations.

## Generating JWT Token

- To generate a JWT token for a user, you need to use the loginUser mutation but before that you need to create a user and use the email and password for login.

- This will provide JWT token that you MUST use in authorization header for every request to the server

## Authorization Header

- For every GraphQL request that requires authentication, you need to include the JWT token in the Authorization header. Set the header in graphQL playground as follows:
- "Authorization": "your-generated-token"


