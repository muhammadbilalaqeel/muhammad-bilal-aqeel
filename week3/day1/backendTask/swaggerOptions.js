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
        url: "https://day1-2i4vvgg12-muhammad-bilal-aqeels-projects.vercel.app/api-docs/api",
      },
    ],
  },
  apis: ["./routes/*.js", "./controllers/*.js", "./middlewares/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
