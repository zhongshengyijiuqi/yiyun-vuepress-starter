<template>
  <div class="demo">
    <el-button type="primary" @click="btn">点击查看</el-button>
    <div class="mobile" v-if="dialogVisible">
      <div class="mask-layer" @click="dialogVisible = false"></div>
      <div class="mobile-content">
        <div class="blank-page">
          <blank-page :isSearch="false" searchCode="">
            <!-- <template>
        <div>111</div>
      </template> -->
          </blank-page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import blankPage from "./Main.vue";
export default {
  name: "index",
  components: { blankPage },
  data() {
    return {
      dialogVisible: false
    };
  },

  methods: {
    btn() {
      this.dialogVisible = true
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {}

.mobile {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3000;

  .mask-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #000000;
    opacity: 0.3;
    z-index: 1;
  }

  .mobile-content {
    width: 375px;
    height: 667px;
    position: relative;
    z-index: 9;
    top: 10%;
    margin: 0 auto;
    background: url('./images/icon.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: auto 100%;

    .blank-page {
      width: 100%;
      height: 100%;
    }
  }
}
</style>