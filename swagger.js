const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KoinSave API Documentation',
      version: '1.0.0',
      description: 'A banking/financial transfer API that allows users to register, authenticate, and transfer money between accounts.',
      contact: {
        name: 'KoinSave Support',
        email: 'support@koinsave.com'
      },
      license: {
        name: 'ISC',
      }
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              description: 'User ID'
            },
            firstName: {
              type: 'string',
              description: 'User first name'
            },
            lastName: {
              type: 'string',
              description: 'User last name'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email'
            },
            phone: {
              type: 'string',
              description: 'User phone number'
            },
            accountNumber: {
              type: 'string',
              description: '10-digit account number'
            },
            balance: {
              type: 'number',
              description: 'Account balance in Naira'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation date'
            },
            notifications: {
              type: 'array',
              items: {
                $ref: '#/components/schemas/Notification'
              }
            }
          }
        },
        Notification: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Notification message'
            },
            date: {
              type: 'string',
              format: 'date-time',
              description: 'Notification date'
            },
            type: {
              type: 'string',
              enum: ['credit', 'debit'],
              description: 'Transaction type'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Error message'
            },
            success: {
              type: 'boolean',
              description: 'Success status'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication endpoints'
      },
      {
        name: 'Transfers',
        description: 'Money transfer operations'
      },
      {
        name: 'Users',
        description: 'User information and notifications'
      },
      {
        name: 'Health',
        description: 'API health check'
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
