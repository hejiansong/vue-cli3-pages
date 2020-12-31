# Vue-cli3 多页分模块打包
## 命令
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

### 单独运行KOA本地服务
```
yarn serve
```

### 运行生产环境集成KOA本地服务自动运行
```
yarn start
```

## 多模块配置打包，(MODULE_ENV=空值为全部模块打包，单个或多个模块名称之间，逗号分隔)
 ```
"scripts": {
    "build": "cross-env MODULE_ENV=module1 vue-cli-service build && node build/cssCopy.js && node build/jsCopy.js && node build/htmlReplace.js"
  },
 ```
 # 常用命令

  + git
    - 更新远程分支
 ```
git remote update origin --prune
```

  + npm/yarn
    - 查看依赖包全部版本
    - 更新指定版本
 ```
npm view yarn versions
 ```

 ```
 yarn upgrade package@version
 ```

  + 刷新DNS
 ```
ipconfig /flushdns
 ```