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
        url: "https://week3-day1-task1.vercel.app/api", 
      },
    ],
  },
  apis: ["./routes/*.js","./controllers/*.js","./middlewares/*.js"], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
