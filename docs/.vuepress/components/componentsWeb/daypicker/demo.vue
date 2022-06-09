<template>
  <div class="demo">
    <div class="demo-option">
      <div class="demo-title">1.日期时间选择器</div>
      <yy-day-picker
        placeholder="日期时间选择器"
        :pickerValue="dayTimeValue"
        :disabledDate="disabledDate_DateTime"
        :clearable="true"
        :isNeedTime="true"
        @change="changeDayTime"
        @clear="clearDayTime"
      ></yy-day-picker>
    </div>
    <div class="demo-option">
      <div class="demo-title">2.日期选择器</div>
      <yy-day-picker
        placeholder="日期时间选择器"
        :pickerValue="dayTimeValue"
        :disabledDate="disabledDate_DateTime"
        :clearable="true"
        :isNeedTime="false"
        @change="changeDayTime"
        @clear="clearDayTime"
      ></yy-day-picker>
    </div>
  </div>
</template>

<script>
import YyDayPicker from "./Main.vue";
export default {
  name: "index",
  components: { YyDayPicker },
  data() {
    return {
      dayTimeValue: "",
    };
  },

  methods: {
    disabledDate_DateTime(currentDate) {
      return (
        new Date(currentDate).getTime() < new Date("2021/1/1").getTime() ||
        new Date(currentDate).getTime() >= new Date("2022/1/1 1:00").getTime()
      );
    },
    changeDayTime(timestamp) {
      this.dayTimeValue = timestamp;
    },
    clearDayTime() {
      this.dayTimeValue = "";
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