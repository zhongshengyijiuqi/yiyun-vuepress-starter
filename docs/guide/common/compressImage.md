<!-- ### 图形示例
![图片压缩](../images/compress-image.png) -->
### 调用方式
```js
    const res = await this.$compressImage(file)
    console.log(res) // {file:Blob,base64:String}
```
### 参数说明
| 参数            | 说明          | 类型    |
| --------------- | ------------- | ------- |
| file            | Blob对象      | Blob    |