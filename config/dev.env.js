'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_AUTH_ROOT: '"http://182.254.146.100:8898/api"',
  API_DATA_ROOT: '"http://182.254.146.100:8899/api"' //process.env.BASE_API
})
