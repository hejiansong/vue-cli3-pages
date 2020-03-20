module.exports = {
  port: 3000,
  proxyTable: {
    '/api': {
      target: 'http://localhost:3000/module1',
      changeOrigin: true
    }
  }
}