#### 工厂模型单选

<ClientOnly>
  <componentsMobile-factoryModelRadio-demo />
</ClientOnly>

#### 代码演示


``` html
    <div class="structure" @click="factoryModelRadio">
        <p>工厂模型单选</p>
        <p>
          <span></span><img src="../../assets/images/common/right.png" alt="">
        </p>
      </div>

      <factory-model-radio
      :dialogVisible="dialogVisible" 
      :title="'工厂模型单选'"
      :companyName="'文谷亦云'"
      :list="factoryModel"
      :selectedList="selectedList"
      :notOptionalList="['44ZPJ4yQNpo','H~0000002V']"
      :notOptionalType="[1,2]"
      :notShowingList="['H~0000002V']"
      :notShowingType="[1]"
      :isSelectAll="true"
      @confirm="sureConfirm"
      @cancel="sureCancel"
      ></factory-model-radio>
```
``` js
    export default {
        data(){
            return{
                factoryModel:[
                    {
                        id: "H~0000002V"
                        name: "区域1-1下的工作中心2（备份）"
                        parentId: "44ZPJ4yQNpo"
                        type: 4
                    }
                ],
                dialogVisible:false,
                selectedList:['44ZPJ4yQNpo'],
            }
        },
        mounted(){
            this.getFactoryModelFun()
        },
        methods:{
            sureConfirm(val,path){
                this.dialogVisible = false
                this.selectedList =  val.map(arr =>{ return arr.id })
            },
            sureCancel(item){
                this.dialogVisible = false
            },
            async getFactoryModelFun(){
                try {
                    let res = await this.getFactoryModel()
                    this.factoryModel = res.data
                } catch (error) {
                    console.log('获取工厂模型数据',error)
                }
            },
        }
    }
```
<!-- #### 工厂模型（多选） -->


#### 属性

|参数|说明|类型|默认值|是否必填|
| ----- | ----- | ----- | ----- | ----- |
|dialogVisible|控制组件显示隐藏|Boolean|false|是|
|title|控制组件name|Staging|'工厂模型'|否|
|companyName|控制组件第一级name|Staging|'全公司'|否|
|list|数据列表|Array|[]|是|
|disImageList|前置图片|Array|[{img:'',img_se:''}]|否|
|selectedList|选中数据Id集合|Array|[]|是|
|AllLevels|全部层级数据|Array|[1,2,3,4,5]|否|
|notOptionalType|不可选层级|Array|[1]|否|
|notOptionalList|不可选层级数据ID列表|Array|[]|否|
|notShowingList|不展示层级数据ID列表|Array|[]|否|
|notShowingType|不展示层级|Array|[1]|否|
|searchWords|搜索字数上限|Number|100|否|

##### confirm 事件

|事件名|说明|回调参数|
| ----- | ----- | ----- |
|confirm|选中返回函数|value(选中返回的数据),path(路径)|
##### cancel 事件

|事件名|说明|回调参数|
| ----- | ----- | ----- |
|cancel|返回键返回函数|-|

