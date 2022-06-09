<template>
  <div class="demo">
    <el-cascader v-model="pcr" :options="pcrList" :props="{ value: 'name', label: 'name', checkStrictly: true }"
      clearable>
    </el-cascader>
  </div>
</template>

<script>
import level from './level.json'
const pcrList = level
export default {
  name: "index",
  components: {},
  data() {
    return {
      pcrList: pcrList,
      pcr: [],
    };
  },
  created() {
    this.batchManageFun()
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.demo {}
</style>