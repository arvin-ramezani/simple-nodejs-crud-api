# Express.js and MongoDB CRUD Restful API Documentation

## Introduction:

---

This document provides a comprehensive guide on how to set up and use a simple CRUD Restful API using Express.js, TypeScript, and MongoDB. The API allows for creating, reading, updating, and deleting student documents from a MongoDB database. It is built using Node.js version 18.18.0.

### Prerequisites:

---

Before running the application locally, ensure that you have the following prerequisites set up on your machine:

1. Node.js version 18.18.0 installed.
2. MongoDB URI available.
3. `.env` file created with the required configurations. You can refer to `.env-example` for guidance.

## Installation:

To start using the API, follow these steps:

1. Clone the repository by running the following command:

   ```shell
   git clone https://github.com/arvin-ramezani/simple-nodejs-crud-api.git
   ```

2. Install the required dependencies by running the following command in the project directory:
   ```shell
   yarn install
   ```

## Running the API:

To run the API in the development environment, execute the following command:

```shell
yarn dev
```

## API Routes:

The following routes are available for accessing the API:

1. **GET: /api** - Retrieves all students.
2. **GET: /api/:id** - Retrieves a student with a specific ID.
3. **POST: /api** - Creates a new student.
4. **PATCH: /api/:id** - Edits an existing student.
5. **DELETE: /api/:id** - Deletes a student by ID.

Note: Replace `:id` with the actual student ID in the URL.

## Student Fields:

Each student document should include the following fields:

1. "first name"
2. "last name"
3. "National Code"
4. "Phone Number"
5. "Father Name"
6. "School Name"
7. "Educational Level"

## Libraries and Tools:

The following libraries and tools are utilized in this API:

1. **Express.js** - A web application framework for Node.js that simplifies the development of APIs.
2. **TypeScript** - A strongly-typed superset of JavaScript that enables static type checking and enhanced code quality.
3. **MongoDB** - A NoSQL database used for storing student documents.
4. **Mongoose** - A library used for connecting and interacting with MongoDB databases in Node.js..
5. **express-validator** - A middleware for Express.js that helps with request validation.
6. **Swagger** - A tool for documenting APIs with interactive documentation and client SDK generation.
7. **Vitest** - A JavaScript testing framework for unit tests.

## Conclusion:

This document has provided an overview of a simple CRUD Restful API built with Express.js, TypeScript, and MongoDB. It covers the configuration, routes, and libraries used in the application. By using this API, you can easily perform CRUD operations on student documents stored in a MongoDB database.
