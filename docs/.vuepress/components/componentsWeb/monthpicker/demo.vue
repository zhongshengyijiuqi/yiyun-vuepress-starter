<template>
  <div class="demo">
    <div class="demo-option">
      <div class="demo-title">1.可清空</div>
      <yy-month-picker
        placeholder="月份选择器"
        :pickerValue="monthValue"
        :disabledDate="disabledDate_Month"
        :clearable="true"
        @change="changeMonth"
        @clear="clearMonth"
      ></yy-month-picker>
    </div>
    <div class="demo-option">
      <div class="demo-title">2.不可清空</div>
      <yy-month-picker
        placeholder="月份选择器"
        :pickerValue="monthValue"
        :disabledDate="disabledDate_Month"
        :clearable="false"
        @change="changeMonth"
        @clear="clearMonth"
      ></yy-month-picker>
    </div>
  </div>
</template>

<script>
import YyMonthPicker from "./Main.vue";
export default {
  name: "index",
  components: { YyMonthPicker },
  data() {
    return {
      monthValue: "",
    };
  },

  methods: {
    disabledDate_Month(currentDate) {
      return new Date(currentDate).getTime() < new Date("2021/1/1").getTime();
    },
    changeMonth(timestamp) {
      this.monthValue = timestamp;
    },
    clearMonth() {
      this.monthValue = "";
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