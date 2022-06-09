<!--列表选择-->
<template>
  <div :class="dialogVisible ? 'options-page' : 'options-page cur'">
    <div class="head">
      <div class="head-top">
        <div class="head-return">
          <p @click="closeDialog">
            <img :src="require('./images/left.png')" alt="">
            <span>返回</span>
          </p>
        </div>
        <div class="head-h3 head-not2">
          <p>{{ title }} </p>
        </div>
      </div>
    </div>
    <div class="searchBox">
      <div class="search">
        <img :src="require('./images/search.png')" class="searchIcon" alt />
        <input type="text" placeholder="搜索" class="searchInput" v-model="multipleCode" @input="inputSearch"
          ref="mobileInput" :maxlength="searchWords" />
      </div>
    </div>
    <div class="scroll" v-if="exhibitList.length != 0">
      <slot :data="optionsData">
        <scroll ref="scroll" style="height:100%" :data="optionsData">
          <div class="scroll-record scroll-ove">
            <div class="examine-index-theme">
              <div class="optionsList">
                <div class="optionsList-div">
                  <div v-for="(item, index) in optionsData" :key="index" class="options-bottom-div"
                    @click="optionsChoice(item)" v-if="item.isExhibit">
                    <img :src="require('./images/uncheck.png')" alt="" v-if="!item.checked">
                    <img :src="require('./images/check.png')" alt="" v-else>
                    <span v-text="item.name ? item.name : item.id" class="ellipsis"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </scroll>
      </slot>
    </div>
    <div v-else-if="!multipleCode && exhibitList.length == 0" class="blank" style="padding:30% 0 0 0">
      <img src="https://dl-yiyunappclient.effio.cn/resource/common/empty_data.png" alt="">
      <span>暂无数据</span>
    </div>
    <div v-else-if="multipleCode && exhibitList.length == 0" class="blank" style="padding:30% 0 0 0">
      <img src="https://dl-yiyunappclient.effio.cn/resource/common/empty_search.png" alt="">
      <span>抱歉！</span>
      <p>没有搜索到“{{ multipleCode }}”相关内容</p>
    </div>
    <div class="btn">
      <p>已选择：{{ setSelectedData.length }}个</p>
      <p @click="btn">确定</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "OptionsPageCheckbox",
  props: {
    isOption: {//false 单选  true 多选
      type: Boolean,
      default: false
    },
    searchTime: {
      type: Number,
      default: 1000
    },
    title: {
      type: String,
      default: '选择列表'
    },
    selectedList: {//选中数据
      type: Array,
      default() {
        return [];
      }
    },
    dialogVisible: {//显示隐藏
      type: Boolean,
      default: false
    },
    list: {//数据
      type: Array,
      default() {
        return [];
      }
    },
    searchWords: {//搜索字数上限
      type: Number,
      default: 100
    },
  },
  data() {

    return {
      exhibitList: [],
      multipleCode: null,
      optionsData: [],
      setSelectedData: [],
      multipleTotal: 0,
    };
  },
  mounted() {
    // this.$refs["mobileInput"].oninput = this.debounce(this.mobileQuery, this.searchTime);
  },
  created() { },
  methods: {
    inputSearch() {
      this.multipleCode = this.multipleCode ? this.multipleCode.trim() : ''
      this.mobileQuery()
    },
    optionsChoice(item) {
      let optionsData = []
      if (this.isOption) {
        item.checked = !item.checked;
        this.optionsData.forEach(arr => {
          if (arr.checked) {
            optionsData.push(arr)
          }
        })
      } else {
        this.optionsData.forEach(arr => {
          arr.checked = false
          if (arr.id == item.id) {
            arr.checked = true
            optionsData.push(arr)
          }
        })
      }
      this.setSelectedData = optionsData
    },
    btn() {
      this.$emit("confirm", this.setSelectedData);
    },
    closeDialog() {//返回
      this.$emit("cancel");
    },
    mobileQuery() {
      this.exhibitList = []
      if (this.multipleCode) {
        this.optionsData.forEach(arr => {
          arr.isExhibit = false
          if (arr.name.includes(this.multipleCode)) {
            arr.isExhibit = true
            this.exhibitList.push(arr)
          }
        })
      } else {
        this.optionsData.forEach(arr => {
          arr.isExhibit = true
        })
        this.exhibitList = JSON.parse(JSON.stringify(this.optionsData))
      }
    },
    debounce(fn, wait) {//输入框控制时间执行
      let timer = null
      return () => {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(fn, wait)
      };
    }

  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        let optionsData = JSON.parse(JSON.stringify(this.list))
        let setSelectedData = []
        // if(this.selectedList.length !=0){
        optionsData.forEach(arr => {
          arr.checked = false
          arr.isExhibit = true
          this.selectedList.forEach(element => {
            if (arr.id == element) {
              arr.checked = true
              setSelectedData.push(arr)
            }
          })
        })
        // }
        this.setSelectedData = setSelectedData
        this.optionsData = optionsData
        this.exhibitList = optionsData
      } else {
        this.multipleCode = null
      }
    },
  }
};
</script>
<style scoped lang='scss'>
// @import "~@/temp.scss";
.scroll {
  height: calc(100% - 164px);
}

p,
ul,
ol {
  line-height: inherit;
  padding: 0;
}

.options-page {
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
  // background: linear-gradient(
  //   90deg,
  //   rgba(14, 64, 123, 1) 0%,
  //   rgba(2, 87, 140, 1) 50%,
  //   rgba(14, 64, 123, 1) 100%
  // );
  background: #213361;
  z-index: 21;
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

.searchBox {
  // margin: .65rem 0;
  background-color: #ffffff;
  padding: 13px 16px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 11;

  .search {
    width: 100%;
    height: 35px;
    position: relative;

    img {
      width: 16px;
      position: absolute;
      top: 11px;
      left: 11px;
      color: #c0c4cc;
    }

    input {
      width: 100%;
      height: 35px;
      background-color: #f3f3f3;
      border-radius: 2px;
      padding: 8px 0 8px 32px;
    }
  }
}

.optionsList {
  width: 100%;
  margin-top: 16px;

  // height: calc(100% + 0.1rem);
  // height: calc(100% - 3rem);
  // overflow: scroll;
  .title {
    width: 100%;
    background-color: #ffffff;
    padding: 10px 16px;
    margin-bottom: 16px;
  }

  .options-bottom-div {
    background-color: #ffffff;
    line-height: 49px;
    padding: 0 16px;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    align-items: center;

    img {
      width: 16px;
      height: 16px;
      margin-right: 10px;
    }

    span {
      font-size: 14px;
      color: #303133;
      width: calc(100% - 26px);
    }
  }
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

  p {
    color: #606266;

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
</style>
