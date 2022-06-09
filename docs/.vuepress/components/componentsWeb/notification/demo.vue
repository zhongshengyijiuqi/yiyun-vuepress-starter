<template>
  <div class="demo">
    <div class="demo-option">
      <div class="demo-title"></div>
      <yy-notification
        :width="500"
        :height="36"
        backgroundColor="rgba(3, 110, 213, 0.3)"
        :informations="['notification-1', 'notification-2', 'notification-3']"
      ></yy-notification>
    </div>
  </div>
</template>

<script>
import YyNotification from "./Main.vue";
export default {
  name: "index",
  components: { YyNotification },
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