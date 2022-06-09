<!--工厂模型单选-->
<template>
  <div :class="dialogVisible ? 'factory-model-radio' : 'factory-model-radio cur'">
    <div class="head">
      <div class="head-top">
        <div class="head-return">
          <p @click="closeDialog">
            <img :src="require('./images/left.png')" alt />
            <span>返回</span>
          </p>
        </div>
        <div class="head-h3 head-not2">
          <p>{{ title }}</p>
        </div>
      </div>
    </div>
    <div class="factory-model-radio-search">
      <div class="search">
        <img :src="require('./images/search.png')" class="searchIcon" alt />
        <input type="text" placeholder="搜索" class="searchInput" v-model="searchCode" @input="inputSearch"
          ref="mobileInput" :maxlength="searchWords" />
        <p class="scan-code" v-if="isScanCode" @click="scanCode">
          <img :src="require('./images/scanCode.png')" alt />
        </p>
      </div>
    </div>
    <div class="crumbs" v-if="!searchCode">
      <ul>
        <li v-for="(item, index) in breadCrumbsList" :key="index" @click="crumbsBtn(item, index)">
          <img :src="require('./images/copyright.png')" alt v-if="index != 0" />
          <span v-text="item.name" :class="index < breadCrumbsList.length - 1 ? 'blue' : ''"></span>
        </li>
      </ul>
    </div>
    <div class="exhibit" v-if="!searchCode && frameworkList.length != 0">
      <ul>
        <li v-for="(item, index) in frameworkList" :key="index">
          <div class="department" @click="item.selection ? '' : personnelBtn(item)">
            <div class="not1">
              <p class="sol1"
                :style="!item.selection && item.checked ? 'border:0;' : item.selection ? 'background-color: #DEDEDE;' : ''"
                v-if="notOptionalType.indexOf(item.type) == -1">
                <img :src="require('./images/check.png')" alt v-if="!item.selection && item.checked" />
              </p>
              <p class="sol2">
                <img :src="!item.checked ? disImageList[item.type - 1].img : disImageList[item.type - 1].img_se" alt
                  v-if="disImageList.length != 0" />
                <span :style="item.selection ? 'color:' : '#909399'" v-text="item.name"></span>
              </p>
            </div>
            <div class="not2" @click.stop="item.data.length == 0 ? '' : subordinate(item)"
              v-if="item.data.length != 0 && !searchCode">
              <p :class="item.data.length == 0 ? 'sol3' : ''">
                <img :src="require('./images/metadata.png')" alt v-if="item.data.length == 0" />
                <img :src="require('./images/creating.png')" alt v-else />
                <span>下级</span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="search_display" v-if="searchCode && frameworkList.length != 0">
      <ul>
        <li v-for="(item, index) in frameworkList" :key="index">
          <div class="department" @click="item.selection ? '' : personnelBtn(item)">
            <div class="not1">
              <p class="sol1"
                :style="!item.selection && item.checked ? 'border:0;' : item.selection ? 'background-color: #DEDEDE;' : ''"
                v-if="notOptionalType.indexOf(item.type) == -1">
                <img :src="require('./images/check.png')" alt v-if="!item.selection && item.checked" />
              </p>
              <p class="sol2">
                <img :src="!item.checked ? disImageList[item.type - 1].img : disImageList[item.type - 1].img_se" alt
                  v-if="disImageList.length != 0" />
                <span :style="item.selection ? 'color:' : '#909399'" v-text="item.name"></span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-else-if="!searchCode && frameworkList.length == 0" class="blank" style="padding:30% 0 0 0">
      <img src="https://dl-yiyunappclient.effio.cn/resource/common/empty_data.png" alt />
      <span>暂无数据</span>
    </div>
    <div v-else-if="searchCode && frameworkList.length == 0" class="blank" style="padding:30% 0 0 0">
      <img src="https://dl-yiyunappclient.effio.cn/resource/common/empty_search.png" alt />
      <span>抱歉！</span>
      <p>没有搜索到“{{ searchCode }}”相关内容</p>
    </div>
    <div class="btn">
      <p>
        已选择：{{ multipleTotal.length }}个
        <span @click="ejectShow = true" v-if="multipleTotal.length != 0">查看</span>
      </p>
      <!-- <p @click="btn">确定</p> -->
    </div>
    <!-- <div class="delay" v-if="ejectShow"> -->
    <div :class="ejectShow ? 'delay' : 'delay cur'">
      <div class="mask" v-if="ejectShow" @click="ejectShow = false"></div>
      <div class="delay-title">
        <div class="delay-top">
          <p @click="ejectShow = false">关闭</p>
          <p>已选择</p>
          <p @click="ejectShow = false">完成</p>
        </div>
        <ul>
          <li v-for="(item, index) in multipleTotal" :key="index">
            <p class="ellipsis" v-text="item.name"></p>
            <!-- <span @click="personnelDel(item)">删除</span> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "FactoryModelRadio",
  props: {
    dialogVisible: {
      //显示隐藏
      type: Boolean,
      default: false
    },
    companyName: {//企业名称
      type: String,
      default: '全公司'
    },
    title: {//标题
      type: String,
      default: '工厂模型'
    },
    list: {
      //数据
      type: Array,
      default() {
        return [];
      }
    },
    disImageList: {
      //选中数据
      type: Array,
      default() {
        return [
          {
            img: require('./images/level_1.png'),
            img_se: require('./images/level_1.png'),
          },
          {
            img: require('./images/level_2.png'),
            img_se: require('./images/level_2_se.png'),
          },
          {
            img: require('./images/level_3.png'),
            img_se: require('./images/level_3_se.png'),
          },
          {
            img: require('./images/level_4.png'),
            img_se: require('./images/level_4_se.png'),
          },
          {
            img: require('./images/level_5.png'),
            img_se: require('./images/level_5_se.png'),
          },
        ];
      }
    },
    selectedList: {
      //选中数据
      type: Array,
      default() {
        return [];
      }
    },
    AllLevels: {
      //全部层级
      type: Array,
      default() {
        return [1, 2, 3, 4, 5];
      }
    },
    notOptionalList: {
      //不可选数据ID列表
      type: Array,
      default() {
        return [];
      }
    },
    notOptionalType: {
      //不可选层级
      type: Array,
      default() {
        return [1];
      }
    },
    notShowingList: {
      //不展示数据ID列表
      type: Array,
      default() {
        return [];
      }
    },
    notShowingType: {
      //不展示层级
      type: Array,
      default() {
        return [1];
      }
    },
    searchWords: {//搜索字数上限
      type: Number,
      default: 100
    },
    isScanCode: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      searchCode: '',
      deptList: [],//顶级树结构
      frameworkList: [],
      departmentList: [],//处理成全部同级数据
      crumbs: [], //面包屑数据
      breadCrumbsList: [],//面包屑name
      multipleTotal: [],
      ejectShow: false,
    }
  },
  mounted() {
    // this.$refs["mobileInput"].oninput = this.debounce(this.searchDataFun,1000);
  },
  methods: {
    inputSearch() {
      this.searchCode = this.searchCode ? this.searchCode.trim() : ''
      this.searchDataFun()
    },
    subordinate(item) {
      let deptList = this.crumbs[this.breadCrumbsList[this.breadCrumbsList.length - 1].name]
      deptList.forEach(arr => {
        if (arr.id == item.id) {
          this.frameworkList = arr.data
          this.crumbs[item.name] = arr.data
          this.breadCrumbsList.push(item)
        }
      })
    },
    crumbsBtn(item, index) {
      let breadCrumbsList = JSON.parse(JSON.stringify(this.breadCrumbsList))
      this.frameworkList = this.crumbs[item.name]
      for (let i = breadCrumbsList.length - 1; i >= 0; i--) {
        if (i > index) {
          breadCrumbsList.splice(i, 1)
        }
      }
      this.breadCrumbsList = breadCrumbsList
    },
    personnelBtn(item) {
      item.checked = !item.checked
      let that = this
      // console.log(item)
      // console.log(that.frameworkList)
      that.multipleTotal = []
      let departmentList = JSON.parse(JSON.stringify(this.departmentList))

      if (item.checked) {
        departmentList.forEach(element => {
          if (item.id == element.id) {
            element.checked = true
            that.multipleTotal.push(element)
          }
        })

      } else {
        for (let i = that.multipleTotal.length - 1; i >= 0; i--) {
          if (item.id == that.multipleTotal[i].id) {
            that.multipleTotal.splice(i, 1)
          }
        }

      }

      let breadCrumbsList = []
      this.breadCrumbsList.forEach(arr => { if (arr.id) { breadCrumbsList.push(arr) } })
      this.$emit("confirm", this.multipleTotal, breadCrumbsList);
      this.ejectShow = false

    },
    personnelDel(item) {
      let that = this
      let fine = function (data) {
        data.forEach(arr => {
          if (arr.id == item.id) {
            that.personnelBtn(arr)
          }
          if (arr.data.length != 0) {
            fine(arr.data)
          }
        })
      }
      fine(this.crumbs[this.breadCrumbsList[0].name])
    },
    closeDialog() {
      this.$emit("cancel");
    },
    async searchDataFun() {
      let optionsData = []
      let that = this
      if (this.searchCode) {
        let fine = function (data) {
          data.forEach(arr => {
            if (arr.name.includes(that.searchCode)) {
              optionsData.push(arr)
            }
            if (arr.data.length != 0) {
              fine(arr.data)
            }
          })
        }
        fine(this.crumbs[this.breadCrumbsList[0].name])
        for (var i = 0; i < optionsData.length; i++) {
          for (var j = i + 1; j < optionsData.length; j++) {
            if (optionsData[i].id == optionsData[j].id) {
              optionsData.splice(j, 1);
              j--;
            }
          }
        }
        this.frameworkList = optionsData
      } else {
        this.frameworkList = this.crumbs[this.breadCrumbsList[this.breadCrumbsList.length - 1].name]
      }
      // console.log(this.crumbs)
    },
    async btn() {
      let multipleTotal = JSON.parse(JSON.stringify(this.multipleTotal))
      for (let i = 0; i < multipleTotal.length; i++) {
        multipleTotal[i].pathList = await this.getPosByIdInTree(multipleTotal[i].id)
      }
      this.$emit("confirm", multipleTotal, this.breadCrumbsList);
      this.ejectShow = false
    },
    getPosByIdInTree(id) {
      const tmp = [] // 路径数组
      // if (tree.id === id) { return tree }//根节点
      let renderTree = {
        id: '',
        data: JSON.parse(JSON.stringify(this.crumbs[this.breadCrumbsList[0].name]))
      }
      const FindPos = (sourceTree, sourceId) => {
        if (!sourceTree.data) {
          return // 为末端节点
        }
        sourceTree.data.forEach((item, index) => {
          if (item.id === sourceId) {
            // 寻找到指定的元素节点
            // console.log(item)
            let obj = {
              id: item.id,
              name: item.name,
              parentId: item.parentId,
              type: item.type,
            }
            tmp.push(obj)
            FindPos(renderTree, sourceTree.id) // 继续寻找上层元素的位置
          } else {
            // 当前继续寻找别的子项
            FindPos(item, sourceId)
          }
        })
      }
      FindPos(renderTree, id)
      // 这里会有一些特定的问题,这个路径是反序存储的，所以需要存进去之后反转一次
      // 另外看自己的需求，这个是否需要push(0)作为根节点的判定
      return tmp
    },
    debounce(fn, wait) {//输入框控制时间执行
      let timer = null
      return () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
      };
    },
    unique(list) {
      //去掉重复选取的数据
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length;) {
          if (list[i].id == list[j].id) {//通过id属性进行匹配；
            list.splice(j, 1);//去除重复的对象；
          } else {
            j++;
          }
        }
      }
      return list
    },
    scanCode() {
      this.$emit("scanCodeOperation");
    },
  },
  computed: {

  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        let masterBranch = []
        let list = []
        let deptConcat = JSON.parse(JSON.stringify(this.list))
        let notShowingType = JSON.parse(JSON.stringify(this.notShowingType))
        let notShowingList = JSON.parse(JSON.stringify(this.notShowingList))
        let notOptionalType = JSON.parse(JSON.stringify(this.notOptionalType))
        let notOptionalList = JSON.parse(JSON.stringify(this.notOptionalList))
        let newarr = this.AllLevels.filter(function (n) { //可显示层级
          return notShowingType.indexOf(n) === -1
        })
        let minType = Math.min(...newarr) //显示为最上级type
        let minList = []
        let typeMax = {}
        deptConcat.forEach((arr, index) => {
          if (arr.name == this.companyName) {
            arr.name = arr.name + index
          }
          arr.data = []
          arr.checked = false // 选择 
          arr.selection = false //是否可选
          if (minType - 1 > 0 && arr.type == minType - 1) {
            minList.push(arr)
          }
          if (notShowingType.indexOf(arr.type) == -1 && notShowingList.indexOf(arr.id) == -1) {//层级选择
            if (notOptionalType.indexOf(arr.type) != -1 || notOptionalList.indexOf(arr.id) != -1) {//不可选择标识
              arr.selection = true
            }
            list.push(arr)
          }
          if (arr.type == 1) {
            typeMax = arr
          }
        })
        list.forEach(arr => {

          list.forEach(element => {
            if (arr.id == element.parentId) {
              arr.data.push(element)
            }
          })
          if (minList.length != 0) {
            minList.forEach(element => {//最顶级人员
              if (arr.parentId == element.id) {
                masterBranch.push(arr)
              }
            })
          } else {
            if (arr.type == 1) {
              masterBranch.push(arr)
            }

          }
        })
        if (notShowingType.indexOf(1) == -1) {
          this.breadCrumbsList = [{
            name: this.companyName,
            id: 0,
          }]
        } else {
          this.breadCrumbsList = [typeMax]
        }
        // console.log('masterBranch',masterBranch)
        this.crumbs[this.breadCrumbsList[0].name] = JSON.parse(JSON.stringify(masterBranch))
        this.departmentList = JSON.parse(JSON.stringify(this.list))
        let multipleTotal = []
        if (this.selectedList.length != 0) {
          let selectedList = JSON.parse(JSON.stringify(this.selectedList))
          let fine = function (data) {
            data.forEach(arr => {
              arr.checked = false
              selectedList.forEach(element => {
                if (arr.id == element) {
                  arr.checked = true
                  multipleTotal.push(arr)
                }
              })
              if (arr.data.length != 0) {
                fine(arr.data)
              }
            })
          }
          fine(this.crumbs[this.breadCrumbsList[0].name])
          multipleTotal = this.unique(multipleTotal)
        }

        this.multipleTotal = multipleTotal
        this.frameworkList = this.crumbs[this.breadCrumbsList[0].name]
        this.deptList = this.crumbs[this.breadCrumbsList[0].name]
      } else {
        this.searchCode = ''
      }
    },
  }
};
</script>
<style scoped lang='scss'>
// @import "~@/temp.scss";
p,
ul,
ol {
  line-height: inherit;
  padding: 0;
}

.factory-model-radio {
  // position: fixed;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  z-index: 50;
  transition: all 0.5s;

  &.cur {
    right: -100%;
  }
}

.head {
  position: relative;
  // top: 100px;
  width: 100%;
  height: 44px;
  padding: 10px;
  background-color: rgb(33, 51, 97);
  z-index: 9;
}

.head-top {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .head-return {
    width: 60px;

    p {
      display: flex;
      align-items: center;

      img {
        width: 16px;
      }

      span {
        color: #ffffff;
        font-size: 14px;
        margin-left: 2px;
        font-weight: 300;
      }
    }
  }

  .head-h3 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    font-size: 16px;
    font-weight: 400;

    &.head-not1 {
      width: calc(100% - 86px);
      padding-left: 86px;
    }

    &.head-not2 {
      width: calc(100% - 60px);
      padding-right: 60px;
    }

    &.head-not3 {
      width: calc(100% - 146px);
    }

    img {
      width: 12px;
      margin-left: 4px;
      margin-top: 2px;
      transition: all 0.5s;

      &.cur {
        transform: rotate(180deg);
      }
    }
  }
}

.factory-model-radio-search {
  // margin: .65rem 0;
  background-color: #ffffff;
  padding: 6px 14px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .search {
    width: 100%;
    height: 35px;
    position: relative;

    .searchIcon {
      width: 16px;
      position: absolute;
      top: 11px;
      left: 11px;
    }

    .scan-code {
      width: 15%;
      height: 100%;
      position: absolute;
      top: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      img {
        width: 16px;
        margin-right: 11px;
      }
    }

    input {
      width: 100%;
      height: 35px;
      border-radius: 4px;

      border: 1px solid #dcdfe6;
      padding: 8px 0 8px 32px;
    }
  }
}

.crumbs {
  width: 100%;

  .blue {
    color: #0067ff;
  }

  ul {
    width: 100%;
    white-space: nowrap;
    overflow-x: scroll;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    background-color: #fff;

    li {
      display: flex;
      align-items: center;

      span {
        color: #606266;
        margin: 0 6px;
      }

      img {
        width: 16px;
      }
    }
  }
}

.exhibit,
.search_display {
  width: 100%;
  height: calc(100% - 200px);
  overflow: scroll;
  padding-bottom: 10px;
  margin-top: 10px;

  ul {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: #ffffff;

    li {
      width: 100%;
      display: flex;
      flex-direction: column;
      padding: 0 20px;
      border-bottom: 1px solid #f1f1f1;
      line-height: 49px;

      .department {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .not1 {
          display: flex;
          align-items: center;
          width: 80%;

          .sol1 {
            width: 16px;
            height: 16px;
            margin-right: 10px;
            border-radius: 50%;
            border: 1px solid #b9c5d2;
            display: flex;
            align-items: center;
            justify-content: center;

            img {
              width: 16px;
            }
          }

          .sol2 {
            width: calc(100% - 26px);

            display: flex;
            align-items: center;

            img {
              width: 16px;
              margin-right: 4px;
            }

            span {
              display: block;
              width: calc(100% - 20px);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }

        .not2 {
          width: 20%;
          margin: 5px 0;
          border-left: 1px solid #ededee;
          line-height: 39px;
          padding-left: 16px;

          p {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          img {
            width: 16px;
          }

          span {
            color: #0067ff;
          }

          .sol3 {
            img {
              width: 16px;
            }

            span {
              color: #b9c5d2;
            }
          }
        }
      }

      .personnel {
        display: flex;
        align-items: center;

        .sol1 {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #b9c5d2;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 16px;
          }
        }

        .sol2 {
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-left: 7px;
          }
        }

        .sol3 {
          width: calc(100% - 69px);
          margin-left: 16px;
          display: flex;
          flex-direction: column;

          span {
            &:nth-child(2) {
              color: #909399;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

.search_display {
  height: calc(100% - 160px);
}

.btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12.5px 20px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.05);
  z-index: 12;

  p {
    color: #606266;

    span {
      color: #036ed5;
    }

    &:nth-child(2) {
      width: 60px;
      background: rgba(3, 110, 213, 1);
      border-radius: 3px;
      font-size: 12px;
      color: #fff;
      line-height: 24px;
      text-align: center;
    }
  }
}

input::-webkit-input-placeholder {
  color: #c0c4cc;
}

.delay {
  width: 100%;
  height: calc(100% - 44px);
  position: absolute;
  bottom: 44px;
  left: 0;
  z-index: 10;
  transition: all 0.5s;

  &.cur {
    // right: -100%;
    bottom: -100%;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #000000;
    opacity: 0.3;
  }

  .delay-title {
    width: 100%;
    position: absolute;
    bottom: 0;
    // padding: 0.6rem 0.5rem;
    z-index: 10;
    height: 85%;
    background-color: #fff;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    .delay-top {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 16px;
      line-height: 38px;

      p {
        &:nth-child(1) {
          width: 20%;
          color: #036ed5;
        }

        &:nth-child(3) {
          width: 20%;
          color: #036ed5;
          text-align: right;
        }
      }
    }

    ul {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 100%;

      li {
        width: 100%;
        padding: 0 16px;
        line-height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eeeeee;

        p {
          width: 80%;
        }

        span {
          width: 20%;
          text-align: right;
          color: #f00;
        }
      }
    }
  }

  .delay-del {
    padding: 16px;
    font-size: 20px;
    color: #007aff;
    background-color: #ffffff;
    border-radius: 6px;
    text-align: center;
  }
}

//空白页
.blank {
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 112px;
    height: 112px;
    margin-bottom: 6px;
  }

  span {
    color: #303133;
    font-size: 12px;
    margin-bottom: 6px;
  }

  p {
    color: #909399;
    font-size: 12px;
    width: 80%;
    text-align: center;
    word-break: normal;
    word-break: break-all;
  }
}
</style>