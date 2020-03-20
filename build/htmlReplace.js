var fs = require('fs')
const glob = require('glob')
/**
 * html文件替换
 * @param src
 * @param dst
 */
var callbackFile = function (src, dst, name, filepath) {
  fs.readFile(src, 'utf8', function (error, data) {
    fs.unlink(filepath, function () { 
    })
    fs.unlink(filepath + '.map', function () { // css删除成功
    })
    if (error) {
      // eslint-disable-next-line no-console
      // console.log(error)
      return false
    }
    let regCss = new RegExp('/dist/css/' + name + '', 'g')
    let regJs = new RegExp('/dist/js/' + name + '', 'g')
    let htmlContent = data.toString().replace(regCss, `./css/${name}`).replace(regJs, `./js/${name}`)
    fs.writeFile(dst, htmlContent, 'utf8', function (error) {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error)
        return false
      }
      // console.log(src, 'html重新写入成功')
      if (src.indexOf('/index.html') === -1) {
        fs.unlink(src, function () {
          //  console.log(src, 'html删除成功')
        })
      }
    })
  })
}
// 复制目录
glob.sync('./dist/js/*.js').forEach((filepath, name) => {
  let fileNameList = filepath.split('.')
  let fileName = fileNameList[1].split('/')[3]// 多页面页面目录
  let moduleName = glob.sync(`./src/pages/**/*.html`).map(item => item.split('/')[3]).filter(item => fileName.includes(item) && item)[0]
  let thisDirectory = `./dist/${fileName}/${fileName}.html`// 多页面JS文件地存放址
  let changeDirectory = `./dist/${moduleName}/index.html`// 多页面JS文件地存放址
  if (!fileName.includes('chunk-vendors')) {
    callbackFile(thisDirectory, changeDirectory, fileName, filepath)
  } else {
    let moduleList = glob.sync(`./dist/**/*.html`).map(item => item.split('/')[2])
    let fileName = filepath.split('/')[3]
    moduleList.forEach(name => {
      fs.readFile(`./dist/${name}/index.html`, 'utf8', function (error, data) {
        let regJs = new RegExp('js/' + fileName + '', 'g')
        let regDll = new RegExp('dll/dll', 'g')
        let htmlContent = data.toString().replace(regJs, `../js/${fileName}`).replace(regDll, `../dll/dll`)
        fs.writeFile(`./dist/${name}/index.html`, htmlContent, 'utf8', function (error) {
        })
      })
    })
  }
})
