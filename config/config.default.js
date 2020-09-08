/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1599298866691_8552';

  // add your middleware config here
  config.middleware = ['errorHandler']
  
  config.swaggerdoc = {
    dirScanner: './app/controller',
    appInfo: {
      title: 'egg server api',
      description: 'swagger-ui for egg',
      version: '1.0.0'
    },
    schemes: [ 'http', 'https' ],
    consumes: [ 'application/json' ],
    produces: [ 'application/json' ],
    enableSecurity: false,
    // enableValidate: true,
    routerMap: true,
    enable: true
  }
  
  config.mongoose = {
    url: 'mongodb://127.0.0.1:15498/egg-server',
    options: {
      // useMongoClient: true,
      // autoReconnect: true,
      // reconnectTries: Number.MAX_VALUE,
      bufferMaxEntries: 0,
      useUnifiedTopology: true,
      useCreateIndex: true
    },
  }

  // add your user.js config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
