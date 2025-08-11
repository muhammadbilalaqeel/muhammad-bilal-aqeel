// swaggerOptions.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Tasks API",
      version: "1.0.0",
      description: "A simple Express Tasks API",
    },
    servers: [
      {
        url: "http://localhost:8000/api", 
      },
    ],
  },
  apis: ["./routes/*.js","./controllers/*.js","./middlewares/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
