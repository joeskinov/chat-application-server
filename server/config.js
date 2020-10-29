/* eslint-disable no-unused-vars */
const path = require('path')
const merge = require('lodash/merge')




const config = {
  all: {
    env: process.env.NODE_ENV || 'development',
    root: path.join(__dirname, '..'),
    port: process.env.PORT || 9000,
    ip: process.env.IP || '0.0.0.0',
    apiRoot: process.env.API_ROOT || '',
    masterKey: 'master',
    jwtSecret: 'jwt',
    mongo: {
      options: {
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
      }
    }
  },
  test: { },
  development: {
    mongo: {
      uri: 'mongodb://localhost/chat-app',
      options: {
        debug: true
      }
    }
  },
  production: {
    ip: process.env.IP || undefined,
    port: process.env.PORT || 8080,
    mongo: {
      uri: process.env.MONGODB_URI || 'mongodb://localhost/chat-app-live'
    }
  }
}

module.exports = merge(config.all, config[config.all.env])
