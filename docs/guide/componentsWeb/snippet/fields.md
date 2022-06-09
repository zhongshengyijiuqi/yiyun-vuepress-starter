#### 字段显示（PC端）（固定字段版）

##### 因为文档问题，vuedraggable插件有冲突，这里就不多做处理，只显示差不多的功能。

<ClientOnly>
  <componentsWeb-fields-demo />
</ClientOnly>


``` html
    <el-popover placement="bottom" :width="180" trigger="click" popper-class="popper-not">
      <template #reference>
        <div class="not6">
          <img src="@/assets/images/securityEnterprise/setUp.png" alt="" />
          <span>字段显示</span>
        </div>
      </template>
      <div class="field-display">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <vuedraggable :list="cities" handle=".handle" group="people" @end="onEnd">
            <template #item="{ element }"></template>
            <el-checkbox v-for="(element, index) in cities" :key="index" :label="element.id" :disabled="element.disable">
              <span>{{ element.name }}</span>
              <i class="handle"></i>
            </el-checkbox>
          </vuedraggable>
        </el-checkbox-group>
      </div>
    </el-popover>

    <el-table :data="hiddenPointList" @header-dragend="headerDragend" border style="width: 100%" key="securityRisks" @cell-click="toDetails">
      <template slot="empty">
        <yy-empty
          :description="hiddenPointCode ? `未搜索到“${hiddenPointCode}”` : '暂无数据'"
          :emptyUrl="hiddenPointCode ? 'https://dl-yiyunappclient.effio.cn/resource/common/empty_search.png' : 'https://dl-yiyunappclient.effio.cn/resource/common/empty_data.png'"
        >
        </yy-empty>
      </template>
      <el-table-column
        v-for="(item, index) in citiesList"
        :key="item.prop + index"
        :prop="item.prop"
        :label="item.name"
        :width="item.prop != 'orgName' && item.prop != 'content' ? item.bor : ''"
        :align="item.align"
        :min-width="item.prop == 'orgName' || item.prop == 'content' ? '200' : ''"
      >
        <template #default="scope" v-if="item.scopeShow">
          <div v-if="item.prop == 'content'">{{ scope.row.content }}</div>
          <div class="examine-img" v-if="item.prop == 'files'">
            <img :src="item.SaveName" alt="" v-for="(item, index) in scope.row.files" :key="'examine-img' + index" @click.stop="checkFun(scope.row.files, index)" />
          </div>
          <div class="ellipsis" v-if="item.prop == 'checkTime'">
            <p>{{ scope.row.checkTime > 0 ? $moment(scope.row.checkTime * 1000).format('YYYY/MM/DD HH:mm') : '-' }}</p>
          </div>
          <div class="ellipsis" v-if="item.prop == 'createTime'">
            <p>{{ scope.row.createTime > 0 ? $moment(scope.row.createTime * 1000).format('YYYY/MM/DD HH:mm') : '-' }}</p>
          </div>
          <div class="ellipsis" v-if="item.prop == 'deadlineMode'">
            <p :style="scope.row.isOverdue ? 'color:#E02020' : ''">
              {{ scope.row.deadlineMode == 0 ? '立即整改' : scope.row.deadlineMode + '天' }} <span style="color:#E02020'" v-if="scope.row.isOverdue">(逾期)</span>
            </p>
          </div>
          <div class="ellipsis" v-if="item.prop == 'lastOpTime'">
            <p>{{ scope.row.lastOpTime > 0 ? $moment(scope.row.lastOpTime * 1000).format('YYYY/MM/DD HH:mm') : '-' }}</p>
          </div>
          <div class="ellipsis" v-if="item.prop == 'finishTime'">
            <p>{{ scope.row.finishTime > 0 ? $moment(scope.row.finishTime * 1000).format('YYYY/MM/DD HH:mm') : '-' }}</p>
          </div>
          <div class="hiddenPointStatus" v-if="item.prop == 'status'">
            <p :style="'background-color: ' + hiddenPointBack[scope.row.status] + ';color:' + hiddenPointCol[scope.row.status]">{{ hiddenPointName[scope.row.status] }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click.stop="toDetails(scope.row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
```
``` js
import { mapGetters, mapMutations, mapActions } from 'vuex'
import vuedraggable from 'vuedraggable'
export default {
  name: '',
  data() {
    return {
     hiddenPointList:[],
      //字段显示
      batchManageList: {
        cityOptions: [],
        disableList: [],
        cities: [],
        citiesList: [],
        checkAll: true,
        isIndeterminate: false,
        checkedCities: []
      },
      batchManageStorage: {
        cityOptions: [],
        disableList: [],
        cities: [],
        citiesList: [],
        checkAll: true,
        isIndeterminate: false,
        checkedCities: []
      },
      cityOptions: [],
      disableList: [],
      cities: [],
      citiesList: [],
      checkAll: true,
      isIndeterminate: false,
      checkedCities: []

    }
  },
  components: {
    vuedraggable,
  },
  computed: {
    ...mapGetters([])
  },
  created() {
    this.batchManageFun()
  },
  methods: {
    batchManageFun() {
      this.batchManageList = {
        cityOptions: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],//总条数ID数组
        disableList: ['3'],//禁止选择ID数组
        citiesNameList: 'v1.1.1',//版本号，本地存储判断有内容修改，覆盖存储
        cities: [//展示数组 ，scopeShow 是否template中展示 ，disable 是否禁止选中
          { id: '1', name: '隐患内容', son: 1, bor: 300, prop: 'content', align: 'left', scopeShow: true, disable: false },
          { id: '2', name: '图片', son: 2, bor: 160, prop: 'files', align: 'center', scopeShow: true, disable: false },
          { id: '3', name: '企业名称', son: 3, bor: 240, prop: 'orgName', align: 'left', scopeShow: false, disable: true },
          { id: '4', name: '风险点', son: 4, bor: 170, prop: 'checkUnitName', align: 'left', scopeShow: false, disable: false },
          { id: '5', name: '排查人', son: 5, bor: 120, prop: 'outCheckerName', align: 'center', scopeShow: false, disable: false },
          { id: '6', name: '排查时间', son: 6, bor: 180, prop: 'checkTime', align: 'center', scopeShow: true, disable: false },
          { id: '7', name: '下发时间', son: 7, bor: 180, prop: 'createTime', align: 'center', scopeShow: true, disable: false },
          { id: '8', name: '整改时限', son: 8, bor: 150, prop: 'deadlineMode', align: 'center', scopeShow: true, disable: false },
          { id: '9', name: '最近整改时间', son: 9, bor: 180, prop: 'lastOpTime', align: 'center', scopeShow: true, disable: false },
          { id: '10', name: '完成/作废时间', son: 10, bor: 180, prop: 'finishTime', align: 'center', scopeShow: true, disable: false },
          { id: '11', name: '状态', son: 11, bor: 120, prop: 'status', align: 'center', scopeShow: true, disable: false }
        ],
        citiesList: [//选中数组
          { id: '1', name: '隐患内容', son: 1, bor: 300, prop: 'content', align: 'left', scopeShow: true, disable: false },
          { id: '2', name: '图片', son: 2, bor: 160, prop: 'files', align: 'center', scopeShow: true, disable: false },
          { id: '3', name: '企业名称', son: 3, bor: 240, prop: 'orgName', align: 'left', scopeShow: false, disable: true },
          { id: '4', name: '风险点', son: 4, bor: 170, prop: 'checkUnitName', align: 'left', scopeShow: false, disable: false },
          { id: '5', name: '排查人', son: 5, bor: 120, prop: 'outCheckerName', align: 'center', scopeShow: false, disable: false },
          { id: '6', name: '排查时间', son: 6, bor: 180, prop: 'checkTime', align: 'center', scopeShow: true, disable: false },
          { id: '7', name: '下发时间', son: 7, bor: 180, prop: 'createTime', align: 'center', scopeShow: true, disable: false },
          { id: '8', name: '整改时限', son: 8, bor: 150, prop: 'deadlineMode', align: 'center', scopeShow: true, disable: false },
          { id: '11', name: '状态', son: 11, bor: 120, prop: 'status', align: 'center', scopeShow: true, disable: false }
        ],
        checkAll: true, //是否全选，详情看element Checkbox 多选框
        isIndeterminate: false,//是否全选
        checkedCities: ['1', '2', '3', '4', '5', '6', '7', '8', '11']//选中ID数组
      }
      
      this.batchManageStorage = JSON.parse(JSON.stringify(this.batchManageList))
      let obj = localStorage.getItem('hiddenDangerRectification') //hiddenDangerRectification 存储函数（自定义）
      if (obj) {
        let active = JSON.parse(obj)
        if (active.citiesNameList != this.batchManageList.citiesNameList) {
          this.cityOptions = this.batchManageStorage.cityOptions
          this.disableList = this.batchManageStorage.disableList
          this.cities = this.batchManageStorage.cities
          this.citiesList = this.batchManageStorage.citiesList
          this.checkAll = this.batchManageStorage.checkAll
          this.isIndeterminate = this.batchManageStorage.isIndeterminate
          this.checkedCities = this.batchManageStorage.checkedCities
          localStorage.setItem('hiddenDangerRectification', JSON.stringify(this.batchManageStorage))
          return
        }
        this.cityOptions = active.cityOptions
        this.disableList = active.disableList
        this.cities = active.cities
        this.citiesList = active.citiesList
        this.checkAll = active.checkAll
        this.isIndeterminate = active.isIndeterminate
        this.checkedCities = active.checkedCities
        this.batchManageList = JSON.parse(JSON.stringify(active))
      } else {
        this.cityOptions = this.batchManageStorage.cityOptions
        this.disableList = this.batchManageStorage.disableList
        this.cities = this.batchManageStorage.cities
        this.citiesList = this.batchManageStorage.citiesList
        this.checkAll = this.batchManageStorage.checkAll
        this.isIndeterminate = this.batchManageStorage.isIndeterminate
        this.checkedCities = this.batchManageStorage.checkedCities
        localStorage.setItem('hiddenDangerRectification', JSON.stringify(this.batchManageStorage))
      }
    },
    //字段显示
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.cityOptions : this.disableList
      this.isIndeterminate = false
      this.checkAll = val
      let list = []
      this.cities.forEach((arr, index) => {
        this.checkedCities.forEach((element) => {
          if (arr.id == element) {
            list.push(arr)
          }
        })
      })
      this.citiesList = list

      this.batchManageList.isIndeterminate = this.isIndeterminate
      this.batchManageList.checkedCities = this.checkedCities
      this.batchManageList.citiesList = this.citiesList
      this.batchManageList.checkAll = this.checkAll
      localStorage.setItem('hiddenDangerRectification', JSON.stringify(this.batchManageList))
    },
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length
      this.checkedCities = value
      this.checkAll = checkedCount === this.cities.length
      let list = []
      this.cities.forEach((arr, index) => {
        value.forEach((element) => {
          if (arr.id == element) {
            list.push(arr)
          }
        })
      })
      this.citiesList = list
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
      this.batchManageList.checkAll = this.checkAll
      this.batchManageList.citiesList = this.citiesList
      this.batchManageList.isIndeterminate = this.isIndeterminate
      this.batchManageList.checkedCities = this.checkedCities
      localStorage.setItem('hiddenDangerRectification', JSON.stringify(this.batchManageList))
    },
    onEnd(item) {
      // console.log('item',item)
      this.cities.forEach((arr, index) => {
        arr.son = index
      })
      let list = []
      this.cities.forEach((arr) => {
        this.citiesList.forEach((element) => {
          if (arr.id == element.id) {
            list.push(arr)
          }
        })
      })
      this.citiesList = list
      this.batchManageList.cities = this.cities
      this.batchManageList.citiesList = this.citiesList
      localStorage.setItem('hiddenDangerRectification', JSON.stringify(this.batchManageList))
    },
    headerDragend(newWidth, oldWidth, column) {
      this.cities.forEach((arr, index) => {
        if (arr.prop == column.property) {
          arr.bor = newWidth
          this.citiesList[index].bor = newWidth
        }
      })
      this.batchManageList.cities = this.cities
      this.batchManageList.citiesList = this.citiesList
      localStorage.setItem('hiddenDangerRectification', JSON.stringify(this.batchManageList))
    },
    ...mapMutations([]),
    ...mapActions([]),
  }
}
```

```css
.field-display {
  width: 100%;
  max-height: 300px;
  overflow-y: scroll;
  /deep/.el-checkbox {
    height: 34px;
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    padding: 0 10px;
    &:hover {
      background-color: #f2f5fa;
      .el-checkbox__label {
        i {
          display: block;
        }
      }
    }
    .el-checkbox__label {
      width: calc(100% - 14px);
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      i {
        display: none;
        width: 16px;
        height: 16px;
        background: url('~@/assets/images/common/drag.png') 50% no-repeat;
        background-size: 100%;
      }
    }
  }
}
```