<!--空白页-->
<template>
  <div class="blankPage">
    <div v-if="(!searchCode && !isSearch) || (!searchCode && isSearch)" class="blank" blank="1">
      <slot>
        <img :src="blankImg" alt="1">
        <span>{{ blankName }}</span>
      </slot>
    </div>
    <div v-else-if="(searchCode && isSearch) || (searchCode && !isSearch)" class="blank" blank="2">
      <slot>
        <img :src="blankSearchImg" alt="">
        <span>抱歉！</span>
        <p>没有搜索到“{{ searchCode }}”相关内容</p>
      </slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "BlankPage",
  props: {
    isSearch: {//是否显示搜索空白页
      type: Boolean,
      default: false
    },
    searchCode: {
      type: String,
      default: ''
    },
    blankImg: {
      type: String,
      default: 'https://dl-yiyunappclient.effio.cn/resource/common/empty_data.png'
    },
    blankSearchImg: {
      type: String,
      default: 'https://dl-yiyunappclient.effio.cn/resource/common/empty_search.png'
    },
    blankName: {
      type: String,
      default: '暂无数据'
    },
  },
  data() {
    return {};
  },
  mounted() { },
  methods: {},
  computed: {},
  watch: {}
};
</script>
<style lang="scss" scoped>
//空白页
.blankPage {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.blank {
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0;

  img {
    width: 5.6rem;
    height: 5.6rem;
    margin-bottom: 0.3rem;
  }

  span {
    color: #303133;
    font-size: 0.6rem;
    margin-bottom: 0.3rem;
  }

  p {
    color: #909399;
    font-size: 0.6rem;
    width: 80%;
    text-align: center;
    word-break: normal;
    word-break: break-all;
  }
}
</style>