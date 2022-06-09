<!--组织架构单选-->
<template>
  <div :class="dialogVisible ? 'framework' : 'framework cur'">
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
    <div class="framework-search">
      <div class="search">
        <img :src="require('./images/search.png')" class="searchIcon" alt />
        <input type="text" placeholder="请搜索人名" class="searchInput" v-model="searchCode" @input="inputSearch"
          ref="mobileInput" :maxlength="searchWords" />
      </div>
    </div>
    <div class="crumbs" v-if="breadCrumbsList.length >= 1 && !searchCode">
      <ul>
        <li v-for="(item, index) in breadCrumbsList" :key="index" @click="crumbsBtn(item, index)">
          <img :src="require('./images/copyright.png')" alt v-if="index != 0" />
          <span v-text="item"></span>
        </li>
      </ul>
    </div>
    <div class="exhibit" v-if="!searchCode && frameworkList.length != 0">
      <ul>
        <li v-for="(item, index) in frameworkList" :key="index">
          <div class="department" v-if="!item.isWhether">
            <div class="not1">
              <p class="sol1">
                <img :src="require('./images/selected.png')" alt v-if="item.selection" />
              </p>
              <p class="sol2" v-text="item.name"></p>
            </div>
            <div class="not2" @click="item.data.length == 0 ? '' : subordinate(item)">
              <p :class="item.data.length == 0 ? 'sol3' : ''">
                <img :src="require('./images/metadata.png')" alt v-if="item.data.length == 0" />
                <img :src="require('./images/creating.png')" alt v-else />
                <span>下级</span>
              </p>
            </div>
          </div>
          <div class="personnel" v-else @click="item.banned ? '' : personnelBtn(item)">
            <p :class="item.checked ? 'sol1 cur' : 'sol1'" :style="item.banned ? 'background-color: #DEDEDE;' : ''">
              <img :src="require('./images/check.png')" alt v-if="item.checked" />
            </p>
            <p class="sol2">
              <img :src="item.profilePicture" avatar="avatar" alt />
            </p>
            <p class="sol3">
              <span :style="item.banned ? 'color: #909399;' : ''" v-text="item.name"></span>
            </p>
          </div>
        </li>
      </ul>
    </div>
    <div class="search_display" v-if="searchCode && frameworkList.length != 0">
      <ul>
        <li v-for="(item, index) in frameworkList" :key="index">
          <div class="personnel" @click="item.banned ? '' : personnelBtn(item)">
            <p :class="item.checked ? 'sol1 cur' : 'sol1'" :style="item.banned ? 'background-color: #DEDEDE;' : ''">
              <img :src="require('./images/check.png')" alt v-if="item.checked" />
            </p>
            <p class="sol2">
              <img :src="item.profilePicture" avatar="avatar" alt />
            </p>
            <p class="sol3" :style="item.banned ? 'color: #909399;' : ''">
              <span v-text="item.name"></span>
              <span v-text="'部门名：' + (item.fatherName ? item.fatherName : '无')"></span>
            </p>
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
    <div class="delay" v-if="ejectShow">
      <!-- <div :class="ejectShow ? 'delay' : 'delay cur'"> -->
      <div class="mask" v-if="ejectShow" @click="ejectShow = false"></div>
      <div class="delay-title">
        <div class="delay-top">
          <p @click="ejectShow = false">关闭</p>
          <p>已选择</p>
          <p @click="ejectShow = false">完成</p>
        </div>
        <ul>
          <li v-for="(item, index) in multipleTotal" :key="index">
            <p>
              <img :src="item.profilePicture" alt avatar="avatar" />
              <span class="ellipsis" v-text="item.name"></span>
            </p>
            <!-- <p class="ellipsis" v-text="item.name"></p> -->
            <!-- <span @click="personnelDel(item)">删除</span> -->
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Framework',
  props: {
    dialogVisible: {
      //显示隐藏
      type: Boolean,
      default: false
    },
    companyName: {
      //企业名称
      type: String,
      default: '全公司'
    },
    title: {
      //标题
      type: String,
      default: '组织架构'
    },
    list: {
      //数据
      type: Array,
      default() {
        return []
      }
    },
    selectedList: {
      //选中数据
      type: Array,
      default() {
        return []
      }
    },
    notOptionalList: {
      //禁止数据
      type: Array,
      default() {
        return [];
      }
    },
    searchWords: {
      //搜索字数上限
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      searchCode: '',
      deptList: [], //顶级树结构
      frameworkList: [],
      departmentList: [], //处理成全部同级数据
      crumbs: [], //面包屑数据
      breadCrumbsList: [], //面包屑name
      departmentData: [],
      multipleTotal: [],
      ejectShow: false
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
      let deptList = JSON.parse(JSON.stringify(this.deptList))
      deptList.forEach((arr) => {
        if (arr.id == item.id) {
          this.frameworkList = arr.data
          this.crumbs[item.name] = arr.data
          this.breadCrumbsList.push(item.name)
          this.deptList = arr.data
        }
      })
    },
    crumbsBtn(item, index) {
      let breadCrumbsList = JSON.parse(JSON.stringify(this.breadCrumbsList))
      for (let i = breadCrumbsList.length - 1; i >= 0; i--) {
        if (i > index) {
          breadCrumbsList.splice(i, 1)
        }
      }
      this.breadCrumbsList = breadCrumbsList

      this.frameworkList = this.crumbs[item]
      this.deptList = this.crumbs[item]
    },
    personnelBtn(item) {
      item.checked = !item.checked
      let that = this
      let departmentList = JSON.parse(JSON.stringify(this.departmentList))
      that.multipleTotal = []
      if ((item.checked && !item.isWhether) || (item.checked && item.isWhether)) {
        departmentList.forEach((element) => {
          if (item.id == element.id) {
            element.checked = true
            that.multipleTotal.push(element)
          }
        })
      } else if ((!item.checked && item.isWhether) || (!item.checked && !item.isWhether)) {
        for (let i = that.multipleTotal.length - 1; i >= 0; i--) {
          if (item.id == that.multipleTotal[i].id) {
            that.multipleTotal.splice(i, 1)
          }
        }
      }
      that.multipleTotal = that.unique(that.multipleTotal)
      this.$emit('confirm', that.multipleTotal)
      this.ejectShow = false
      // this.$emit("confirm", [item]);
    },
    closeDialog() {
      this.$emit('cancel')
    },
    searchDataFun() {
      let optionsData = []
      let that = this
      if (this.searchCode) {
        let fine = function (data) {
          data.forEach((arr) => {
            if (arr.isWhether && arr.name.includes(that.searchCode)) {
              optionsData.push(arr)
            }
            if (arr.data.length != 0) {
              fine(arr.data)
            }
          })
        }
        fine(this.crumbs[this.companyName])
        for (var i = 0; i < optionsData.length; i++) {
          for (var j = i + 1; j < optionsData.length; j++) {
            if (optionsData[i].id == optionsData[j].id) {
              optionsData.splice(j, 1)
              j--
            }
          }
        }
        this.frameworkList = optionsData
      } else {
        this.IsSearch()
        this.breadCrumbsList = [this.companyName]
        this.frameworkList = this.crumbs[this.companyName]
        this.deptList = this.crumbs[this.companyName]
      }
    },

    debounce(fn, wait) {
      //输入框控制时间执行
      let timer = null
      return () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
      }
    },
    IsSearch() {
      let fine = function (data) {
        data.forEach((arr) => {
          if (arr.data.length != 0) {
            let num = 0
            let sum = false
            arr.data.forEach((element) => {
              if (element.checked) {
                num = num + 1
              }
              if (element.selection) {
                sum = true
              }
            })
            if (num == arr.data.length) {
              if (sum) {
                arr.checked = false
                arr.selection = true
              } else {
                arr.checked = true
                arr.selection = false
              }
            }
            if (num > 0) {
              arr.checked = false
              arr.selection = true
            }
            if (num == 0) {
              if (sum) {
                arr.checked = false
                arr.selection = true
              } else {
                arr.checked = false
                arr.selection = false
              }
            }
          }
          if (arr.data.length != 0) {
            fine(arr.data)
          }
        })
      }
      fine(this.crumbs[this.companyName])
    },
    unique(list) {
      //去掉重复选取的数据
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length;) {
          if (list[i].id == list[j].id) {
            //通过id属性进行匹配；
            list.splice(j, 1) //去除重复的对象；
          } else {
            j++
          }
        }
      }
      return list
    }
  },

  computed: {},
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        // console.log('this.list',this.list)
        let personalList = []
        let departmentList = JSON.parse(JSON.stringify(this.list))
        let selectedList = JSON.parse(JSON.stringify(this.selectedList))
        let multipleTotal = []
        let fine = function (data, id) {
          data.forEach((arr) => {
            if (arr.id == id) {
              arr.selection = true
              if (arr.parentId) {
                fine(departmentList, arr.parentId)
              }
            }
          })
        }
        departmentList.forEach((arr, index) => {
          if (arr.positions && arr.name == this.companyName) {
            arr.name = arr.name + index
          }
          arr.data = []
          arr.isWhether = arr.positions ? false : true
          arr.selection = false
          arr.checked = false
          selectedList.forEach((element) => {
            if (arr.id == element) {
              arr.checked = true
              multipleTotal.push(arr)
              if (arr.deptIdList && arr.deptIdList.length != 0) {
                arr.deptIdList.forEach((list) => {
                  fine(departmentList, list)
                })
              }
            }
          })
        })
        this.multipleTotal = this.unique(multipleTotal)
        // console.log('departmentList',departmentList)
        departmentList.forEach((arr) => {
          departmentList.forEach((element) => {
            // 查询数据 分辨父子
            if (element.deptIdList && element.deptIdList.length != 0) {
              element.deptIdList.forEach((list) => {
                if (arr.id == list) {
                  let obj = {
                    active: element.active,
                    checked: element.checked,
                    banned: this.notOptionalList.indexOf(element.id) == -1 ? false : true,
                    data: element.data,
                    deptIdList: element.deptIdList,
                    fatherName: arr.name,
                    isWhether: element.isWhether,
                    selection: element.selection,
                    id: element.id,
                    name: element.name,
                    profilePicture: element.profilePicture
                  }
                  arr.data.push(obj)
                }
              })
            }
            if (!element.deptIdList) {
              if (arr.id == element.parentId) {
                arr.data.push(element)
              }
            }
          })
          if ((arr.deptIdList && arr.deptIdList.length == 0) || (!arr.deptIdList && !arr.parentId)) {
            //最顶级人员
            personalList.push(arr)
          }
        })
        this.breadCrumbsList = [this.companyName]
        // console.log('personalList',personalList)
        this.crumbs[this.companyName] = JSON.parse(JSON.stringify(personalList))
        this.departmentList = JSON.parse(JSON.stringify(departmentList))
        if (this.selectedList.length != 0) {
          this.IsSearch()
        }

        this.frameworkList = this.crumbs[this.companyName]
        this.deptList = this.crumbs[this.companyName]
        // console.log('frameworkList',this.frameworkList)
        // console.log('deptList',this.deptList)
      } else {
        this.searchCode = ''
      }
    }
  }
}
</script>
<style scoped lang='scss'>
// @import "~@/temp.scss";
p,
ul,
ol {
  line-height: inherit;
  padding: 0;
}

.framework {
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
      width: calc(100% - 76px);
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

.framework-search {
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

    img {
      width: 16px;
      position: absolute;
      top: 11px;
      left: 11px;
    }

    input {
      width: 100%;
      height: 35px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 8px 0 8px 32px;
    }
  }
}

.scroll-ove {
  width: 100%;
  height: calc(100% + 1px);
}

.crumbs {
  width: 100%;
  background-color: #ffffff;

  ul {
    // width: 100%;
    // white-space: nowrap;
    // overflow-x: scroll;
    padding: 12px 14px;
    // display: flex;
    // align-items: center;
    display: inline-block;
    background-color: #fff;

    li {
      // display: flex;
      // align-items: center;
      display: inline-block;

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
      padding: 10px 20px;
      border-bottom: 1px solid #f1f1f1;

      .department {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .not1 {
          display: flex;
          align-items: center;
          width: 75%;

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
            width: calc(100% - 26px);
            margin-left: 10px;
          }
        }

        .not2 {
          width: 25%;
          padding: 5px 0 5px 16px;
          border-left: 1px solid #ededee;

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

          svg {
            width: 16px;
            height: 16px;
            fill: #0067ff;
          }
        }

        .sol1.cur {
          border: 0;
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
  height: calc(100% - 159px);
}

.btn {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
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
    // padding: 12px 10px;
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
      // overflow: scroll;
      height: calc(100% - 38px);

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
          display: flex;
          align-items: center;

          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            object-fit: cover;
            margin-right: 10px;
          }

          span {
            display: block;
            width: calc(100% - 26px);
            text-align: left;
          }
        }

        &>span {
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