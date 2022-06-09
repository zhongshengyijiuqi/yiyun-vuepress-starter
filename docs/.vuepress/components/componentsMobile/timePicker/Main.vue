<!--模板-->
<template>
  <div class="template-index" v-if="dialogVisible">
    <div class="calendar-box">
      <div class="calendar-head">
        <div class="calendar-switch">
          <p class="not1" @click="forward"><img :src="require('./images/picker_left.png')" alt=""></p>
          <p class="not2"><span>{{ timeType == 'datetime' ? currentThen + '年' + currentMonth + '月' : timeType ==
              'year' ? calendarSwiperList[0].year + '年~' + calendarSwiperList[calendarSwiperList.length - 1].year +
            '年' : currentThen + '年'
          }}</span></p>
          <p class="not3" @click="rear"><img :src="require('./images/picker_right.png')" alt=""></p>
        </div>
        <ul class="calendar-week" v-if="timeType == 'datetime'">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>
      </div>
      <transition name="fade">
        <div :class="{ calendar: true, transition: transition, curType: timeType == 'datetime' }" @touchstart="moveStart"
          @touchend="moveEnd" @touchmove.prevent="move">
          <div class="calendar_swiper" :class='[{ transition: transition }]'
            :style="{ transform: 'translate3d(' + calendarMove.x + 'px,' + calendarMove.y + 'px,0px)' }"
            v-if="timeType == 'datetime'">
            <div class="calendar_swiper_not">
              <div class="content-row-box calendar-day"
                :class="{ 'calendar-day-disabled': item.month != monthBeforeMonth, 'calendar-selected-isdisabled': item.disabled }"
                v-for="(item, index) in monthBeforeList" :key="'left' + index">
                <p v-text="item.day" class="calendar-selected-isdisabled"></p>
              </div>
            </div>
            <div class="calendar_swiper_not">
              <div class="content-row-box calendar-day"
                :class="{ 'calendar-day-disabled': item.month != currentMonth, 'calendar-selected-isdisabled': item.disabled }"
                v-for="(item, index) in calendarSwiperList" :key="index" @click.prevent.stop="selectedTime(item)">
                <p v-text="item.day"
                  :class="{ 'calendar-selected-day': item.year == currentThen && item.month == currentMonth && item.day == currentDay && !item.disabled }">
                </p>
              </div>
            </div>
            <div class="calendar_swiper_not">
              <div class="content-row-box calendar-day"
                :class="{ 'calendar-day-disabled': item.month != nextMonthMonth, 'calendar-selected-isdisabled': item.disabled }"
                v-for="(item, index) in nextMonthList" :key="'right' + index">
                <p v-text="item.day"></p>
              </div>
            </div>
          </div>
          <div class="calendar_month" :class='[{ transition: transition }]'
            :style="{ transform: 'translate3d(' + calendarMove.x + 'px,' + calendarMove.y + 'px,0px)' }"
            v-if="timeType == 'year'">
            <div class="calendar_month_not">
              <div class="month-box" :class="{ 'month-disabled': item.disabled }"
                v-for="(item, index) in monthBeforeList" :key="index">
                <p v-text="item.year + '年'"></p>
              </div>
            </div>
            <div class="calendar_month_not">
              <div class="month-box" :class="{ 'month-disabled': item.disabled }"
                v-for="(item, index) in calendarSwiperList" :key="index" @click.prevent.stop="selectedYear(item)">
                <p :class="{ 'calendar-selected-month': item.year == currentThen && !item.disabled }"
                  v-text="item.year + '年'"></p>
              </div>
            </div>
            <div class="calendar_month_not">
              <div class="month-box" :class="{ 'month-disabled': item.disabled }" v-for="(item, index) in nextMonthList"
                :key="index">
                <p v-text="item.year + '年'"></p>
              </div>
            </div>
          </div>
          <div class="calendar_month" :class='[{ transition: transition }]'
            :style="{ transform: 'translate3d(' + calendarMove.x + 'px,' + calendarMove.y + 'px,0px)' }"
            v-if="timeType == 'month'">
            <div class="calendar_month_not">
              <div class="month-box" :class="{ 'month-disabled': item.disabled }"
                v-for="(item, index) in monthBeforeList" :key="index">
                <p v-text="item.month + '月'"></p>
              </div>
            </div>
            <div class="calendar_month_not">
              <div class="month-box" :class="{ 'month-disabled': item.disabled }"
                v-for="(item, index) in calendarSwiperList" :key="index" @click.prevent.stop="selectedMonth(item)">
                <p :class="{ 'calendar-selected-month': item.year == currentThen && item.month == currentMonth && !item.disabled }"
                  v-text="item.month + '月'"></p>
              </div>
            </div>
            <div class="calendar_month_not">
              <div class="month-box" :class="{ 'month-disabled': item.disabled }" v-for="(item, index) in nextMonthList"
                :key="index">
                <p v-text="item.month + '月'"></p>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>

export default {
  name: "TimePicker",
  props: {
    dialogVisible: {
      type: Boolean,
      defaule: true,
    },
    timeType: {
      type: String,
      default: 'datetime' //datetime 年月日 // month 年月 //year 年
    },
    timeData: {
      type: Array,
      default: [new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()]
    },
    disabledDate: {},
  },
  data() {
    return {
      monthBeforeList: [],
      monthBeforeThen: 0,
      monthBeforeMonth: 0,

      nextMonthList: [],
      nextMonthThen: 0,
      nextMonthMonth: 0,

      calendarSwiperList: [{
        year: new Date().getFullYear()
      }],

      currentThen: new Date().getFullYear(),//当年
      currentMonth: new Date().getMonth() + 1,//当月
      currentDay: new Date().getDate(),//当日
      actualDay: 0,
      calendarMove: {
        x: 0,
        y: 0
      },
      move_index: 0, // 左右移动 1 向右移动-1向左移动
      move_start_x: 0, //开始移动的位置x轴
      itemWidth: 0,
      // move_start_y:0, //开始移动的位置y轴
      transition: true,
      chooseData: []

    }
  },
  mounted() {

  },
  methods: {
    startUp() {
      let monthBeforeThen = this.currentThen
      let monthBeforeMonth = this.currentMonth
      let nextMonthThen = this.currentThen
      let nextMonthMonth = this.currentMonth
      this.calendarSwiperList = this.monthlyCalendar(this.timeType, this.currentThen, this.currentMonth)
      // console.log('this.calendarSwiperList',this.calendarSwiperList)

      if (this.timeType == 'datetime') {
        monthBeforeThen = this.currentMonth == 1 ? this.currentThen - 1 : this.currentThen
        monthBeforeMonth = this.currentMonth == 1 ? 12 : this.currentMonth - 1
        nextMonthThen = this.currentMonth == 12 ? this.currentThen + 1 : this.currentThen
        nextMonthMonth = this.currentMonth == 12 ? 1 : this.currentMonth + 1
        this.currentDay = this.currentDay <= this.actualDay ? this.currentDay : 1
        this.$emit('submit', {
          day: this.currentDay,
          month: this.currentMonth,
          year: this.currentThen,
        });
        this.chooseData = [this.currentThen, this.currentMonth, this.currentDay]
      } else if (this.timeType == 'year') {
        monthBeforeThen = this.calendarSwiperList[0].year - 12
        nextMonthThen = this.calendarSwiperList[this.calendarSwiperList.length - 1].year + 1
        this.$emit('submit', {
          year: this.currentThen
        });
        this.chooseData = [this.currentThen]
      } else {
        monthBeforeThen = this.currentThen - 1
        nextMonthThen = this.currentThen + 1
        this.$emit('submit', {
          month: this.currentMonth,
          year: this.currentThen
        });
        this.chooseData = [this.currentThen, this.currentMonth]
      }
      this.monthBeforeList = this.monthlyCalendar(this.timeType, monthBeforeThen, monthBeforeMonth)

      this.nextMonthList = this.monthlyCalendar(this.timeType, nextMonthThen, nextMonthMonth)

      this.monthBeforeThen = monthBeforeThen
      this.monthBeforeMonth = monthBeforeMonth
      this.nextMonthThen = nextMonthThen
      this.nextMonthMonth = nextMonthMonth
      // console.log(this.monthBeforeList)
      // console.log(this.calendarSwiperList)
      // console.log(this.nextMonthList)
    },
    monthlyCalendar(timeType, year, month) {

      let date = new Date();
      // 前一个，当前，后一个 
      let monthBeforeList = []
      let actualDayList = []
      let nextMonthList = []
      if (timeType == 'datetime') {
        //前一个后一个截取的数组
        let monthBeforeIntercept = []
        let actualDayListIntercept = []
        let nextMonthIntercept = []
        let monthBefore = (new Date(year, month - 1, 0)).getDate() //前一个月天数
        let actualDay = (new Date(year, month, 0)).getDate() // 当前月天数
        this.actualDay = actualDay
        let nextMonth = (new Date(year, month + 1, 0)).getDate() //后一个月天数
        let weeks = [7, 1, 2, 3, 4, 5, 6]
        for (let i = 1; i < monthBefore + 1; i++) {
          let obj = {
            day: i,
            month: month - 1,
            year: year,
            disabled: typeof this.disabledDate === 'function' && this.disabledDate(new Date(year, month - 2, i)),
          }
          monthBeforeList.push(obj)
        }
        for (let i = 1; i < actualDay + 1; i++) {
          let obj = {
            day: i,
            month: month,
            year: year,
            disabled: typeof this.disabledDate === 'function' && this.disabledDate(new Date(year, month - 1, i)),
          }
          actualDayList.push(obj)
        }
        for (let i = 1; i < nextMonth + 1; i++) {
          let obj = {
            day: i,
            month: month + 1,
            year: year,
            disabled: typeof this.disabledDate === 'function' && this.disabledDate(new Date(year, month, i)),
          }
          nextMonthList.push(obj)
        }
        let dt_first = weeks[(new Date(year, month - 1, 1)).getDay()] //当月第一天是周几 weeks[dt_first]
        monthBeforeIntercept = monthBeforeList.slice(monthBefore - (dt_first - 1))
        nextMonthList = nextMonthList.slice(0, 42 - actualDay - monthBeforeIntercept.length)
        actualDayListIntercept = [...monthBeforeIntercept, ...actualDayList, ...nextMonthList]
        return actualDayListIntercept
      } else if (timeType == 'year') {
        let yearNUm = {
          year: year,
          disabled: typeof this.disabledDate === 'function' && this.disabledDate(new Date(String(year))),
        }
        // console.log('year',year)
        if (new Date().getFullYear() == year) {
          yearNUm.year = year - 6
          yearNUm.disabled = typeof this.disabledDate === 'function' && this.disabledDate(new Date(String(yearNUm.year)))
        }
        // console.log('yearNUm1',yearNUm)
        for (let i = 0; i < 12; i++) {
          let obj = {
            year: yearNUm.year + i,
            disabled: typeof this.disabledDate === 'function' && this.disabledDate(new Date(String(yearNUm.year + i)))
          }
          actualDayList.push(obj)
        }
        return actualDayList
      } else {
        let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        for (let i = 1; i < monthList.length + 1; i++) {
          let obj = {
            month: i,
            year: year,
            disabled: typeof this.disabledDate === 'function' && this.disabledDate(new Date(year, i - 1))
          }
          actualDayList.push(obj)
        }
        return actualDayList
      }
    },
    forward() {
      if (this.timeType == 'datetime') {
        if (this.currentMonth == 1) {
          this.currentThen--
          this.currentMonth = 12
        } else {
          this.currentMonth--
        }
      } else if (this.timeType == 'year') {
        this.currentThen = this.calendarSwiperList[0].year - 12
      } else {
        this.currentThen--
      }
      this.startUp()
    },
    rear() {
      if (this.timeType == 'datetime') {
        if (this.currentMonth == 12) {
          this.currentThen++
          this.currentMonth = 1
        } else {
          this.currentMonth++
        }
      } else if (this.timeType == 'year') {
        this.currentThen = this.calendarSwiperList[this.calendarSwiperList.length - 1].year + 1
        // console.log('this.currentThen',this.currentThen)
      } else {
        this.currentThen++
      }

      this.startUp()
    },
    selectedTime(item) {
      // console.log(item)
      // console.log(this.currentThen,this.currentMonth,this.currentDay)
      if (!item.disabled) {
        if (item.year == this.currentThen && item.month == this.currentMonth) {
          this.currentDay = item.day
          this.$emit('submit', {
            day: this.currentDay,
            month: this.currentMonth,
            year: this.currentThen
          });
          this.chooseData = [this.currentThen, this.currentMonth, this.currentDay]
        } else if (item.year == this.currentThen && item.month < this.currentMonth) {

          this.currentDay = item.day
          this.forward()
        } else if (item.year == this.currentThen && item.month > this.currentMonth) {

          this.currentDay = item.day
          this.rear()
        }
      }
    },
    selectedMonth(item) {
      if (!item.disabled) {
        if (item.year == this.currentThen) {
          this.currentMonth = item.month
        }
        this.$emit('submit', {
          month: this.currentMonth,
          year: this.currentThen
        });
        this.chooseData = [this.currentThen, this.currentMonth]
      }
    },
    selectedYear(item) {
      if (!item.disabled) {
        this.currentThen = item.year
        this.$emit('submit', {
          year: this.currentThen
        });
        this.chooseData = [this.currentThen]
      }
    },
    // 开始移动
    moveStart(e) {
      // console.log('手机端开始移动')

      var touch;
      if (e.changedTouches) {
        touch = e.changedTouches[0];
      } else {
        touch = e
      }
      this.move_start_x = touch.clientX
      // console.log(this.move_start_x)
      this.transition = true
    },
    moveEnd(e) {
      // console.log('手机端结束移动')
      let touch;
      let mark = false
      if (e.changedTouches) {
        touch = e.changedTouches[0];
      } else {
        touch = e
      }
      if (this.move_start_x < touch.clientX) {

        if (this.move_start_x - touch.clientX < -50) {
          this.calendarMove.x = this.itemWidth
          this.move_index = -1
          if (this.timeType == 'datetime') {
            if (this.currentMonth == 1) {
              this.currentThen--
              this.currentMonth = 12
            } else {
              this.currentMonth--
            }
          } else if (this.timeType == 'year') {
            this.currentThen = this.calendarSwiperList[0].year - 12
          } else {
            this.currentThen--
          }
          mark = true
        } else {
          this.calendarMove.x = 0
        }
      } else {
        if (this.move_start_x - touch.clientX > 50) {
          // console.log(111,-this.itemWidth)
          this.calendarMove.x = -this.itemWidth
          this.move_index = 1
          if (this.timeType == 'datetime') {
            if (this.currentMonth == 12) {
              this.currentThen++
              this.currentMonth = 1
            } else {
              this.currentMonth++
            }
          } else if (this.timeType == 'year') {
            this.currentThen = this.calendarSwiperList[this.calendarSwiperList.length - 1].year + 1
          } else {
            this.currentThen++
          }
          mark = true
        } else {
          this.calendarMove.x = 0
        }
      }
      this.transition = true
      setTimeout(() => {
        this.transition = false
        if (mark) {
          this.calendarMove.x = 0
          this.startUp()
        }

      }, 500)
    },
    move(e) {
      var touch;
      if (e.changedTouches) {
        touch = e.changedTouches[0];
      } else {
        touch = e
      }
      this.calendarMove.x = touch.clientX - this.move_start_x
    },

  },
  computed: {

  },
  watch: {

    timeData: {
      handler(v) {
        if (v) {
          // console.log(v,this.chooseData)
          if (Array.isArray(v)) {
            let currentThen = v[0] || new Date().getFullYear()//当年
            let currentMonth = v[1] || new Date().getMonth() + 1//当月
            let currentDay = v[2] || new Date().getDate()//当日
            let chooseThen = this.chooseData[0] || ''
            let chooseMonth = this.chooseData[1] || ''
            let chooseDay = this.chooseData[2] || ''
            if ((currentThen + '/' + currentMonth + '/' + currentDay) != (chooseThen + '/' + chooseMonth + '/' + chooseDay) || v.length == 0) {
              this.currentThen = currentThen
              this.currentMonth = currentMonth
              this.currentDay = currentDay
              this.itemWidth = window.innerWidth
              this.startUp()
            }
          }
        }
      },
      deep: true,
      immediate: true
    },
  }
};
</script>
<style scoped lang='scss'>
// @import "~@/temp.scss";
.calendar-box {
  width: 100%;

  .calendar-head {
    width: 100%;

  }

  .calendar-switch {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 40px;
    padding: 0 16px;

    img {
      width: 16px;
    }

    .not1,
    .not3 {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }

    .not2 {
      width: 50%;
      text-align: center;

      span {
        color: #2E2E2E;
        font-size: 14px;
        font-weight: 600;
      }
    }

    .not3 {
      justify-content: flex-end;
    }
  }

  .calendar-week {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    li {
      font-size: 12px;
      width: 14.28%;
      display: flex;
      align-items: center;
      justify-content: center;
      line-height: 36px
    }
  }

  .calendar {
    overflow: hidden;
    height: 190px;

    &.curType {
      height: 250px;
    }
  }

  .calendar_swiper {
    position: relative;
    white-space: nowrap;
    height: 100%;

    .calendar_swiper_not {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      display: flex;
      flex-wrap: wrap;
      user-select: none;
      border-left: 1px solid #eeeeee;

      &:nth-child(1) {
        left: -100%;
      }

      &:nth-child(2) {
        left: 0;
      }

      &:nth-child(3) {
        left: 100%;
      }
    }

    .content-row-box {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    .calendar-day {
      position: relative;
      width: 14.285%;
      height: 40px;
      font-size: 16px;
      cursor: pointer;
    }

    .calendar-day-disabled {
      color: #C0C4CC;
      cursor: default;
    }

    .calendar-selected-day {
      width: 40px;
      height: 40px;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #036ED5;
      border-radius: 4px;
    }

    .calendar-selected-isdisabled {
      background-color: #fafafa;
      color: #C0C4CC;
    }
  }

  .calendar_month {
    position: relative;
    white-space: nowrap;

    .calendar_month_not {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      user-select: none;
      border-left: 1px solid #eeeeee;
      padding: 0 16px;

      &:nth-child(1) {
        left: -100%;
      }

      &:nth-child(2) {
        left: 0;
      }

      &:nth-child(3) {
        left: 100%;
      }

      .month-box {
        width: 21.5%;
        height: 30px;
        margin-top: 20px;

        p {
          color: #909399;
          background: #E8E8E8;
          width: 100%;
          height: 100%;
          font-weight: 500;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
        }

        .calendar-selected-month {
          color: #036ED5;
          background: #CDE2F7;
        }
      }

      .month-disabled {
        opacity: 0.6;
      }
    }

  }
}

.transition {
  transition: all .2s linear;
}
</style>