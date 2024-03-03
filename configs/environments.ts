export interface ConfigurationOptions {
  NODE_ENV: '"development"' | '"staging"' | '"production"';
  NAME: string;
  HOST_URL: string;
  API_ENDPOINT: string;
  SITE_MAP_PATHS?: Array<string>;
}

// Development environment configurations
export const devConfigs: ConfigurationOptions = {
  NODE_ENV: '"development"',
  NAME: 'My React Application',
  HOST_URL: 'https://localhost:8080',
  API_ENDPOINT: 'https://localhost:8000/api/'
};

// Staging environment configurations
export const stagingConfigs: ConfigurationOptions = {
  NODE_ENV: '"staging"',
  NAME: 'My React Application',
  HOST_URL: 'https://staging.mysite.com',
  API_ENDPOINT: 'https://staging.mysite.com/api'
};

// Production environment configurations
export const prodConfigs: ConfigurationOptions = {
  NODE_ENV: '"production"',
  NAME: 'My React Application',
  HOST_URL: 'https://mysite.com',
  API_ENDPOINT: 'https://mysite.com/api',
  SITE_MAP_PATHS: ['']
};
