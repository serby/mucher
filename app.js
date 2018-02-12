#!/usr/bin/env node

const optimist = require('optimist')
const createServer = require('./server')
const { path, port } = optimist.usage('Usage: $0 --port [3842] --path [.]')
  .default('port', 3842)
  .default('path', '.')
  .argv

createServer(path).then(server => {
  server.listen(port)
  console.log(`Serving ${path} on port ${port}`)
})
