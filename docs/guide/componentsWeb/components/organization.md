### 组织架构

<ClientOnly>
  <componentsWeb-organization-demo />
</ClientOnly>
<!-- ![部门-成员](./images/dept-member.png)
![部门](./images/dept.png)
![部门-岗位](./images/dept-post.png) -->

### 调用方式

```html
<!-- >= v1.4.2版本 -->
  <yy-organization
    title="组织架构>=v1.4.2"
    :tabs="tabs"
    :activeTab="activeTab"
    :isOpen="isOpen"
    :departmentList="departmentList"
    :memberList="memberList"
    :checkedIds="['1214479701862023168']"
    :isSingleCheck="false"
    @confirm="confirm"
    @close="close"
  ></yy-organization>
<!-- < v1.4.2版本 -->
  <yiyun-organization
    title="组织架构<v1.4.2"
    :tabs="tabs"
    :activeTab="activeTab"
    :isOpen="isOpen"
    :departmentList="departmentList"
    :memberList="memberList"
    :choosedList="choosedList_org"
    :isSingle="false"
    @confirm="confirm"
    @close="close"
  ></yiyun-organization>
```

### props和事件监听

```js
export default {
  data() {
    return {
      //1:部门成员，3:部门岗位
      activeTab: 1,
      //tab选项卡显示内容
      tabs:[1,3]
      //部门岗位列表
      departmentList: [{"positions":[{"id":"1211842032510623744","name":"部门经理"},{"id":"1211842067340124160","name":"助理"},{"id":"1211842118133145600","name":"高级工程师"},{"id":"1211842158138417152","name":"中级工程师"}],"id":"1211841814905937920","name":"前端","parentId":""},{"positions":[{"id":"1211842032510623744","name":"部门经理"},{"id":"1211842118133145600","name":"高级工程师"},{"id":"1211842158138417152","name":"中级工程师"}],"id":"1211841850901454848","name":"后端","parentId":""},{"positions":[{"id":"1211842032510623744","name":"部门经理"},{"id":"1211842118133145600","name":"高级工程师"},{"id":"1211842158138417152","name":"中级工程师"}],"id":"1211841869964566528","name":"测试","parentId":""},{"positions":[{"id":"1211842032510623744","name":"部门经理"},{"id":"1211842118133145600","name":"高级工程师"}],"id":"1211841888960569344","name":"ui","parentId":""},{"positions":[],"id":"1211841925199355904","name":"产品","parentId":""},{"positions":[{"id":"1211842032510623744","name":"部门经理"}],"id":"1214479916065128448","name":"销售","parentId":"1211841925199355904"},{"positions":[{"id":"1211842067340124160","name":"助理"},{"id":"1211842118133145600","name":"高级工程师"}],"id":"42Q4ZjeVjao","name":"后端1","parentId":"1211841850901454848"},{"positions":[{"id":"1211842067340124160","name":"助理"}],"id":"42Q7dAt4q5H","name":"后端2","parentId":"42Q4ZjeVjao"},{"positions":[{"id":"1211842032510623744","name":"部门经理"}],"id":"42Q7e6ZnKh1","name":"后端3","parentId":"42Q7dAt4q5H"},{"positions":[{"id":"1211842067340124160","name":"助理"}],"id":"42Q7vD9i5bM","name":"后端4","parentId":"42Q7e6ZnKh1"},{"positions":[{"id":"1211842032510623744","name":"部门经理"},{"id":"1211842158138417152","name":"中级工程师"}],"id":"42Q7xZmutrT","name":"后端5","parentId":"42Q7vD9i5bM"},{"positions":[],"id":"47cqNy5au19","name":"前端","parentId":"1211841814905937920"},{"positions":[{"id":"1211842118133145600","name":"高级工程师"}],"id":"47dBQoPWJF9","name":"后端5","parentId":"42Q4ZjeVjao"}],
      //成员列表
      memberList: [{"id":"1178593554835001344","name":"王东浩","profilePicture":"","active":true,"deptIdList":["1211841850901454848"]},{"id":"1214479701862023168","name":"李诗瑜","profilePicture":"https://dl-platform.effio.cn/1214708162554937344/user-head/133571917231583739623418.png","active":true,"deptIdList":["1211841814905937920","42Q7xZmutrT","42Q4ZjeVjao","47dBQoPWJF9","1211841869964566528"]},{"id":"3q5TCzakAGo","name":"卢奇峰","profilePicture":"https://dl-platform.effio.cn/user-head/132919499901547548161838.jpeg","active":true,"deptIdList":["42Q4ZjeVjao"]},{"id":"3rbrT78FZYT","name":"钟超","profilePicture":"https://dl-platform.effio.cn/3geFfAPn4mM/user-head/135808002901572240468200.jpg","active":true,"deptIdList":["1211841814905937920"]},{"id":"3rr5B7hdypT","name":"李琪","profilePicture":"","active":true,"deptIdList":["1211841869964566528"]},{"id":"3rwe3y6berK","name":"李姜侠","profilePicture":"https://dl-platform.effio.cn/3hjcSriafM9/user-head/9a6c021a-dc77-45ff-baf6-ab130f5a355b.jpg","active":true,"deptIdList":["1211841814905937920"]},{"id":"3sHRBhg6F2P","name":"叶丹","profilePicture":"","active":true,"deptIdList":["1211841888960569344"]},{"id":"3sLP7bNgKnX","name":"员工C1","profilePicture":"https://dl-platform.effio.cn/3sLNrqNJUBy/user-head/a9aa371b-bbc0-481b-b59a-4ea220ba6c50.jpg","active":true,"deptIdList":["1211841814905937920"]},{"id":"3sLQC8LCJvK","name":"小李的测试账号2","profilePicture":"","active":true,"deptIdList":["1211841850901454848"]},{"id":"3sLXki4LTNF","name":"小迪","profilePicture":"","active":true,"deptIdList":["1211841850901454848"]},{"id":"3sXXRhnzzdV","name":"葛宇杰","profilePicture":"https://dl-platform.effio.cn/6f5fd011-4dee-42c5-b6ce-3dba3b0209bd/user-head/178558276421571880647742.jpg","active":true,"deptIdList":["1211841869964566528"]},{"id":"3sXes3J6iAT","name":"顾静微","profilePicture":"https://dl-platform.effio.cn/e184a940-12d6-44b7-906f-556ef1180654/user-head/ab67f1c4-091e-403a-a989-b4e75dd1b1a3.jpg","active":true,"deptIdList":["1211841850901454848"]},{"id":"3siEAoJu49M","name":"牟皋","profilePicture":"https://dl-platform.effio.cn/95cd1c79-2681-40a6-b652-7a69a5cd17f6/user-head/180742054111569741307285.jpg","active":true,"deptIdList":["1211841850901454848"]},{"id":"3t1LJwYvVip","name":"陈素云","profilePicture":"","active":true,"deptIdList":["42Q7vD9i5bM"]},{"id":"3t1LJwYvVis","name":"毛海华","profilePicture":"","active":true,"deptIdList":["42Q7xZmutrT"]},{"id":"3t1LJwYvViy","name":"方赛娟","profilePicture":"","active":true,"deptIdList":["42Q7dAt4q5H"]},{"id":"3t1LJwZHzXs","name":"李玉英","profilePicture":"","active":true,"deptIdList":["42Q7e6ZnKh1"]},{"id":"3u2i7Y8xVCj","name":"zqp","profilePicture":"https://dl-platform.effio.cn/84217038-aa79-4bb8-a499-5dd0fc7ef06b/user-head/137384615141574997944474.gif","active":true,"deptIdList":["1211841850901454848"]},{"id":"3ucoQs6eKsD","name":"刘鑫","profilePicture":"https://dl-platform.effio.cn/3ucoGEE1GKZ/user-head/70f9c204-a6f3-4061-8530-9ae2971111ce.jpg","active":true,"deptIdList":["1211841869964566528"]},{"id":"3x1R9bE6GET","name":"打发","profilePicture":"","active":true,"deptIdList":["1211841888960569344"]},{"id":"3xe9sJKohNo","name":"八零","profilePicture":"https://dl-platform.effio.cn/aaa13799999980/user-head/ba498041-9f3d-4749-af1d-a60de370a030.jpg","active":true,"deptIdList":["1211841850901454848"]},{"id":"3y5kpMb59wd","name":"任世浩","profilePicture":"https://dl-platform.effio.cn/3y5kDGXcsMy/user-head/e1ba510d-9cd4-4381-9d9a-50665f1c7666.jpg","active":true,"deptIdList":["1211841814905937920"]},{"id":"4363XhWCb1q","name":"王一文","profilePicture":"","active":true,"deptIdList":["1214479916065128448"]}],
      //已选成员
      choosedList: [
        {
          id: "3sLP7bNgKnX",
          name: "小李的新测试账号1",
        },
        {
          id: "3sLQC8LCJvK",
          name: "小李的测试账号2",
        },
      ],
      //是否打开组织架构
      isOpen: false,
    };
  },
  methods: {
    //确定选择
    confirm(choosedList) {
      console.log("被选择成员", choosedList);
    },
    //关闭弹框
    close() {
      this.isOpen = false;
    },
  },
};
```
### 参数说明 >= v1.4.2
| 参数            | 说明          | 类型    | 默认值   |    可选值    |
| --------------- | ------------- | ------- | ------- | ------------ | 
| isOpen          | 开启或关闭                     | Boolean  | false   | false:关闭，true:开启 | 
| title           | 弹框标题                       | String   | "组织架构"      | —                     | 
| tabs            | 选项集合                       | Array    | []      | [1:按成员，2:按部门，3:按岗位]  | 
| activeTab       | 默认选项                       | Number   |  1      | 1:按成员，2:按部门，3:按岗位    | 
| isSingleCheck   | 是否单选模式                   | Boolean  | false   | false:多选，true:单选 | 
| departmentList  | 部门岗位数据集合               | Array    | []      | 接口数据传入即可      | 
| memberList      | 成员数据集合                   | Array    | []      | 接口数据传入即可      | 
| checkedIds      | 已选id集合                     | Array    | []      | ['id1','id2',...]     |

### 参数说明 < v1.4.2
| 参数            | 说明          | 类型    | 默认值   |    可选值    |
| --------------- | ------------- | ------- | ------- | ------------ | 
| isOpen          | 开启或关闭                     | Boolean  | false   | false:关闭，true:开启 | 
| title           | 弹框标题                       | String   | "组织架构"      | —                     | 
| tabs            | 选项集合                       | Array    | []      | [1:按成员，2:按部门，3:按岗位]  | 
| activeTab       | 默认选项                       | Number   |  1      | 1:按成员，2:按部门，3:按岗位    | 
| isSingle        | 是否单选模式                   | Boolean  | false   | false:多选，true:单选 | 
| departmentList  | 部门岗位数据集合               | Array    | []      | 接口数据传入即可      | 
| memberList      | 成员数据集合                   | Array    | []      | 接口数据传入即可      | 
| choosedList     | 已选数据集合                   | Array    | []      | [{id:'',name:''}]     |

### 事件
| 参数            | 说明                    |
| --------------- | ----------------------- |
| confirm         | 点击确定按钮触发         |
| close           | 点击关闭 / 取消按钮触发  |

### confirm返回参数说明
| 参数            | 说明                    | 类型      |   可选值     |
| --------------- | ----------------------- | --------- | ---------   | 
| checkedType     | 选择的是哪个选项         | Number   | 1:成员，2:部门，3:岗位 | 
| checkedList     | 选择对应选项后的数据     | Array    |  |      

```js
// checkedType = 1 时的 checkedList：
[
  {
    disabled: false, // 是否禁用标识
    icon: "https://dl-platform.effio.cn/133571917231583739623418.png", //成员头像
    id: "1214479701862023168", //成员id
    key: "1211841814905937920-1214479701862023168", //部门id-成员id
    name: "李诗瑜" //成员名称
  },
  // ...
]

// checkedType = 2 时的 checkedList：
[
  {
    children: [],  //子部门集合
    disabled: false,  // 是否禁用标识
    id: "1211841814905937920",   //部门id
    key: "1211841814905937920",  //部门id
    name: "前端",  //部门名称
    parentId: ""   //父部门id
  },
  // ...
]
// checkedType = 3 时的 checkedList：
[
  {
    deptId: "1211841814905937920",   //部门id
    deptName: "前端",  //部门名称
    id: "1211841814905937920-1211842032510623744", //部门id-岗位id
    name: "前端-部门经理",  //部门名称-岗位名称
    postId: "1211842032510623744",   //岗位id
    postName: "部门经理"  //岗位名称
  },
  // ...
]
```