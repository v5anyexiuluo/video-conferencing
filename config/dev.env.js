'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_AUTH_ROOT: '"https://videoconf.space:8083/api/v1"',
  API_LINKS_ROOT: '"https://videoconf.space:8082/api/v1"',
  API_MEETING_ROOT: '"https://videoconf.space:8084/api/v1"',
  API_NOTIFY_ROOT: '"https://videoconf.space:8085/api/v1"',
  API_WS_ROOT: '"https://videoconf.space:8085/api/v1"',
  API_CHAT_ROOT: '"https://videoconf.space:8086/api/v1"'
})
