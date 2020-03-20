let fs = require('fs')
const glob = require('glob')
let htmlList = glob.sync(`./src/modules/**/*.html`)
let imgList = glob.sync('./dist/img/*')
let moduleNames = htmlList.map(item => item.split('/')[3])

// 复制目录 
moduleNames.forEach((name, index) => {
  imgList.forEach((filepath, i) => {
    let changeDirectory = `./dist/${name}/img`// 多页面JS文件地存放址
    let copyName = filepath.split('/')[3]
    callbackFile(filepath, `${changeDirectory}/${copyName}`)
  })
})