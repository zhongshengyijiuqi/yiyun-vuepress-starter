<template>
  <div class="demo">
    <div class="mobile-content">
      <div class="other-not">
        <div class="time-picker">
          <time-picker :dialogVisible="true" timeType="year" :timeData="timeDataYear" @submit="submitYear">
          </time-picker>
        </div>
        <div class="time-picker">
          <time-picker :dialogVisible="true" timeType="month" :timeData="timeDataMonth" @submit="submitMonth">
          </time-picker>
        </div>
        <div class="time-picker">
          <time-picker :dialogVisible="true" timeType="datetime" :timeData="timeDataDatetime" @submit="submitDatetime">
          </time-picker>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import timePicker from "./Main.vue";
export default {
  name: "index",
  components: { timePicker },
  data() {
    return {
      dialogVisible: false,
      timeDataYear: [],
      timeDataMonth: [],
      timeDataDatetime: [],
    };
  },

  methods: {
    btn() {
      this.dialogVisible = true
    },
    cancel() {
      this.dialogVisible = false
    },
    submitYear(item) {
      console.log(item)
      // this.timeDataYear = [item.year]
    },
    submitMonth(item) {
      console.log(item)
      // this.timeDataMonth = [item.year, item.month]
    },
    submitDatetime(item) {
      console.log(item)
      // this.timeDataDatetime = [item.year, item.month, item.day]
    },
  },
};
</script>

<style lang="scss" scoped>
.demo {
  .mobile-content {
    width: 375px;
    // height: 667px;
    // position: relative;
    // z-index: 9;
    // top: 10%;
    margin: 0 auto;
    // background: url('./images/icon.png');
    // background-repeat: no-repeat;
    // background-position: center;
    // background-size: auto 100%;

    .other-not {
      // position: absolute;
      // width: calc(100% - 80px);
      // top: 124px;
      // left: 39px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .time-picker {

        width: 100%;
        padding: 16px 16px 0;

      }
    }
  }


}
</style>