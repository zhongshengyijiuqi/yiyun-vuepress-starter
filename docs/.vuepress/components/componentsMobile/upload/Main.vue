<template>
  <div class="upload-box">
    <input class="upload-input" type="file" accept="image/*" @change="fileUpload" multiple
      v-if="accepts == 'image' && !complex && !captureCamera" title="" />
    <input class="upload-input" type="file" accept="image/*" @change="fileUpload"
      v-if="accepts == 'image' && complex && !captureCamera" title="" />
    <input class="upload-input" type="file" accept="image/*" :capture="captureCamera" @change="fileUpload" multiple
      v-if="accepts == 'image' && !complex && captureCamera" title="" />
    <input class="upload-input" type="file" accept="image/*" :capture="captureCamera" @change="fileUpload"
      v-if="accepts == 'image' && complex && captureCamera" title="" />

    <input class="upload-input" type="file" @change="fileUpload" multiple v-if="accepts == 'attApplication' && !complex"
      title="" />
    <input class="upload-input" type="file" @change="fileUpload" v-if="accepts == 'attApplication' && complex"
      title="" />

    <input class="upload-input" type="file" accept=".xls,.xlsx,.docx,.doc,.pdf,.ppt,.pptx" @change="fileUpload" multiple
      v-if="accepts == 'application' && !complex" title="" />
    <input class="upload-input" type="file" accept=".xls,.xlsx,.docx,.doc,.pdf,.ppt,.pptx" @change="fileUpload"
      v-if="accepts == 'application' && complex" title="" />

    <input class="upload-input" type="file" accept="video/mp4" @change="fileUpload" multiple
      v-if="accepts == 'video' && !complex" title="" />
    <input class="upload-input" type="file" accept="video/mp4" @change="fileUpload" v-if="accepts == 'video' && complex"
      title="" />
    <!-- <div class="upload-img-item" ref="upload" id="upload" style="display:none">
        <ul>
          <li v-for="(item,index) in imgListData" :key="index"> 
            <img :src="item" alt="" >
          </li>
        </ul>
        <canvas class="canvas" id="canvas" ></canvas>
      </div> -->
  </div>
</template>

<script>
export default {
  name: "upload",
  props: {
    list: {
      type: Array,
      default() {
        return [];
      }
    },
    accepts: {//上传文件类型 image 图片类型 ，application doc.docx.ppt.pptx.xlsx.xls.pdf文件类型,video MP4视频文件类型 ,attApplication 图片 文件都可以传
      type: String,
      default: 'image'
    },
    num: {//图片限制条数
      type: Number,
      default: 3
    },
    complex: {//选中标识，true为单选false多选
      type: Boolean,
      default: true,
    },
    distinguish: {//区分标识  每一个上传事件只存一张图 true为存多张，false为存单张
      type: Boolean,
      default: false
    },
    limist: {//图片大小限制 最大10
      type: Number,
      default: 2
    },
    imgName: {//文件名称字数
      type: Number,
      default: 20
    },
    captureCamera: {//capture属性
      type: String,
      default: ''
    },
  },
  data() {
    return {
      imgList: [],
      imgListData: [],
      imgData: '',
      imagesData: '',
      fileData: ''
    };
  },
  components: {},
  mounted() {

  },
  methods: {
    removeImg(item) {
      this.imgList = this.imgList.filter(img => {
        return item.id !== img.id;
      });
      this.$emit("change", this.imgList);
    },
    applicationFun(file) {
      let Osplit = file.name.split('.')
      let Otype = Osplit[Osplit.length - 1]
      if (Otype == 'xlsx' || Otype == 'docx' || Otype == 'doc' || Otype == 'pdf' || Otype == 'xls' || Otype == 'ppt' || Otype == 'pptx') {
        return true
      }
    },
    attApplicationFun(file) {
      if (file.type == 'application/msword' || file.type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.type == 'application/vnd.openxmlformats-officedocument.presentationml.presentation' || file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        || file.type == 'application/vnd.ms-powerpoint' || file.type == 'application/vnd.ms-excel' || file.type == 'application/pdf' || file.type == 'image/png' || file.type == 'image/jpeg') {
        return true
      }
    },
    videoFun(file) {
      if (file.type == 'video/mp4') {
        return true
      }
    },
    async fileUpload(e) {
      try {
        if (!this.distinguish) {
          this.imgList = []
        }
        // this.imgListData = []
        if (e.target.files.length == 1) {
          let file = e.target.files[0];
          const isLt1M = (file.size / 1024 / 1024) < this.limist;
          console.log(isLt1M)
          if (this.accepts == 'application') {
            if (this.applicationFun(file)) {
              if (file.name.split('.').slice(0, -1).join('').length > this.imgName) {
                this.$toast(`上传文件名不能超过${this.imgName}字符`);
                e.target.value = "";
                return;
              }
            } else {
              this.$toast(`上传文件格式不正确`);
              e.target.value = "";
              return;
            }
          }
          if (this.accepts == 'attApplication') {
            if (this.attApplicationFun(file)) {
              if (file.name.split('.').slice(0, -1).join('').length > this.imgName) {
                this.$toast(`上传文件名不能超过${this.imgName}字符`);
                e.target.value = "";
                return;
              }
            } else {
              this.$toast(`上传文件格式不正确`);
              e.target.value = "";
              return;
            }
          }
          if (this.accepts == 'video') {
            if (this.videoFun(file)) {
              if (file.name.split('.').slice(0, -1).join('').length > this.imgName) {
                this.$toast(`上传文件名不能超过${this.imgName}字符`);
                e.target.value = "";
                return;
              }
            } else {
              this.$toast(`上传文件格式不正确`);
              e.target.value = "";
              return;
            }
          }
          if (!isLt1M) {
            this.$toast(`上传文件大小不能超过${this.limist}M!`);
            e.target.value = "";
            return;
          }
          if (this.imgList.length >= this.num) {
            this.$toast(`上传文件数量不能超过${this.num}个`);
            e.target.value = "";
          } else {
            let fileReader = await this.readasbase64(file)
            this.imgList.push({
              src: fileReader.result,
              file: file,
              id: '',
              size: file.size,
              name: file.name
            });
            e.target.value = "";
          }
        } else if (e.target.files.length > 1) {
          let file = e.target.files;
          for (let i = 0; i < file.length; i++) {
            if ((file[i].size / 1024 / 1024) > this.limist) {
              this.$toast(`上传大小大小不能超过${this.limist}M!`);
              e.target.value = "";
              return;
            }
            if (this.accepts == 'application') {
              if (this.applicationFun(file[i])) {
                if (file[i].name.split('.').slice(0, -1).join('').length > this.imgName) {
                  this.$toast(`第${i}个文件名不能超过${this.imgName}字符`);
                  e.target.value = "";
                  return;
                }
              } else {
                this.$toast(`上传文件格式不正确`);
                e.target.value = "";
                return;
              }
            }
            if (this.accepts == 'attApplication') {
              if (this.attApplicationFun(file)) {
                if (file.name.split('.').slice(0, -1).join('').length > this.imgName) {
                  this.$toast(`上传文件名不能超过${this.imgName}字符`);
                  e.target.value = "";
                  return;
                }
              } else {
                this.$toast(`上传文件格式不正确`);
                e.target.value = "";
                return;
              }
            }
            if (this.accepts == 'video') {
              if (this.videoFun(file[i])) {
                if (file[i].name.split('.').slice(0, -1).join('').length > this.imgName) {
                  this.$toast(`上传文件名不能超过${this.imgName}字符`);
                  e.target.value = "";
                  return;
                }
              } else {
                this.$toast(`上传文件格式不正确`);
                e.target.value = "";
                return;
              }
            }
          }
          if (this.imgList.length + e.target.files.length > this.num) {
            this.$toast(`上传文件数量不能超过${this.num}个`);
            e.target.value = "";
          } else {
            for (let i = 0; i < file.length; i++) {
              let files = file[i];
              let fileReader = await this.readasbase64(files)
              this.imgList.push({
                src: fileReader.result,
                file: files,
                id: '',
                size: files.size,
                name: files.name
              });
            }
            e.target.value = "";
          }
        }
        this.$emit("change", this.imgList);
      } catch (error) {
        console.log('图片上传', error)
      }
    },
    readasbase64(file) {
      return new Promise(function (resolve, reject) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
          resolve(fileReader)
        };
        fileReader.readAsDataURL(file);
      })
    }

  },

  watch: {
    list: {
      handler(v) {
        this.imgList = v;
      },
      immediate: true,
      deep: true
    },
  }
};
</script>

<style scoped lang="scss">
.upload-box {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 9;
}

.upload-exhibition::-webkit-scrollbar {
  width: 0 !important;
}

.upload-input {
  opacity: 0;
  width: 100%;
  height: 100%;
}
</style>
