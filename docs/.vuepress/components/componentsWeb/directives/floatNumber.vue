<template>
  <div class="floatNumber">
    <el-input
      type="text"
      maxlength="10"
      v-model="number"
      v-floatNumber="2"
      show-word-limit
    ></el-input>
    <el-input
      type="text"
      maxlength="11"
      v-model="number1"
      v-floatNumber="3"
      show-word-limit
      style="margin-top:10px"
    ></el-input>
  </div>
</template>

<script>
export default {
  name: "floatNumber",
  data() {
    return {
      number: "",
      number1: "",
    };
  },
  created() {

  },
};
</script>

<style lang="scss" scoped>
</style>