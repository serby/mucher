const { promisify } = require('util')
const fs = require('fs')
const { join } = require('path')

module.exports = async path => {
  let notFoundContent
  try {
    notFoundContent = (await promisify(fs.readFile)(join(path, '404.html'))).toString()
  } catch (e) {
    return false
  }
  return (ctx, next) => {
    if (notFoundContent) {
      ctx.body = notFoundContent
      ctx.type = 'text/html'
    } else {
      ctx.body = 'Not Found'
    }
    ctx.status = 404
  }
}
