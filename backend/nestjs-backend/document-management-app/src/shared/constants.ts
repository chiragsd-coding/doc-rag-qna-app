// src/shared/constants.ts

export const APP_CONSTANTS = {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    JWT_EXPIRATION_TIME: '1h',
    JWT_REFRESH_EXPIRATION_TIME: '7d',
    DEFAULT_LANGUAGE: 'en',
    SUPPORTED_LANGUAGES: ['en', 'es', 'fr', 'de'],
  };
  
  export const DATABASE_CONSTANTS = {
    DEFAULT_CONNECTION_TIMEOUT: 5000,  // Timeout in milliseconds
    MAX_CONNECTIONS: 10,
  };
  
  export const ERROR_MESSAGES = {
    UNAUTHORIZED_ACCESS: 'You do not have permission to access this resource.',
    RESOURCE_NOT_FOUND: 'The requested resource could not be found.',
    INTERNAL_SERVER_ERROR: 'An internal server error occurred.',
    VALIDATION_ERROR: 'One or more validation errors occurred.',
  };
  