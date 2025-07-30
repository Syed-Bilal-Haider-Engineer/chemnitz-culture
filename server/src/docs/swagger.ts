const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Chemnitz Cultural Sites API',
  },
  host: 'localhost:4000',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['./server.ts']; // <- point to the root entry file, NOT individual routes

swaggerAutogen(outputFile, routes, doc).then(() => {
  console.log('✅ Swagger docs generated successfully');
});
