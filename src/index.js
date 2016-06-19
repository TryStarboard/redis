'use strict';

const Redis = require('ioredis');

function createClient(opts) {
  const client = new Redis({
    host: opts.host,
    port: opts.port,
    password: opts.password,
    retryStrategy: () => 1000,
  });
  client.on('error', (err) => opts.log.error(err));
  return client;
}

function createFactory(opts) {
  return function () {
    return createClient(opts);
  };
}

module.exports = {
  createFactory,
};
