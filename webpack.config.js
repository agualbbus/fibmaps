const NODE_ENV = process.env.NODE_ENV || 'local';

let config;

switch (NODE_ENV) {
  case 'local':
    config = require('./config/local.webpack.config.babel');
    break;
  case 'development':
    config = require('./config/development.webpack.config.babel');
    break;
  case 'production':
    config = require('./config/production.webpack.config.babel');
    break;
  case 'qualityassurance':
    config = require('./config/qualityassurance.webpack.config.babel');
    break;
  default:
    console.warn('Unknown or Undefigned Node Environment. Please refer to package.json for available build commands.'); // eslint-disable-line no-console
}

export default config;
