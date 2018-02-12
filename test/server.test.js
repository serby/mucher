const { join } = require('path')
const request = require('supertest')
const createServer = require('../server')

describe('mucher', () => {
  describe('defaults', () => {
    let server
    beforeEach(async () => {
      server = (await createServer(join(__dirname, './serve'))).listen(3000)
    })
    afterEach(async () => {
      server.close()
    })
    it('should return 200 from /', async () => {
      const response = await request(server).get('/')
      expect(response.status).toEqual(200)
    })
    it('should return 200 from /main.js', async () => {
      const response = await request(server).get('/main.js')
      expect(response.status).toEqual(200)
    })
    it('should return Hello World from /', async () => {
      const response = await request(server).get('/')
      expect(response.text).toContain('<h1>Hello world!</h1>')
    })
    it('should return 404 for unknown resource', async () => {
      const response = await request(server).get('/404')
      expect(response.status).toEqual(404)
      expect(response.type).toEqual('text/html')
      expect(response.text).toContain('<h1>404 Page not found</h1>')
    })
    it('should have maxAge 600 on 200', async () => {
      const response = await request(server).get('/')
      expect(response.headers['cache-control']).toEqual('max-age=600')
    })
    it('should have maxAge 60 on 404', async () => {
      const response = await request(server).get('/404')
      expect(response.headers['cache-control']).toEqual('max-age=60')
    })
    it('should set X-XSS-Protection to block', async () => {
      const response = await request(server).get('/')
      expect(response.headers['x-xss-protection']).toEqual('1; mode=block')
    })
    it('should set X-XSS-Protection to off for IE', async () => {
      const response = await request(server).get('/').set('user-agent', 'Mozilla/4.0(compatible; MSIE 7.0b; Windows NT 6.0)')
      expect(response.headers['x-xss-protection']).toEqual('0')
    })
    it('should set x-content-type-options to nosniff', async () => {
      const response = await request(server).get('/')
      expect(response.headers['x-content-type-options']).toEqual('nosniff')
    })
    it('should set x-dns-prefetch-control to Off', async () => {
      const response = await request(server).get('/')
      expect(response.headers['x-dns-prefetch-control']).toEqual('Off')
    })
    it('should set x-download-options to noopen', async () => {
      const response = await request(server).get('/')
      expect(response.headers['x-download-options']).toEqual('noopen')
    })
    it('should set x-frame-options to DENY', async () => {
      const response = await request(server).get('/')
      expect(response.headers['x-frame-options']).toEqual('DENY')
    })
  })
})
