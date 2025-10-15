import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecom Display API',
      version: '1.0.0',
      description: 'Backend for product display + my list (no payments).'
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 4000}`, description: 'Local server' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    },
    security: [{ bearerAuth: [] }]
  },
  apis: ['./src/routes/*.js', './src/models/*.js'] // optional; route-level JSDoc can be added for richer docs
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
