
let path = require('path')
let glob = require('glob')
const cwd = path.join(__dirname, '..')
const { parse } = require('vue-docgen-api')
const isProd = process.env.NODE_ENV === 'production'
const docFiles = glob.sync('components/**/*.md', { cwd }).map(f => '/' + f)  //获得.md文件的目录结构 
console.log(docFiles)
module.exports = {
  title: 'API 接口文档',  // 设置网站标题
  description : 'API 接口文档', // 描述
  base : isProd ? '/hejiansong-api/': '/', // 文档地址
  // base: '/',
  port: 7000, //端口,
  dest: './docs/dist', // 设置输入目录
  themeConfig : { // 主题配置
    nav : [ // 添加导航栏
        { text: '指南', link: '/guide/' },
        { text: 'api', link: '/api/' }
    ],
    sidebar: { // 为以下路由添加侧边栏
      // '/test/': [
      //   {
      //     title: '布局类组件',
      //     collapsable: true,
      //     children: [
      //       ['base/新增标签', '新增标签']
      //     ]
      //   }
      // ]
    },
    // sidebar: 'auto',
    sidebarDepth : 2
  },
  locales: {
    '/': { // 默认语言配置
      lang: 'zh-CN',
      title: 'VuePress',
      description: 'Vue 驱动的静态网站生成器'
    },
    '/en/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'VuePress',
      description: 'Vue-powered Static Site Generator'
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@assets': path.resolve(__dirname, './public/assets'),
        '@components': path.resolve(__dirname, './components')
      }
    }
  },
  plugins: [
    ['demo-container', {
      component: 'DemoBlock',
      locales: [
        {
          'lang': 'zh-CN',
          'demo-block': {
            'hide-text': '隐藏代码',
            'show-text': '显示代码',
            'copy-text': '复制代码',
            'copy-success': '复制成功'
          }
        },
        {
          'lang': 'en-US',
          'demo-block': {
            'hide-text': 'Hide',
            'show-text': 'Expand',
            'copy-text': 'Copy',
            'copy-success': 'Successful'
          }
        }
      ]
    }],
    ['vuepress-plugin-typescript', {
      tsLoaderOptions: {
        // ts-loader 的所有配置项
      }
    }]
  ]
}