<template>
  <div class="demo">
    <el-button type="primary" @click="btn">上传</el-button>
    <div class="mobile" v-if="dialogVisible">
      <div class="mask-layer" @click="cancel"></div>
      <div class="mobile-content">
        <div class="other-not">
          <div class="add-img">
            <div class="add-content">
              <span> 上传图片</span>
              <upload class="add-upload" :list="imgList" @change="imgChange" :limist="20" :complex="false"
                accepts="image" :num="10" />
            </div>
            <div class="ul">
              <div class="li" v-for="(item, index) in imgList" :key="index">
                <img :src="item.src" alt="" @click="imgList.splice(index, 1)">
              </div>
            </div>
          </div>
          <div class="add-img">
            <div class="add-content">
              <span> 上传文件</span>
              <upload class="add-upload" :list="applicationList" @change="applicationChange" :limist="20"
                :complex="false" accepts="application" :num="10" />
            </div>
            <div class="ul">
              <div class="li1" v-for="(item, index) in applicationList" :key="index">
                <span @click="applicationList.splice(index, 1)">{{ item.name }}</span>
              </div>
            </div>
          </div>
          <div class="add-img">
            <div class="add-content">
              <span> 上传视频</span>
              <upload class="add-upload" :list="videoList" @change="videoChange" :limist="20" :complex="false"
                accepts="video" :num="1" />
            </div>
            <div class="ul">
              <div class="li2" v-for="(item, index) in videoList" :key="index">
                <video :src="item.src" controls="controls">
                  浏览器不支持“视频”标签。</video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import upload from "./Main.vue";
export default {
  name: "index",
  components: { upload },
  data() {
    return {
      //上传
      imgList: [],
      applicationList: [],
      videoList: [],
      dialogVisible: false
    };
  },

  methods: {
    btn() {
      this.dialogVisible = true
    },
    cancel() {
      this.dialogVisible = false
      this.imgList = []
      this.applicationList = []
      this.videoList = []
    },
    async imgChange(imgList) {
      try {
        console.log(imgList)
        // for (let i = 0; i < imgList.length; i++) {
        //   let res = await this.$compressImage(imgList[i].file)
        //   if (res.base64) {
        //     imgList[i].src = res.base64
        //     imgList[i].file = res.file
        //   }
        // }
        this.imgList = imgList;
      } catch (error) {
        console.log(error)
      }

    },
    async applicationChange(imgList) {
      try {
        console.log(imgList)
        this.applicationList = imgList;
      } catch (error) {
        console.log(error)
      }

    },
    async videoChange(imgList) {
      try {
        console.log(imgList)
        this.videoList = imgList;
      } catch (error) {
        console.log(error)
      }

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

      .other-not {
        position: absolute;
        width: calc(100% - 80px);
        top: 124px;
        left: 39px;
        display: flex;
        align-items: center;
        flex-direction: column;

        .add-img {
          display: flex;
          flex-direction: column;
          width: 100%;
          padding: 16px 16px 0;

          .add-content {
            position: relative;
            display: flex;
            margin-bottom: 10px;

            span {
              cursor: pointer;
              color: #1E6DE5;
            }

            .add-upload {
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 9;
            }
          }

          .ul {
            display: flex;
            align-items: center;

            .li {
              width: 40px;
              height: 40px;
              margin-right: 5px;
              position: relative;

              p {
                width: 10px;
                height: 12px;
                text-align: center;
                line-height: 10px;
                position: absolute;
                top: 0;
                right: 0;
                background-color: #000000;
                opacity: 0.6;
                color: #ffffff;
                z-index: 9;
                font-size: 12px;
              }

              img {
                object-fit: cover;
                width: 40px;
                height: 40px;
                border-radius: 2px;
              }
            }

            .li1 {
              width: 100%;
            }

            .li2 {
              width: 100%;

              video {
                width: 100%;
              }
            }
          }

        }
      }
    }
  }


}
</style>