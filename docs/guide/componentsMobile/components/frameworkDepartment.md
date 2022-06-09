#### 部门人员多选

<ClientOnly>
  <componentsMobile-frameworkDepartment-demo />
</ClientOnly>

#### 代码演示


``` html
    <div class="structure" @click="taskLeaderBoxduo">
        <p>组织架构部门-人员多选</p>
        <p>
          <span></span><img src="../../assets/images/common/right.png" alt="">
        </p>
    </div>

    <framework-department
      title="组织架构部门-人员多选"
      companyName="文谷科技"
      :dialogVisible="dialogVisible"
      :selectedList="selectedList"
      :list="deptConcat" 
      :isSelectAll="true"
      :notOptionalList="[]"
      @confirm="confirm" 
      @cancel="cancel"
      ></framework-department>
```
``` js
    export default {
        data(){
            return{
                deptConcat:[],
                dialogVisible:false,
                selectedList:[],
            }
        },
        mounted(){
            this.getDeptListFun()
        },
        methods:{
            confirm(val){
                this.selectedList = val.map(arr =>{ return arr.id })
                this.dialogVisible = false
            },
            cancel(){
                this.dialogVisible = false
            },
            async getDeptListFun(){//获取组织部门
                try {
                        let res = await this.getDeptList()
                        let deptList = []
                        res.data.forEach(arr => {
                            deptList.push(arr.id)
                        });
                        deptList.push('-1')
                        let list = await this.postMemberInfoByDept({page:1,num:1000,isAll:true,memberType:0,deptIdList:deptList})
                        this.deptConcat = [...res.data,...list.data]
                } catch (error) {
                    console.log('获取组织数据',error)
                }
            },
        }
    }
```
<!-- #### 组织架构部门-人员（多选）FactoryModel.vue -->


#### 属性

|参数|说明|类型|默认值|是否必填|
| ----- | ----- | ----- | ----- | ----- |
|dialogVisible|控制组件显示隐藏|Boolean|false|是|
|title|控制组件name|Staging|'组织架构'|否|
|companyName|控制组件第一级name|Staging|'全公司'|否|
|list|部门和人员数据列表|Array|[]|是|
|selectedList|选中数据Id集合|Array|[]|是|
|searchWords|搜索字数上限|Number|100|否|
|isSelectAll|是否显示全选|Boolean|false|否|
|notOptionalList|禁止数据|Array|[]|否|


##### confirm 事件

|事件名|说明|回调参数|
| ----- | ----- | ----- |
|confirm|选中返回函数|value(选中返回的数据)|
##### cancel 事件

|事件名|说明|回调参数|
| ----- | ----- | ----- |
|cancel|返回键返回函数|-|