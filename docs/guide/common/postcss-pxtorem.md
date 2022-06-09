### postcss-pxtorem 使用

##### package.json 添加 （版本可以看着调）
``` json
  "devDependencies": {
    "postcss": "^7.0.36",
    "postcss-loader": "^3.0.0",
    "postcss-pxtorem": "^5.1.1",
  }
```
##### 有postcss.config.js就在里面加，没有就创建postcss.config.js文件

``` js
    module.exports = {
        plugins: {
            "postcss-pxtorem": {
                rootValue: 20,
                unitPrecision: 5, 
                propList: ['*','font', 'font-size', 'line-height', 'letter-spacing'], 
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
                exclude: (file) => {
                    return file.indexOf('summarize') !== -1;
                }
            },
        },
    };
```
 rootValue(Number | Function) 表示根元素字体大小或根据input参数返回根元素字体大小
 unitPrecision（数字）允许 REM 单位增长到的十进制数字。
 propList（数组）可以从 px 更改为 rem 的属性。
   * 值需要完全匹配。
   * 使用通配符*启用所有属性。例子：['*']
   * '*'在单词的开头或结尾使用。（['*position*']将匹配background-position-y）
   * 用于!不匹配属性。例子：['*', '!letter-spacing']
   * 将“not”前缀与其他前缀组合。例子：['*', '!font*']
 selectorBlackList（数组）要忽略并保留为 px 的选择器。
   * 如果 value 是字符串，它会检查 selector 是否包含字符串。
     * ['body']将匹配.body-class
   * 如果 value 是 regexp，它会检查选择器是否与 regexp 匹配。
     * [/^body$/]将匹配body但不匹配.body
 replace（布尔值）替换包含 rems 的规则，而不是添加回退。
 mediaQuery（布尔值）允许在媒体查询中转换 px。
 minPixelValue(Number) 设置要替换的最小像素值。
 exclude（字符串、正则表达式、函数）要忽略并保留为 px 的文件路径。
   * 如果 value 是字符串，它会检查文件路径是否包含字符串。
     * 'exclude'将匹配\project\postcss-pxtorem\exclude\path
   * 如果 value 是 regexp，它会检查文件路径是否与 regexp 匹配。
     * /exclude/i将匹配\project\postcss-pxtorem\exclude\path
   * 如果 value 是 function，您可以使用 exclude 函数返回 true 并且文件将被忽略。
     * 回调将文件路径作为参数传递，它应该返回一个布尔结果。
     * function (file) { return file.indexOf('exclude') !== -1; }
