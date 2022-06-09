<template>
  <div class="demo">
    <div class="demo-option">
      <div class="demo-container">
        <el-button
          @click="
            previewOffice(
              'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258481275.doc'
            )
          "
          >预览doc</el-button
        >
        <el-button
          @click="
            previewOffice(
              'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258485689.docx'
            )
          "
          >预览docx</el-button
        >
        <el-button
          @click="
            previewOffice(
              'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258426666.xls'
            )
          "
          >预览xls</el-button
        >
        <el-button
          @click="
            previewOffice(
              'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258434014.xlsx'
            )
          "
          >预览xlsx</el-button
        >
        <el-button
          @click="
            previewOffice(
              'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258463291.ppt'
            )
          "
          >预览ppt</el-button
        >
        <el-button
          @click="
            previewOffice(
              'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258468365.pptx'
            )
          "
          >预览pptx</el-button
        >
        <el-button
          @click="
            previewOffice(
              'https://dl-platform.effio.cn/3eCv1dMQ9v7/platform-app-inspect/1617258451264.pdf'
            )
          "
          >预览pdf</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },

  methods: {
    getFileType(fileUrl) {
      let splitArr = fileUrl.split(".");
      return splitArr[splitArr.length - 1];
    },
    previewOffice(fileUrl) {
      const fileType = this.getFileType(fileUrl);
      switch (fileType) {
        case "doc":
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`
          );
          break;
        case "docx":
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`
          );
          break;
        case "xls":
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`
          );
          break;
        case "xlsx":
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`
          );
          break;
        case "ppt":
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`
          );
          break;
        case "pptx":
          window.open(
            `https://view.officeapps.live.com/op/view.aspx?src=${fileUrl}`
          );
          break;
        case "pdf":
          window.open(fileUrl);
          break;
        case "png":
          window.open(fileUrl);
          break;
        case "jpg":
          window.open(fileUrl);
          break;
        case "jpeg":
          window.open(fileUrl);
          break;
        default:
          window.open(fileUrl);
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  .demo-option {
    width: 100%;
    padding: 20px 0;
    .demo-title {
      margin-bottom: 10px;
    }
    .demo-container {
      display: flex;
      flex-wrap: wrap;
    }
  }
}
</style>