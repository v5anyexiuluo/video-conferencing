'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_AUTH_ROOT: '"http://192.168.2.31:8082/api/v1/"',
  API_DATA_ROOT: '"http://192.168.2.31:8080/api/v1/"' //process.env.BASE_API
})
