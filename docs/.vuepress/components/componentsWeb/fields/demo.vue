<template>
  <div class="demo">
    <div class="demo-field">
      <el-popover placement="bottom" :width="180" trigger="click" popper-class="popper-not">
        <template #reference>
          <div class="not6">
            <img src="./images/setUp.png" alt="" />
            <span>字段显示</span>
          </div>
        </template>
        <div class="field-display">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
          </el-checkbox>
          <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
            <vuedraggable :list="cities" handle=".handle" group="people" @end="onEnd">
              <template #item="{ element }"></template>
              <el-checkbox v-for="(element, index) in cities" :key="index" :label="element.id"
                :disabled="element.disable">
                <span>{{ element.name }}</span>
                <i class="handle"></i>
              </el-checkbox>
            </vuedraggable>
          </el-checkbox-group>
        </div>
      </el-popover>
    </div>
    <el-table :data="hiddenPointList" @header-dragend="headerDragend" style="width: 100%" key="securityRisks">
      <el-table-column v-for="(item, index) in citiesList" :key="item.prop + index" :prop="item.prop" :label="item.name"
        :width="item.prop != 'orgName' && item.prop != 'content' ? item.bor : ''" :align="item.align"
        :min-width="item.prop == 'orgName' || item.prop == 'content' ? '200' : ''">
        <template #default="scope" v-if="item.scopeShow">
          <div v-if="item.prop == 'content'">{{ scope.row.content }}</div>
          <div class="examine-img" v-if="item.prop == 'files'">
            <img :src="item.SaveName" alt="" v-for="(item, index) in scope.row.files" :key="'examine-img' + index"
              @click.stop="checkFun(scope.row.files, index)" />
          </div>
          <div class="hiddenPointStatus" v-if="item.prop == 'status'">
            <p
              :style="'background-color: ' + hiddenPointBack[scope.row.status] + ';color:' + hiddenPointCol[scope.row.status]">
              {{ hiddenPointName[scope.row.status] }}</p>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="120">
        <template slot-scope="scope">
          <el-button type="text" size="small">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable'
export default {
  name: "index",
  components: { vuedraggable },
  data() {
    return {
      hiddenPointCol: {
        0: '#FE7907',
        1: '#036ED5',
        2: '#0C870E',
        3: '#778CA2'
      },
      hiddenPointBack: {
        0: '#FEF4D9',
        1: '#DEEBFB',
        2: '#DAF2EA',
        3: '#EBEEF2'
      },
      hiddenPointName: {
        0: '待整改',
        1: '待评审',
        2: '已完成',
        3: '已作废'
      },
      hiddenPointList: [
        { "id": "4YrB7rS7ncb", "content": "门头不整洁", "files": "[]", "orgId": "63681eb6-f095-4342-9069-f52fbf6e6bd4", "orgName": "文谷-测试", "checkUnitId": "4JAhu9UCfZ1", "checkUnitName": "切割车间工位", "outCheckerName": "李诗瑜", "checkTime": 1653369189, "deadLine": 1655961227, "isOverdue": false, "lastOpTime": 0, "finishTime": 0, "createTime": 1653369227, "status": 0, "deadlineMode": 30 },
        { "id": "4YrB7rS7ncZ", "content": "营业时间说明放置不符合规定标准", "files": "[]", "orgId": "63681eb6-f095-4342-9069-f52fbf6e6bd4", "orgName": "文谷-测试", "checkUnitId": "4JAhu9UCfZ1", "checkUnitName": "切割车间工位", "outCheckerName": "李诗瑜", "checkTime": 1653369189, "deadLine": 1655961227, "isOverdue": false, "lastOpTime": 0, "finishTime": 0, "createTime": 1653369227, "status": 0, "deadlineMode": 30 },
        { "id": "4YrB7rS7ncX", "content": "门牌被覆盖", "files": "[]", "orgId": "63681eb6-f095-4342-9069-f52fbf6e6bd4", "orgName": "文谷-测试", "checkUnitId": "4JAhu9UCfZ1", "checkUnitName": "切割车间工位", "outCheckerName": "李诗瑜", "checkTime": 1653369189, "deadLine": 1655961227, "isOverdue": false, "lastOpTime": 0, "finishTime": 0, "createTime": 1653369227, "status": 0, "deadlineMode": 30 },
        { "id": "4Vsx1t3QWfy", "content": "导轨有水印", "files": "[]", "orgId": "1207840139193802752", "orgName": "文谷-浙江", "checkUnitId": "4CQjBcSvviB", "checkUnitName": "三坐标检测仪", "outCheckerName": "李诗瑜", "checkTime": 1648110713, "deadLine": 1650702719, "isOverdue": false, "lastOpTime": 1648110803, "finishTime": 1648110846, "createTime": 1648110719, "status": 2, "deadlineMode": 30 },
        { "id": "4YrAkq6dyNo", "content": "湿度不达标", "files": "[]", "orgId": "1207840139193802752", "orgName": "文谷-浙江", "checkUnitId": "4CQjBcSvviB", "checkUnitName": "三坐标检测仪", "outCheckerName": "李诗瑜", "checkTime": 1648101481, "deadLine": 1655961036, "isOverdue": false, "lastOpTime": 0, "finishTime": 0, "createTime": 1653369036, "status": 0, "deadlineMode": 30 },
        { "id": "4VseV5hE5yy", "content": "松动损坏", "files": "[]", "orgId": "1207840139193802752", "orgName": "文谷-浙江", "checkUnitId": "4CQjBcSvviB", "checkUnitName": "三坐标检测仪", "outCheckerName": "李诗瑜", "checkTime": 1648101481, "deadLine": 1648360690, "isOverdue": true, "lastOpTime": 1648103363, "finishTime": 0, "createTime": 1648101490, "status": 1, "deadlineMode": 3 },
        { "id": "4VseKv7774B", "content": "室内温湿度没达到要求", "files": "[]", "orgId": "1207840139193802752", "orgName": "文谷-浙江", "checkUnitId": "4CQjBcSvviB", "checkUnitName": "三坐标检测仪", "outCheckerName": "顾静微", "checkTime": 1648101399, "deadLine": 1650693407, "isOverdue": true, "lastOpTime": 0, "finishTime": 0, "createTime": 1648101407, "status": 0, "deadlineMode": 30 },
        { "id": "4VF9zhjLXNq", "content": "各类营销资源不充足，需要及时补充", "files": "[]", "orgId": "63681eb6-f095-4342-9069-f52fbf6e6bd4", "orgName": "文谷-测试", "checkUnitId": "4DUMMmznkJ3", "checkUnitName": "洪光路网点", "outCheckerName": "李诗瑜", "checkTime": 1646987273, "deadLine": 1648283319, "isOverdue": false, "lastOpTime": 1653294665, "finishTime": 1653294688, "createTime": 1646987319, "status": 2, "deadlineMode": 15 },
        { "id": "4VF9zhjLXNo", "content": "柜门未上锁，不安全", "files": "[]", "orgId": "63681eb6-f095-4342-9069-f52fbf6e6bd4", "orgName": "文谷-测试", "checkUnitId": "4DUMMmznkJ3", "checkUnitName": "洪光路网点", "outCheckerName": "李诗瑜", "checkTime": 1646987273, "deadLine": 1647592119, "isOverdue": true, "lastOpTime": 0, "finishTime": 0, "createTime": 1646987319, "status": 0, "deadlineMode": 7 },
        { "id": "4VEwVBoVu1s", "content": "机床夹具定位不准确", "files": "[]", "orgId": "1207840139193802752", "orgName": "文谷-浙江", "checkUnitId": "4CR27cQXdDy", "checkUnitName": "数控车床", "outCheckerName": "李诗瑜", "checkTime": 1646980654, "deadLine": 1647014400, "isOverdue": true, "lastOpTime": 0, "finishTime": 0, "createTime": 1646980734, "status": 0, "deadlineMode": 0 }],
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
    };
  },
  created() {
    this.batchManageFun()
  },
  methods: {
    batchManageFun() {
      this.batchManageList = {
        cityOptions: ['1', '2', '3', '4', '5', '6'],
        disableList: ['3'],
        citiesNameList: 'v1.1.2',
        cities: [
          { id: '1', name: '隐患内容', son: 1, bor: 300, prop: 'content', align: 'left', scopeShow: true, disable: false },
          { id: '2', name: '图片', son: 2, bor: 160, prop: 'files', align: 'center', scopeShow: true, disable: false },
          { id: '3', name: '企业名称', son: 3, bor: 240, prop: 'orgName', align: 'left', scopeShow: false, disable: true },
          { id: '4', name: '风险点', son: 4, bor: 170, prop: 'checkUnitName', align: 'left', scopeShow: false, disable: false },
          { id: '5', name: '排查人', son: 5, bor: 120, prop: 'outCheckerName', align: 'center', scopeShow: false, disable: false },
          { id: '6', name: '状态', son: 6, bor: 120, prop: 'status', align: 'center', scopeShow: true, disable: false }
        ],
        citiesList: [
          { id: '1', name: '隐患内容', son: 1, bor: 300, prop: 'content', align: 'left', scopeShow: true, disable: false },
          { id: '2', name: '图片', son: 2, bor: 160, prop: 'files', align: 'center', scopeShow: true, disable: false },
          { id: '3', name: '企业名称', son: 3, bor: 240, prop: 'orgName', align: 'left', scopeShow: false, disable: true },
          { id: '4', name: '风险点', son: 4, bor: 170, prop: 'checkUnitName', align: 'left', scopeShow: false, disable: false },
          { id: '5', name: '排查人', son: 5, bor: 120, prop: 'outCheckerName', align: 'center', scopeShow: false, disable: false },
          { id: '6', name: '状态', son: 6, bor: 120, prop: 'status', align: 'center', scopeShow: true, disable: false }
        ],
        checkAll: true,
        isIndeterminate: false,
        checkedCities: ['1', '2', '3', '4', '5', '6']
      }

      this.batchManageStorage = JSON.parse(JSON.stringify(this.batchManageList))
      let obj = localStorage.getItem('yiyunDocument')
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
          localStorage.setItem('yiyunDocument', JSON.stringify(this.batchManageStorage))
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
        localStorage.setItem('yiyunDocument', JSON.stringify(this.batchManageStorage))
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
      localStorage.setItem('yiyunDocument', JSON.stringify(this.batchManageList))
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
      localStorage.setItem('yiyunDocument', JSON.stringify(this.batchManageList))
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
      localStorage.setItem('yiyunDocument', JSON.stringify(this.batchManageList))
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
      localStorage.setItem('yiyunDocument', JSON.stringify(this.batchManageList))
    },
  },
};
</script>

<style lang="scss" scoped>
p,
ul,
ol {
  line-height: inherit;
  padding: 0;
}

/deep/.el-table__body,
/deep/.el-table__footer,
/deep/.el-table__header {
  margin: 0;
}

.demo {
  .demo-field {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 20px 0;

    .not6 {
      display: flex;
      align-items: center;
      cursor: pointer;

      img {
        width: 16px;
        margin-right: 4px;
      }

      span {
        color: #036ed5;
        font-size: 12px;
      }
    }
  }
}

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
        background: url('./images/drag.png') 50% no-repeat;
        background-size: 100%;
      }
    }
  }
}
</style>