

#### 空白页

<ClientOnly>
  <componentsMobile-blankPage-demo />
</ClientOnly>

#### 代码演示


``` html
      <blank-page
      :isSearch="false"
      searchCode=""
      >
        <template>
          <div>111</div>
        </template>
      </blank-page>
```
<!-- ## 空白页BlankPage.vue -->


#### 属性

|参数|说明|类型|默认值|是否必填|
| ------- | ---------------- | ----- | ----- | ------------------------------------------------------- |
|isSearch|是否显示搜索空白页|Boolean|false|否|
|searchCode|搜索字段|String|''|否|
|blankImg|页面空白页图片|Staring|默认图片|否|
|blankSearchImg|搜索页图片|Staring|默认图片|否|
|blankName|页面空白页提示|String|暂无数据|否|
