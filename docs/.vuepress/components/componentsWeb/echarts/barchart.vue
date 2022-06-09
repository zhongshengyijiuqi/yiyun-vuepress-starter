<template>
  <div class="chart-bar" ref="chart-bar"></div>
</template>

<script>
export default {
  name: "barchart",
  data() {
    return {
      option: {
        color: ["#1CBE8B", "#F7B500"],
        title: {
          text: "图表标题",
          left: 20,
          top: 0,
          textStyle: {
            color: "#303133",
            fontWeight: 600,
            fontSize: 16,
          },
        },
        legend: {
          icon: "rect",
          itemHeight: 2,
          itemWidth: 10,
          top: 0,
          right: 20,
          textStyle: {
            color: "#909399",
          },
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            let result = "";
            params.forEach(function (item) {
              result += `<div style="display:flex;align-items:center">${item.marker} <div style="font-size: 10px;color: #303133;text-shadow: 0px 2px 6px rgba(10, 46, 99, 0.3);">${item.seriesName}</div> : <div style="padding-left:13px;font-size: 10px;color: #0067FF;">${item.value}</div></div>`;
            });
            return result;
          },
        },
        grid: {
          left: 40,
          right: 25,
          bottom: 20,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
            axisPointer: {
              type: "shadow",
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              alignWithLabel: true,
              lineStyle: {
                color: "#909399",
              },
            },
            axisLabel: {
              color: "#909399",
              fontSize: 12,
              padding: [5, 0, 0, 0],
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              color: "#909399",
              fontSize: 12,
            },
            splitLine: {
              lineStyle: {
                color: "#DCDFE6",
                type: "dashed",
              },
            },
            max: 100,
            interval: 20,
          },
        ],
        // dataZoom: {
        //   type: 'inside',
        //   start: 1,
        //   end: 50
        // },
        series: [
          {
            name: "柱名称-1",
            type: "bar",
            data: [10, 20, 30, 40, 50, 60, 70],
            itemStyle: {
              borderRadius: [6, 6, 0, 0],
            },
            barWidth: 16,
          },
          {
            name: "柱名称-2",
            type: "bar",
            data: [10, 20, 30, 40, 50, 60, 70],
            itemStyle: {
              borderRadius: [6, 6, 0, 0],
            },
            barWidth: 16,
          },
        ],
      },
    };
  },
  mounted() {
    const chart = this.$echarts.init(this.$refs["chart-bar"]);
    chart.setOption(this.option);
  },
};
</script>

<style lang="scss" scoped>
.chart-bar {
  height: 300px;
  width: 700px;
}
</style>