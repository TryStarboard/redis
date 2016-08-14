'use strict'

const Redis = require('ioredis')

/**
 * @param  {Object} opts
 * @param  {Object} opts.host
 * @param  {Object} opts.port
 * @param  {Object} opts.password
 * @param  {Object} opts.log
 * @return {Object}
 */
function createClient(opts) {
  const client = new Redis({
    host: opts.host,
    port: opts.port,
    password: opts.password,
    retryStrategy: () => 1000
  })
  client.on('error', (err) => opts.log.error(err))
  return client
}

function createFactory(opts) {
  return function () {
    return createClient(opts)
  }
}

module.exports = {
  createFactory
}
