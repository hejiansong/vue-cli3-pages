const path = require('path')
const Koa = require('koa')
const send = require('koa-send');
const koaStatic = require('koa-static')
const httpProxyMiddleware = require('http-proxy-middleware')
const koaConnect = require('koa2-connect')
const chalk = require('chalk');
const glob = require('glob')
const { port, proxyTable } = require('./config')
const isDocServe = process.env.SERVE_ENV === 'doc' // 是否doc服务
// 获取模块根路径
function getModuleRoot(module = '') {
  return path.resolve(`dist/${module}`);
}
// 匹配图片资源路径
function staticReg (path) {
  return /\.(jpg|gif|png|jpge|bmp)$/.test(path)
}

const modules = glob.sync(`./src/modules/**/*.html`).map(entry => entry.split('/').splice(-2, 1)[0])

const app = new Koa()
// 引入静态文件
.use(koaStatic(path.resolve('dist')))
.use(async (ctx, next) => {
  let module = ctx.path.split('/')[1] || 'index'
  // 匹配图片资源路径
  if (staticReg(ctx.path) || ctx.path.includes('chunk')) await send(ctx, ctx.path.split('/').splice(-2).join('/'), { root: getModuleRoot('') })
  // 匹配模块入口
  else if (modules.includes(module)) await send(ctx, '/index.html', { root: getModuleRoot(module) })
  // css,js静态资源路径
  else if (ctx.accept.headers.referer) {
    let resource = ctx.accept.headers.referer.split('/').filter(r => modules.includes(r))[0] || 'index';
    await send(ctx, ctx.path, { root: getModuleRoot(resource)})
  }
});
// 代理兼容封装
const proxy = function (context, options) {
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  return async function (ctx, next) {
    await koaConnect(httpProxyMiddleware(context, options))(ctx, next)
  }
}

Object.keys(proxyTable).map(context => {
  const options = proxyTable[context]
  // 使用代理
  app.use(proxy(context, options))
})
app.listen(port, () => console.log(chalk.yellow(`Access to the address: http://localhost:${port}`)))