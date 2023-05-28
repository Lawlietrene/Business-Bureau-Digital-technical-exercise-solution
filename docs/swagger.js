import swaggerJsDoc from 'swagger-jsdoc';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'KIDSRUS DOCUMENTATION API',
      VERSION: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
    components: {
      schemas: {
        product: {
          type: 'object',
          required: [
            'name',
            'price',
            'countInStock',
            'category',
            'tags',
            'rating',
            'images',
          ],
          properties: {
            name: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            countInStock: {
              type: 'number',
            },
            category: {
              type: 'string',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            rating: {
              type: 'number',
            },
            images: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            description: {
              type: 'string',
            },
            informacion: {
              type: 'string',
            },
          },
        },
        singin: {
          type: 'object',
          required: ['name', 'email'],

          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
          },
        },
        user: {
          type: 'object',
          required: ['name', 'email', 'password', 'isAdmin', 'isEditor'],
          properties: {
            name: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            isAdmin: {
              type: 'boolean',
            },
            isEditor: {
              type: 'boolean',
            },
          },
        },
      },
    },
  },
  apis: ['app.js'],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
