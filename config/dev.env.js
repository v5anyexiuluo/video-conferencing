'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_AUTH_ROOT: '"http://118.24.65.48:8083/api/v1"',
  API_LINKS_ROOT: '"http://118.24.65.48:8082/api/v1"',
  API_MEETING_ROOT: '"http://118.24.65.48:8084/api/v1"',
  API_NOTIFY_ROOT: '"http://118.24.65.48:8085/api/v1"',
  API_CHAT_ROOT: '"http://118.24.65.48:8086/api/v1"'
})
