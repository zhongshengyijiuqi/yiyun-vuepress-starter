#### 省市区选择器
<ClientOnly>
  <componentsWeb-provincialSelector-demo />
</ClientOnly>

#### 相关资源文件
<a href="../../assets/level.json" target="downloadFile">level.json</a>

#### 使用
```html
  <el-cascader
    v-model="pcr"
    :options="pcrList"
    :props="{value:'name',label:'name', checkStrictly: true}"
    clearable>
  </el-cascader>
```
#### 调用方式
```js
import level from '@/assets/level.json'
const pcrList = level
export default {
  data() {
    return {
      pcrList： pcrList,
      pcr: [],
    }
  },
}
```