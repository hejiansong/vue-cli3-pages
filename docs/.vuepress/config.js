module.exports = {
  title: 'API 接口文档',  // 设置网站标题
  description : 'API 接口文档', // 描述
  base : '/hejiansong-api/', // 文档地址
  port: 7000, //端口,
  dest: './dist', // 设置输入目录
  themeConfig : { // 主题配置
    nav : [ // 添加导航栏
        { text: '指南', link: '/guide' },
        { text: 'api', link: '/api' }
    ],
    sidebar: { // 为以下路由添加侧边栏
      '/baseComponents/': [
        {
          title: '布局类组件',
          collapsable: true,
          children: [
            'base/新增标签'
          ]
        }
      ]
    },
    sidebarDepth : 2
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
}