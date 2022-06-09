#### 列表选择

<ClientOnly>
  <componentsMobile-optionsPageCheckbox-demo />
</ClientOnly>


#### 代码演示


``` html
      <div class="other-not" @click="multiple">
        <p>列表选择</p>
        <p>
          <span></span>
          <img src="../../assets/images/common/right.png" alt="">
        </p>
      </div>
      <options-page-checkbox 
        :dialogVisible="dialogVisible" 
        :isOption="true"
        :list="multipleData"
        :title="'选项isOption：true多选反之单选'"
        :searchTime="1000"
        :selectedList="selectedList"
        @confirm="confirm" 
        @cancel="cancel"
      >
        <template slot-scope="data">
         //自定义插槽
        </template>
      </options-page-checkbox >
```
<!-- #### 多项选择 -->

``` js
export default {
  data(){
    return{
        //多项选择
      dialogVisible:false,
      multipleData:[
        {
          id:1,
          name:'测试001',
        },{
          id:2,
          name:'测试002',
        },{
          id:3,
          name:'测试003',
        }
      ],
      selectedList:[],
    }
  },
  mounted(){

  },
  methods:{
    confirm(item){
      this.selectedList = item.map(arr =>{return arr.id })
      this.dialogVisible = false
    },
    cancel(){
      this.dialogVisible = false
    },
  }
```
#### 属性

|参数|说明|类型|默认值|是否必填|
| ----- | ----- | ----- | ----- | ----- |
|dialogVisible|控制组件显示隐藏|Boolean|false|是|
|isOption|是否多选|Boolean|false|否|
|list|列表数据|Array|[]|是|
|title|标题|Staging|选择列表|否|
|searchTime|搜索触发时间|Number|1000|否|
|selectedList|选中数据|Array|[]|是|
|searchWords|搜索字数上限|Number|100否|


##### confirm 事件

|事件名|说明|回调参数|
| ----- | ----- | ----- |
|confirm|选中返回函数|value(选中返回的数据)|


##### cancel 事件

|事件名|说明|回调参数|
| ----- | ----- | ----- |
|cancel|返回键返回函数|-|


