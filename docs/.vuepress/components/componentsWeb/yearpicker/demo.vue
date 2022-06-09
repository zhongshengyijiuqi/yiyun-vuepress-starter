<template>
  <div class="demo">
    <div class="demo-option">
      <div class="demo-title"></div>
      <yy-year-picker
        placeholder="年份选择器"
        :pickerValue="yearValue"
        :disabledDate="disabledDate_Year"
        :clearable="false"
        @change="changeYear"
        @clear="clearYear"
      ></yy-year-picker>
    </div>
  </div>
</template>

<script>
import YyYearPicker from "./Main.vue";
export default {
  name: "index",
  components: { YyYearPicker },
  data() {
    return {
      yearValue: "",
    };
  },

  methods: {
    disabledDate_Year(currentDate) {
      return (
        new Date(currentDate).getTime() < new Date("2010/1/1").getTime() ||
        new Date(currentDate).getTime() > new Date("2038/1/1").getTime()
      );
    },
    changeYear(timestamp) {
      this.yearValue = timestamp;
    },
    clearYear() {
      this.yearValue = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
    .demo-option {
        width: 260px;
        padding: 20px 0;
        .demo-title {
            margin-bottom:10px
        }
    }
}
</style>