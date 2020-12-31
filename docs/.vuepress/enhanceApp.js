import VueHighlightJS from 'vue-highlight.js'
import Element from 'element-ui'
import 'highlight.js/styles/atom-one-dark.css'
import 'element-ui/lib/theme-chalk/index.css'
import DemoBlock from './components/DemoBlock.vue'
// import './assets/styles/index.css' //组件css文件
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  // ...做一些其他的应用级别的优化
  Vue.use(VueHighlightJS)
  Vue.use(Element)
  Vue.component('DemoBlock', DemoBlock)
}