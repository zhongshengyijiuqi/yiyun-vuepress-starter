### 图片预览

<!-- ![图片预览](./images/preview-image.png) -->
<ClientOnly>
  <componentsWeb-previewImage-demo />
</ClientOnly>

#### 调用方式
```js
this.$previewImage({images,currentIndex})
```
#### 使用示例
```js
this.$previewImage({
    images: [
        'https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto',
        'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.adquan.com%2Fuploads_img%2Fynwv01547105064.jpg&refer=http%3A%2F%2Ffile.adquan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635211538&t=9e019be02c5cfca81300e04ebcc8cbfc',
    ],
    currentIndex: 1,
})
```

#### 参数说明
| 参数名 | 参数说明 | 参数类型 |
| :---:  | :---: | :---: |
| images | 图片集合 | Array |
| currentIndex | 当前默认显示的图片索引 | Number |

### office文件预览

<!-- ![office文件预览](./images/preview-office.png) -->
<ClientOnly>
  <componentsWeb-previewOffice-demo />
</ClientOnly>

#### 调用方式
```js
this.$previewOffice(fileUrl)
```

#### 使用示例
```js
this.$previewOffice(
    'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258463291.ppt'
)
```

#### 参数说明
| 参数名 | 参数说明 | 参数类型 |
| :---: | :---: | :---: |
| fileUrl | 文件地址 | String |


