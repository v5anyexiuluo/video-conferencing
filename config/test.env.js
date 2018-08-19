'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_AUTH_ROOT: '"https://xingshidream.cn:8083/api/v1"',
  API_LINKS_ROOT: '"https://xingshidream.cn:8082/api/v1"',
  API_MEETING_ROOT: '"https://xingshidream.cn:8084/api/v1"',
  API_NOTIFY_ROOT: '"https://xingshidream.cn:8085/api/v1"',
  API_CHAT_ROOT: '"https://xingshidream.cn:8086/api/v1"'
})
