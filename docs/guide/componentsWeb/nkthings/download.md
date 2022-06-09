### 调用方式
```js
// (支持自定义文件名)
//方式一
this.$downloadFile({ fileUrl, fileName })
//方式二
async goDownload(){
    //show loading
    await this.$downloadFile({ fileUrl, fileName })
    //close loading
}
```
### 使用示例
```js
this.$downloadFile({
    fileUrl:
    'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617257887221.jpg',
    fileName: '自定义文件名.jpg',
})
```

### 参数说明
| 参数名 | 参数说明 | 参数类型 |
| :---:  | :---: | :---: |
| fileUrl  | 文件地址  | String |
| fileName | 下载的文件名称 | String |