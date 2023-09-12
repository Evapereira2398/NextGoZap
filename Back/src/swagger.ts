import swaggerAutogen from 'swagger-autogen';

import config from './config';

const outputFile = './src/swagger.json';
const endpointsFiles = ['./src/routes/index.ts'];

const doc = {
  info: {
    version: '2.0.0',
    title: 'WPPConnect API Rest',
    description:
      'Welcome to the wppconnect-server API documentation. This API provides a set of endpoints to interact with the wppconnect-server application, allowing you to build integrations and automate interactions with WhatsApp.',
  },
  host: `${config.host}:${config.port}`,
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
  tags: [
    {
      name: 'Auth',
      description: '',
    },
    {
      name: 'Chat',
      description: 'Manages chat-related operations.',
    },
    {
      name: 'Contact',
      description:
        'Handles operations related to contacts, such as managing contact lists, adding or removing contacts, and retrieving contact information.',
    },
    {
      name: 'Catalog & Bussiness',
      description:
        'Handles operations related to catalogs and business-related functionalities, such as managing product catalogs and business information.',
    },
    {
      name: 'Community',
      description: 'Manage communities.',
    },
    {
      name: 'Messages',
      description:
        'Handles message-related operations, including sending, receiving, and managing messages.',
    },
    {
      name: 'Profile',
      description:
        'Manages user profile-related operations, such as retrieving and updating profile information',
    },
    {
      name: 'Status Stories',
      description:
        'Handles operations related to status stories, such as viewing, updating, and managing status stories',
    },
    {
      name: 'Labels',
      description:
        'Manages labels or tags associated with chats or messages for organization and categorization purposes.',
    },
    {
      name: 'Group',
      description:
        'Manages operations related to WhatsApp groups, such as creating, modifying, and managing group settings.',
    },
    {
      name: 'Misc',
      description:
        'Handles miscellaneous operations that do not fit into other specific categories.',
    },
  ],
  definitions: {},
  components: {
    '@schemas': {
      session: {
        type: 'string',
        schema: 'NERDWHATS_AMERICA',
      },
    },
  },
};

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
