# echarts配置项（v5.0.2）

## 折线图
<ClientOnly>
  <componentsWeb-echarts-linechart />
</ClientOnly>

```js
    const option = {
        color: ["rgba(176, 0, 229, 1)", "rgba(0, 103, 255, 1)"],
        title: {
          text: "图表标题",
          left: 30,
          top: 10,
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
          top: 13,
          right: 15,
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
          right: 20,
          bottom: 20,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              show: false,
            },
            axisTick: {
              lineStyle: {
                color: "#909399",
              },
            },
            axisLabel: {
              color: "#909399",
              fontSize: 12,
              padding: [5, 0, 0, 0],
            },
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月"],
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
            max: 350,
            interval: 70,
          },
        ],
        series: [
          {
            name: "线名称-1",
            type: "line",
            smooth: true,
            lineStyle: {
              width: 2,
            },
            symbol: "circle",
            symbolSize: 8,
            showSymbol: false,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(176, 0, 229, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(176, 0, 229, 0)",
                  },
                ],
              },
            },
            emphasis: {
              focus: "series",
            },
            data: [140, 232, 101, 264, 90, 340, 250],
          },
          {
            name: "线名称-2",
            type: "line",
            smooth: true,
            lineStyle: {
              width: 2,
            },
            symbol: "circle",
            symbolSize: 8,
            showSymbol: false,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(0, 103, 255, 1)",
                  },
                  {
                    offset: 1,
                    color: "rgba(0, 103, 255, 0)",
                  },
                ],
              },
            },
            emphasis: {
              focus: "series",
            },
            data: [120, 282, 10, 234, 20, 340, 310],
          },
        ],
      }
```

## 柱状图
<ClientOnly>
  <componentsWeb-echarts-barchart />
</ClientOnly>

```js
  const option = {
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
  }
```