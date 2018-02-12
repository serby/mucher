const serve = require('koa-static')
const Koa = require('koa')
const { join } = require('path')
const notFound = require('./middleware/not-found')
const headers = require('./middleware/headers')
const xss = require('./middleware/xss')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')

const defaultHeaders = {
  'X-Frame-Options': 'DENY',
  'X-DNS-Prefetch-Control': 'Off',
  'x-powered-by': null,
  'X-Download-Options': 'noopen',
  'X-Content-Type-Options': 'nosniff',
  'cache-control': 'max-age=600'
}

module.exports = async (path) => {
  const server = new Koa()
  server.use(async (ctx, next) => {
    ctx.set(defaultHeaders)
    return next()
  })
  server.use(xss)
  server.use(conditional())
  server.use(etag())
  const headersMiddleware = await headers(path)
  if (headersMiddleware) server.use(headersMiddleware)
  server.use(serve(join(path, '/public')))

  // Reduce the cache if we get this far
  server.use(async (ctx, next) => {
    ctx.set('cache-control', 'max-age=60')
    return next()
  })

  const notFoundMiddleware = await notFound(path)
  if (notFoundMiddleware) server.use(notFoundMiddleware)
  return server
}
