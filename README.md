# Vue-cli3 多页分模块打包
* ## 命令
### 下载依赖
```
yarn install
```

### 运行开发环境
```
yarn dev
```

### 运行生产环境
```
yarn build
```

### 运行生产环境集成KOA本地服务
```
yarn start
```

### 单独运行KOA本地服务
```
yarn serve
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


 * ## 多模块配置打包
 
 ```
"scripts": {
    "build": "vue-cli-service build module1 && node build/cssCopy.js && node build/jsCopy.js && node build/htmlReplace.js"
  },
 ```