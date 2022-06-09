# 介绍

##### PC组件

# 安装

#### NPM

``` sh
    //老版（1.4.4，无更新可以不用改）
    npm install library_component

    //暂时版本（1.4.4，如果要修改老版的东西得在暂时版上面添加。等平台搭NPM）
    npm install library_component_new
```
如果在一个模块化工程中使用它，必须要通过 `Vue.use()` 明确地安装模块：

``` js
 import Vue from 'vue'
 //老版
 import yiyunComponents from 'library_component'
 //暂时版本
 import yiyunComponents from 'library_component_new'

 Vue.use(yiyunComponents)
```