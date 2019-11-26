let path = require('path')
let glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, dir)
}
//配置pages多页面获取当前文件夹下的html和js
function getEntry (globPath) {
  let entries = {}, basename, tmp;
  glob.sync(globPath).forEach(entry => {
    tmp = entry.split('/').splice(-3)
    basename = tmp[1];
    entries[basename] = {
      entry: `src/${tmp[0]}/${tmp[1]}/main.js`,
      template: `src/${tmp[0]}/${tmp[1]}/${tmp[2]}`,
      title:  tmp[2],
			filename: tmp[2]
    };
  });
  return entries;
}

let pages = getEntry('./src/modules/**/*.html');
console.log(pages, process.env.NODE_ENV === 'production', path.join(__dirname, './dist'))
//配置end

module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production', // 禁用eslint,
  publicPath: '/',
	productionSourceMap: false,
	pages,
  devServer: {
    index: 'index.html', //默认启动serve 打开page1页面
		open: process.platform === 'darwin',
		host: '',
		port: 8088,
		https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target: 'http://reg.tool.hexun.com/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  },
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        // 修改它的选项...
        options.limit = 100
        return options
      })

    config.resolve.alias
      .set('@', resolve('src')) // 配置模块路径公共变量
      .set('@test', resolve('src/modules/test'))

    Object.keys(pages).forEach(entryName => {
			config.plugins.delete(`prefetch-${entryName}`);
    });
    
		if(process.env.NODE_ENV === 'production') {
			config.plugin('extract-css').tap(() => [{
				path: path.join(__dirname, './dist'),
				filename: 'css/[name].[contenthash:8].css'
			}]);
		}
  },
  configureWebpack: config => {
		// if(process.env.NODE_ENV === 'production') {
		// 	config.output = {
    //     path: path.join(__dirname, './dist'),
		// 		filename: 'js/[name].[contenthash:8].js'	
		// 	};
		// }
	}
}