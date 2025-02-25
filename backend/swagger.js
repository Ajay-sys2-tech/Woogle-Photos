// swagger.js
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0', // OpenAPI version
    info: {
      title: 'Google Drive API', // Your API name
      version: '1.0.0',
      description: 'API Documentation for My Project', // Short description of your API
    },
  },
  apis: ['./controllers/*.js'], // Path to your API docs
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Serve Swagger docs at /api-docs
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};

module.exports = swaggerDocs;
