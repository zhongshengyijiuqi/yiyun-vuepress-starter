所有时间选择器统一使用时间戳（毫秒级ms）进行通信，若初始没有值，则传空字符串（""）
### 年份选择器

<ClientOnly>
  <componentsWeb-yearpicker-demo />
</ClientOnly>
<!-- ![年份选择器](./images/year-picker.png) -->

#### 引入使用
```html
  <yy-year-picker
    placeholder="年份选择器"
    :pickerValue="yearValue"
    :disabledDate="disabledDate_Year"
    @change="changeYear"
    @clear="clearYear"
  ></yy-year-picker>
```

#### 传入数据
```js
export default {
  data() {
    return {
      yearValue: "",
    };
  },
  methods:{
    disabledDate_Year(currentDate) {
      return (
        new Date(currentDate).getTime() < new Date("2010/1/1").getTime() ||
        new Date(currentDate).getTime() > new Date("2038/1/1").getTime()
      );
    },
    changeYear(timestamp){
      console.log(timestamp);
      this.yearValue = timestamp;
    },
    clearYear(){
      this.yearValue = "";
    },
  }
};
```

#### 参数说明
| 参数            | 说明          | 类型    | 默认值   |
| --------------- | ------------- | ------- | -------  |
| placeholder     | 选择器提示文字 | String  | 选择年月 |
| pickerValue     | 时间选择器值   | String / Number | ""  |
| disabledDate    | 需要禁用的日期 | Function | function() { return false }  |
| clearable       | 是否可清除选中值 | Boolean | true   |

#### 事件
| 参数            | 说明                    |
| --------------- | ----------------------- |
| change          | 确认选定的值时触发，返回时间戳（毫秒级ms）  |
| clear           | 清空选中值  |

### 月份选择器

<ClientOnly>
  <componentsWeb-monthpicker-demo />
</ClientOnly>
<!-- ![月份选择器](./images/month-picker.png) -->

#### 引入使用
```html
  <yy-month-picker
    placeholder="月份选择器"
    :pickerValue="monthValue"
    :disabledDate="disabledDate_Month"
    @change="changeMonth"
    @clear="clearMonth"
  ></yy-month-picker>
```

#### 传入数据
```js
export default {
  data() {
    return {
        monthValue: "",
    };
  },
  methods:{
    disabledDate_Month(currentDate) {
      return new Date(currentDate).getTime() < new Date("2021/1/1").getTime();
    },
    changeMonth(timestamp) {
      console.log(timestamp);
      this.monthValue = timestamp;
    },
    clearMonth(){
      this.monthValue = "";
    },
  }
};
```

#### 参数说明
| 参数            | 说明          | 类型    | 默认值   |
| --------------- | ------------- | ------- | -------  |
| placeholder     | 选择器提示文字 | String  | 选择年月 |
| pickerValue     | 时间选择器值   | String / Number | ""  |
| disabledDate    | 需要禁用的日期 | Function | function() { return false }  |
| clearable       | 是否可清除选中值 | Boolean | true   |


#### 事件
| 参数            | 说明                    |
| --------------- | ----------------------- |
| change          | 确认选定的值时触发，返回时间戳（毫秒级ms）  |
| clear           | 清空选中值  |

### 日期选择器

<ClientOnly>
  <componentsWeb-daypicker-demo />
</ClientOnly>

<!-- ![日期选择器](./images/day-picker.png) -->

#### 引入使用
```html
  <yy-day-picker
    placeholder="日期时间选择器"
    :pickerValue="dayTimeValue"
    :disabledDate="disabledDate_DateTime"
    :isNeedTime="true"
    @change="changeDayTime"
    @clear="clearDayTime"
  ></yy-day-picker>
```

#### 传入数据
```js
export default {
  data() {
    return {
      dayTimeValue: "",
    };
  },
  methods:{
    disabledDate_DateTime(currentDate) {
      return (
        new Date(currentDate).getTime() < new Date("2021/1/1").getTime() ||
        new Date(currentDate).getTime() >= new Date("2022/1/1 1:00").getTime()
      );
    },
    changeDayTime(timestamp) {
      console.log(timestamp);
      this.dayValue = timestamp;
    },
    changeDayTime() {
      this.dayValue = "";
    },
  }
};
```

#### 参数说明
| 参数            | 说明          | 类型    | 默认值   |
| --------------- | ------------- | ------- | -------  |
| placeholder     | 选择器提示文字 | String  | 选择日期 |
| pickerValue     | 时间选择器值   | String / Number | ""  |
| disabledDate    | 需要禁用的日期 | Function | function() { return false }  |
| isNeedTime      | 是否需要设置时间 | Boolean | false  |
| clearable       | 是否可清除选中值 | Boolean | true   |


#### 事件
| 参数            | 说明                    |
| --------------- | ----------------------- |
| change          | 确认选定的值时触发，返回时间戳（毫秒级ms）  |
| clear           | 清空选中值  |