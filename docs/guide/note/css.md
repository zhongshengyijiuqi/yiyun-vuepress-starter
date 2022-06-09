# 介绍

一些能用，又不常用的。


##### 换行

``` css
    .test{
        white-space:nowrap;/* 强制不换行 */
        word-wrap:break-word;/* 自动换行 */
        word-break:break-all;/* 强制英文单词断行 */
        /* 不换行显示省略号 */
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        /* 换行可设置几行 */
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;/*值可设置*/
        overflow: hidden;
        
    }
    
```
##### transition: all 0.5s; 0.5s内执行完成  一般适用于动画

``` css
    .test{
        transition: all 0.5s;
    }
    
```
##### transform: rotate(90deg); 旋转

``` css
    .test{
        transform: rotate(90deg);
    }
```
##### transform: scale(0.88); 一般常用与安卓，window  12px 以下字体

``` css
    .test{
        font-size:12px;
        transform: scale(0.88);
    }
```
##### 背景图片

``` css
    .test{
        background:url('~@/assets/images/voiceWhite2x.png');
        background-repeat:no-repeat;
        background-position:center;
        background-size: auto 100%;
    }
```

##### 类似自定义 虚线间隔大小

``` css
    .test{
        border-bottom: 1px dashed transparent;
        background: linear-gradient(white,white) padding-box, repeating-linear-gradient(-45deg,#DCDFE6 0px, #DCDFE6 0.3rem,white 0px,white 0.5rem);
    }
  
```
##### ios 原生滚动条卡顿问题（下列解决方法还在实测中）

``` css
    .test{
        /* 第一种方法加 -webkit-overflow-scroll:touch;*/
        -webkit-overflow-scroll:touch;
        -webkit-overflow-scrolling: touch;
        /* 第二种加 position: static; */
        position: static; 
        /* 第三种 直接把滚动条撑起来 */
        min-height: calc(100% + 1px);
    }
```
#####  元素平移 transform: translateY(0) translateX(0) translateZ(0); 配合动画实现移入移出效果

``` css
.test{
    opacity: 1;
}
.test:nth-child(1){
    animation:action 1.4s;
}
.test:nth-child(2){
    animation:action 1.7s;
}
@keyframes action{
    0%{
        transform: translateX(-44rem);
        opacity: 0;
    }
    100%{ 
        transform: translateX(0);
        opacity: 1;
        margin-right:auto;
    }
}
```