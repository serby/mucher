const { promisify } = require('util')
const fs = require('fs')
const { join } = require('path')

module.exports = async path => {
  let headers
  try {
    headers = JSON.parse((await promisify(fs.readFile)(join(path, 'headers.json'))).toString())
  } catch (e) {
    return false
  }
  return (ctx, next) => {
    ctx.set(headers)
    return next()
  }
}
