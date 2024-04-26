import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Egrul / Egrip API Scraper',
          version: '1.0.0',
          description: 'The API provides search / scrap functionality for https://egrul.nalog.ru/index.html',
      },
  },
  // Path to the API specs
  apis: ['./src/routes/*.ts'], // Your API routes
};

const specs = swaggerJsdoc(options);

export default specs;