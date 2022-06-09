### 消息通知栏

<ClientOnly>
  <componentsWeb-notification-demo />
</ClientOnly>

### 调用方式
```html
    <yy-notification
    :width="500"
    :height="36"
    backgroundColor="rgba(3, 110, 213, 0.3)"
    :informations="['notification-1', 'notification-2', 'notification-3']"
    ></yy-notification>
```

### 参数说明
| 参数            | 说明          | 类型    | 默认值   |
| --------------- | ------------- | ------- | ------- |
| width           | 宽度          | Number  | 376     |
| height          | 高度          | Number  | 30      |
| backgroundColor | 背景色        | String  | #02173D |
| informations    | 消息集合      | Array   | []      |
    