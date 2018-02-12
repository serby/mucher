// From https://github.com/helmetjs/x-xss-protection
module.exports = (ctx, next) => {
  const matches = /msie\s*(\d+)/i.exec(ctx.headers['user-agent'])
  let value
  if (!matches || (parseFloat(matches[1]) >= 9)) {
    value = '1; mode=block'
  } else {
    value = '0'
  }

  ctx.set('X-XSS-Protection', value)
  return next()
}
