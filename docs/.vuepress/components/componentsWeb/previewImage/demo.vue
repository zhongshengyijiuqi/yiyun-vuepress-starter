<template>
  <div class="demo">
    <div class="demo-option">
      <div class="demo-container">
        <el-button
          @click="
            previewImage({
              images: [
                'https://img0.baidu.com/it/u=3436810468,4123553368&fm=26&fmt=auto',
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.adquan.com%2Fuploads_img%2Fynwv01547105064.jpg&refer=http%3A%2F%2Ffile.adquan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635211538&t=9e019be02c5cfca81300e04ebcc8cbfc',
              ],
              currentIndex: 1,
            })
          "
          >预览多张图片</el-button
        >
        <el-button
          @click="
            previewImage({
              images: [
                'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Ffile.adquan.com%2Fuploads_img%2Fynwv01547105064.jpg&refer=http%3A%2F%2Ffile.adquan.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1635211538&t=9e019be02c5cfca81300e04ebcc8cbfc',
              ],
              currentIndex: 0,
            })
          "
          >预览单张图片</el-button
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
    previewImage({ images = [], currentIndex = 0 }) {
      let _images = images,
        _currentIndex = currentIndex;
      const imagePreviewMaskLayer = document.createElement("div");
      imagePreviewMaskLayer.setAttribute("id", "image-preview-mask-layer");
      imagePreviewMaskLayer.setAttribute("class", "image-preview-mask-layer");
      imagePreviewMaskLayer.setAttribute(
        "style",
        `position: fixed; 
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 888888;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: auto;`
      );
      const imageContainer = `<div
    id="preview-btn-close"
    class="preview-btn-close"
    style="
      position: fixed;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      top: 40px;
      right: 40px;
      width: 40px;
      height: 40px;
      background-color: #606266;
      opacity: 0.8;
    "
  >
    <img src="${require("./images/close.png")}" alt="" />
  </div>
  <div class="image-viewer-container">
    <div
        id="preview-btn-prev"
      class="preview-btn-prev"
      style="
        position: fixed;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        top: 50%;
        left: 40px;
        width: 40px;
        height: 40px;
        background-color: #606266;
        opacity: 0.8;
        ${_images.length > 1 ? "" : "display:none"}
      "
    >
      <img src="${require("./images/arrow-left.png")}" alt="" />
    </div>
    <img id="preview-image" style="width:600px" src="${
      _images[_currentIndex]
    }" alt="">
    <div
    id="preview-btn-next"
      class="preview-btn-next"
      style="
        position: fixed;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        top: 50%;
        right: 40px;
        width: 40px;
        height: 40px;
        background-color: #606266;
        opacity: 0.8;
        ${_images.length > 1 ? "" : "display:none"}
      "
    >
      <img src="${require("./images/arrow-right.png")}" alt="" />
    </div>
  </div>`;
      imagePreviewMaskLayer.innerHTML = imageContainer;
      document.body.appendChild(imagePreviewMaskLayer);
      const Preview_close =
        imagePreviewMaskLayer.querySelector("#preview-btn-close");
      const Preview_prev =
        imagePreviewMaskLayer.querySelector("#preview-btn-prev");
      const Preview_next =
        imagePreviewMaskLayer.querySelector("#preview-btn-next");
      const Preview_image =
        imagePreviewMaskLayer.querySelector("#preview-image");
      Preview_close.addEventListener("click", closeImagePreviewMaskLayer);
      Preview_prev.addEventListener("click", toPrevImage);
      Preview_next.addEventListener("click", toNextImage);
      function closeImagePreviewMaskLayer() {
        document.body.removeChild(imagePreviewMaskLayer);
      }
      function toPrevImage() {
        if (_currentIndex === 0) {
          _currentIndex = _images.length;
        }
        _currentIndex--;
        Preview_image.src = _images[_currentIndex];
      }
      function toNextImage() {
        if (_currentIndex === _images.length - 1) {
          _currentIndex = -1;
        }
        _currentIndex++;
        Preview_image.src = _images[_currentIndex];
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