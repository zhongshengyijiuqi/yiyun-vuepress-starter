<template>
  <div class="demo">
    <div class="demo-option">
      <div class="demo-title"></div>
      <el-button @click="visible = true">点击打开层次模型</el-button>
      <yy-levelModel
        title="新版层次模型"
        :data="levelModels"
        :visible="visible"
        :isSingleCheck="false"
        :checkedIds="['44ZPFcvACBR']"
        :disabledIds="['44ZPFcvACBR', '44ZPJ4yQNpo']"
        :visibleNodeTypes="[2, 3, 4, 5]"
        :isNeedCheckAll="false"
        @close="visible = false"
        @confirm="visible = false"
      >
      </yy-levelModel>
    </div>
  </div>
</template>

<script>
import YyLevelModel from "./Main.vue";
export default {
  name: "index",
  components: { YyLevelModel },
  data() {
    return {
      visible: false,
      levelModels: [
        {
          id: "H~000000Wa",
          name: "技术工程中心",
          parentId: "3ztfmkoQ51R",
          type: 3,
        },
        { id: "H~000000WZ", name: "危化品", parentId: "3ztfmkoQ51R", type: 3 },
        {
          id: "H~000000WY",
          name: "铝盖辅料2",
          parentId: "3qBAhtrHccw",
          type: 5,
        },
        {
          id: "H~000000WX",
          name: "铝带辅料区",
          parentId: "3qBAbKPtuPV",
          type: 4,
        },
        {
          id: "H~000000WW",
          name: "模具暂存区",
          parentId: "3w5fmqnU6dV",
          type: 4,
        },
        {
          id: "H~000000WV",
          name: "铝盖冲压区",
          parentId: "3w5fmqnU6dV",
          type: 4,
        },
        {
          id: "H~000000WU",
          name: "铝盖滚花区",
          parentId: "3w5fmqnU6dV",
          type: 4,
        },
        {
          id: "H~000000WT",
          name: "冲压铝带暂存区",
          parentId: "3w5fmqnU6dV",
          type: 4,
        },
        {
          id: "H~000000WS",
          name: "冲压车间5",
          parentId: "H~000000Nj",
          type: 5,
        },
        {
          id: "H~000000WR",
          name: "冲压车间4",
          parentId: "H~000000Nj",
          type: 5,
        },
        {
          id: "H~000000WQ",
          name: "冲压车间3",
          parentId: "H~000000Nj",
          type: 5,
        },
        {
          id: "H~000000WP",
          name: "冲压车间2",
          parentId: "H~000000Nj",
          type: 5,
        },
        {
          id: "H~000000WO",
          name: "冲压车间1",
          parentId: "H~000000Nj",
          type: 5,
        },
        { id: "H~000000WN", name: "模具库", parentId: "3y3GpCNLKPM", type: 4 },
        {
          id: "H~000000WM",
          name: "亦云应用",
          parentId: "3qBATbRBRFd",
          type: 2,
        },
        { id: "H~000000T3", name: "电表9", parentId: "3qBAgNe2M6w", type: 5 },
        {
          id: "H~000000Nj",
          name: "冲压车间",
          parentId: "3y3GpCNLKPM",
          type: 4,
        },
        {
          id: "H~000000Ni",
          name: "铝带仓库区",
          parentId: "3w5fmqnU6dV",
          type: 4,
        },
        { id: "H~000000F0", name: "电表8", parentId: "3qBAgNe2M6w", type: 5 },
        { id: "H~000000Ez", name: "电表7", parentId: "3qBAgNe2M6w", type: 5 },
        { id: "H~000000Ey", name: "电表6", parentId: "3qBAgNe2M6w", type: 5 },
        { id: "H~000000Ex", name: "电表5", parentId: "3qBAgNe2M6w", type: 5 },
        { id: "458ePYqhD8T", name: "办公楼", parentId: "H~000000WM", type: 3 },
        {
          id: "3ztfmkoQ51R",
          name: "亦云平台",
          parentId: "3qBATbRBRFd",
          type: 2,
        },
        {
          id: "3y3GpCNLKPM",
          name: "二号厂房",
          parentId: "H~000000WM",
          type: 3,
        },
        {
          id: "3w5fmqnU6dV",
          name: "一号厂房",
          parentId: "H~000000WM",
          type: 3,
        },
        { id: "3r24QwSFMBm", name: "文谷", parentId: "3qBATbRBRFd", type: 2 },
        {
          id: "3qBAnkjo4Ph",
          name: "铝盖辅料1",
          parentId: "3qBAhtrHccw",
          type: 5,
        },
        { id: "3qBAmyjQMx3", name: "电表4", parentId: "3qBAgNe2M6w", type: 5 },
        { id: "3qBAmMnCn63", name: "电表3", parentId: "3qBAgNe2M6w", type: 5 },
        { id: "3qBAkfASTJ7", name: "电表2", parentId: "3qBAeudT2dd", type: 5 },
        { id: "3qBAk1qBYDV", name: "电表1", parentId: "3qBAeudT2dd", type: 5 },
        {
          id: "3qBAhtrHccw",
          name: "铝盖辅料区",
          parentId: "3qBAbKPtuPV",
          type: 4,
        },
        {
          id: "3qBAgNe2M6w",
          name: "配电间2",
          parentId: "3qBAZe6b3Bu",
          type: 4,
        },
        {
          id: "3qBAeudT2dd",
          name: "配电间1",
          parentId: "3qBAZe6b3Bu",
          type: 4,
        },
        {
          id: "3qBAbKPtuPV",
          name: "辅料仓库",
          parentId: "H~000000WM",
          type: 3,
        },
        { id: "3qBAZe6b3Bu", name: "配电房", parentId: "H~000000WM", type: 3 },
        { id: "3qBATbRBRFd", name: "文谷-浙江", parentId: "", type: 1 },
      ],
    };
  },

  methods: {

  },
};
</script>

<style lang="scss" scoped>
.demo {
  .demo-option {
    width: 260px;
    padding: 20px 0;
    .demo-title {
      margin-bottom: 10px;
    }
  }
}
</style>