const swaggerJsDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Saint Seiya API",
      version: "1.0.0",
      description: "A complete API to access detailed information about the characters from the anime Saint Seiya.",
    },
    servers: [
      {
        url: "https://www.saintseiyaapi.com/api",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpecs = swaggerJsDoc(options);

module.exports = swaggerSpecs;
