<template>
  <div class="demo">
    <el-button type="primary" @click="btn">列表选择</el-button>
    <div class="mobile" v-show="dialogVisible">
      <div class="mask-layer" @click="dialogVisible = false"></div>
      <div class="mobile-content">
        <div class="other-not">
          <optionsPageCheckbox :dialogVisible="dialogVisible" :isOption="true" :list="multipleData"
            :title="'选项isOption：true多选反之单选'" :searchTime="1000" :selectedList="selectedList" @confirm="confirm"
            @cancel="cancel">
            <!-- <template slot-scope="data">
        <div>111{{data}}</div>
      </template> -->
          </optionsPageCheckbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import optionsPageCheckbox from "./Main.vue";
export default {
  name: "index",
  components: { optionsPageCheckbox },
  data() {
    return {
      //多项选择
      dialogVisible: false,
      multipleData: [
        {
          id: 1,
          name: '测试001',
          checked: false
        }, {
          id: 2,
          name: '测试002',
          checked: false
        }, {
          id: 3,
          name: '测试003',
          checked: false
        },
      ],
      selectedList: [1, 3],
    };
  },

  methods: {
    btn() {
      this.dialogVisible = true
    },

    confirm(item) {
      console.log(item)
      this.selectedList = item.map(arr => { return arr.id })
      this.dialogVisible = false
    },
    cancel() {
      this.dialogVisible = false
    },

  },
};
</script>

<style lang="scss" scoped>
.demo {
  .mobile {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;

    .mask-layer {
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: #000000;
      opacity: 0.3;
      z-index: 1;
    }

    .mobile-content {
      width: 455px;
      height: 834px;
      position: relative;
      z-index: 9;
      top: 3%;
      margin: 0 auto;
      background: url('./images/icon.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: auto 100%;

      .other-not {
        position: absolute;
        width: calc(100% - 80px);
        top: 91px;
        left: 40px;
        height: calc(100% - 180px);
      }
    }
  }


}
</style>