##### 常用正则

##### 判断是否为邮箱地址

``` js
    function isEmail(str) {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);
    }
```
##### 判断是否为身份证号 (包括一代二代)

``` js
    function isIdCard(str) {
        return /^\d{6}((((((19|20)\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|(((19|20)\d{2})(0[13578]|1[02])31)|((19|20)\d{2})02(0[1-9]|1\d|2[0-8])|((((19|20)([13579][26]|[2468][048]|0[48]))|(2000))0229))\d{3})|((((\d{2})(0[13-9]|1[012])(0[1-9]|[12]\d|30))|((\d{2})(0[13578]|1[02])31)|((\d{2})02(0[1-9]|1\d|2[0-8]))|(([13579][26]|[2468][048]|0[048])0229))\d{2}))(\d|X|x)$/.test(str);
    }
```
##### 判断是否为手机号（严谨）

``` js
    function isPhoneRigorous(str) {
        return /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/.test(str);
    }
```
##### 判断是否为手机号（宽松）

``` js
    function isPhoneLoose(str) {
        return /^(?:(?:\+|00)86)?1\d{10}$/.test(str);
    }
```
##### 判断是否为座机

``` js
    function isLandline(str) {
        return /^(?:(?:\d{3}-)?\d{8}|^(?:\d{4}-)?\d{7,8})(?:-\d+)?$/.test(str);
    }
```
##### 判断是否为URL地址

``` js
    function isUrl(str) {
        return /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/.test(str);
    }
```
##### 判断是否为图片格式

``` js
    function isImageFormat(str) {
        return /^https?:\/\/(.+\/)+.+(\.(gif|png|jpg|jpeg|webp|svg|psd|bmp|tif))$/i.test(str);
    }
```
##### 判断是否为base64

``` js
    function isBase64(str) {
        return /^\s*data:(?:[a-z]+\/[a-z0-9-+.]+(?:;[a-z-]+=[a-z0-9-]+)?)?(?:;base64)?,([a-z0-9!$&',()*+;=\-._~:@/?%\s]*?)\s*$/i.test(str);
    }
```
##### 判断是否为数字和字母

``` js
    function isNumber(str) {
        return /^\d{1,}$/.test(str);
    }
```
##### 金额（不限制位数）

``` js
    function isAmount(str) {
        return /(?:^[1-9]([0-9]+)?(?:\.[0-9]{1,2})?$)|(?:^(?:0)$)|(?:^[0-9]\.[0-9](?:[0-9])?$)/.test(str);
    }
```
##### 判断是否为字母

``` js
    function isEnglish(str) {
        return /^[a-zA-Z]+$/.test(str);
    }
```
##### 判断是否为中文

``` js
    function isChinese(str) {
        return /^(?:[\u4e00-\u9fa5·]{2,16})$/.test(str);
    }
```