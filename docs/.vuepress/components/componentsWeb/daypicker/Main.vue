<template>
  <div class="yy-picker-day">
    <div
      tabindex="1"
      @blur="blur"
      @mouseenter="mouseenter"
      @mouseleave="mouseleave"
      :class="[
        'picker-entry',
        pickerVisible ? 'is-hover' : '',
        pickerValue ? '' : 'is-empty',
      ]"
      @click.stop="pickerController"
    >
      {{ dateValue || placeholder }}
      <div class="icon-clear" @click.stop="clear" v-show="clearIconVisible && clearable">
        <img src="./images/icon-clear.png" />
      </div>
      <div
        ref="picker-container"
        :style="{top:`${top}px`,left:`${left}px`}"
        class="picker-container"
        v-show="pickerVisible"
        @click.stop
        @mouseenter="clearIconVisible = false"
      >
        <div class="container-arrow" :style="`${visibleCol==='bottom'?'top:-5px;':'bottom:-5px;'}${visibleRow==='right'?'left:50px;':'right:50px;'}`"></div>
        <div class="container-header">
          <div class="header-icon">
            <img @click="prevYear" src="./images/arrow-left-double.png" />
            <img @click="prevMonth" src="./images/arrow-left.png" />
          </div>
          <div class="header-title">{{ year }}年{{ month }}月</div>
          <div class="header-icon">
            <img @click="nextMonth" src="./images/arrow-right.png" />
            <img @click="nextYear" src="./images/arrow-right-double.png" />
          </div>
        </div>
        <div class="container-body">
          <div class="calendar">
            <div class="calendar-header">
              <div class="calendar-header-cell">一</div>
              <div class="calendar-header-cell">二</div>
              <div class="calendar-header-cell">三</div>
              <div class="calendar-header-cell">四</div>
              <div class="calendar-header-cell">五</div>
              <div class="calendar-header-cell">六</div>
              <div class="calendar-header-cell">日</div>
            </div>
            <div class="calendar-body">
              <div
                class="calendar-body-row"
                v-for="(row, index) in calendarData"
                :key="index"
              >
                <div
                  @click.stop="cell.isDisabled ? null : checkDay(cell.id)"
                  :class="[
                    'calendar-body-row-cell',
                    cell.isDisabled ? 'is-disabled' : '',
                    activeDay === cell.id && !cell.isDisabled
                      ? 'is-active'
                      : '',
                    index === 0 && cell.day > 7 ? 'is-not-current' : '',
                    index === 4 && cell.day < 8 ? 'is-not-current' : '',
                    index === 5 && cell.day < 15 ? 'is-not-current' : '',
                    year === year_now &&
                    month === month_now &&
                    cell.day === day_now &&
                    !cell.isDisabled
                      ? 'is-today'
                      : '',
                  ]"
                  v-for="cell in row"
                  :key="cell.id"
                >
                  {{ cell.day }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container-footer" v-if="isNeedTime">
          <div class="time-picker" @click="timePickerController">
            <div class="time-value">
              {{
                activeHourIndex < 10 ? `0${activeHourIndex}` : activeHourIndex
              }}:{{
                activeMinuteIndex < 10
                  ? `0${activeMinuteIndex}`
                  : activeMinuteIndex
              }}
            </div>
            <div
              class="time-picker-icon"
              :style="timePickerVisible ? 'transform: rotate(180deg)' : ''"
            >
              <img src="./images/arrow-bottom.png" alt="" />
            </div>
            <div
              @click.stop
              class="time-picker-container"
              v-show="timePickerVisible"
            >
              <div
                class="column-hour"
                @scroll="hourScrollHandler"
                ref="hour-scroll"
              >
                <div
                  @click="hour < 0 ? null : changeHour(hour)"
                  :class="[
                    'column-hour-cell',
                    activeHourIndex === Number(hour) ? 'is-active' : '',
                  ]"
                  v-for="hour in hours"
                  :key="hour"
                >
                  {{ hour < 0 ? "" : hour }}
                </div>
              </div>
              <div class="icon-split">:</div>
              <div
                class="column-minute"
                @scroll="minuteScrollHandler"
                ref="minute-scroll"
              >
                <div
                  @click="minute < 0 ? null : changeMinute(minute)"
                  :class="[
                    'column-minute-cell',
                    activeMinuteIndex === Number(minute) ? 'is-active' : '',
                  ]"
                  v-for="minute in minutes"
                  :key="minute"
                >
                  {{ minute < 0 ? "" : minute }}
                </div>
              </div>
            </div>
          </div>
          <div
            :class="['btn-confirm', activeDay ? '' : 'is-disabled']"
            @click="activeDay ? confirmCheck() : null"
          >
            确定
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $Calendar from "../Calendar.js";
export default {
  name: "YyDayPicker",
  props: {
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "选择日期",
    },
    pickerValue: {
      type: String | Number,
      default: "",
    },
    isNeedTime: {
      type: Boolean,
      default: false,
    },
    disabledDate: {
      type: Function,
      default: function () {
        return false;
      },
    },
  },
  computed: {
    dateValue() {
      if (!this.pickerValue) {
        return this.pickerValue;
      }
      const year = new Date(this.pickerValue).getFullYear();
      const month =
        new Date(this.pickerValue).getMonth() + 1 >= 10
          ? new Date(this.pickerValue).getMonth() + 1
          : `0${new Date(this.pickerValue).getMonth() + 1}`;
      const day =
        new Date(this.pickerValue).getDate() >= 10
          ? new Date(this.pickerValue).getDate()
          : `0${new Date(this.pickerValue).getDate()}`;
      const hour =
        new Date(this.pickerValue).getHours() >= 10
          ? new Date(this.pickerValue).getHours()
          : `0${new Date(this.pickerValue).getHours()}`;
      const minute =
        new Date(this.pickerValue).getMinutes() >= 10
          ? new Date(this.pickerValue).getMinutes()
          : `0${new Date(this.pickerValue).getMinutes()}`;
      return this.isNeedTime
        ? `${year}/${month}/${day} ${hour}:${minute}`
        : `${year}/${month}/${day}`;
    },
  },
  data() {
    return {
      pickerVisible: false,
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      year_now: new Date().getFullYear(),
      month_now: new Date().getMonth() + 1,
      day_now: new Date().getDate(),
      activeDay: "",
      clearIconVisible: false,
      calendarData: [],

      timePickerVisible: false,
      hours: new Array(31)
        .fill("")
        .map((v, index) =>
          index < 3
            ? index - 100
            : index < 27
            ? index - 3 < 10
              ? `0${index - 3}`
              : index - 3
            : index - 100
        ),
      minutes: new Array(67)
        .fill("")
        .map((v, index) =>
          index < 3
            ? index - 100
            : index < 63
            ? index - 3 < 10
              ? `0${index - 3}`
              : index - 3
            : index - 100
        ),
      activeHourIndex: 0,
      activeMinuteIndex: 0,
      timer: null,

      top:0,
      left:0,
      visibleCol:'bottom',
      visibleRow:'right',
    };
  },
  methods: {
    blur() {
      this.timePickerVisible = false;
      this.pickerVisible = false;
    },
    mouseenter() {
      if (this.pickerValue) {
        this.clearIconVisible = true;
      }
    },
    mouseleave() {
      this.clearIconVisible = false;
    },
    clear() {
      this.timePickerVisible = false;
      this.pickerVisible = false;
      this.$emit("clear");
    },
    changeCalendarData(calendarData) {
      const _calendarData = [];
      calendarData.forEach((row, index) => {
        if (index === 0) {
          row = row.map((day) => {
            let year = this.year;
            let month = this.month;
            if (day > 7) {
              if (month === 1) {
                year--;
                month = 12;
              } else {
                month--;
              }
            }
            return {
              id: `${year}/${month}/${day}`,
              day: day,
              isDisabled: this.disabledDate(`${year}/${month}/${day}`),
            };
          });
        } else if (index === 4) {
          row = row.map((day) => {
            let year = this.year;
            let month = this.month;
            if (day < 8) {
              if (month === 12) {
                year++;
                month = 1;
              } else {
                month++;
              }
            }
            return {
              id: `${year}/${month}/${day}`,
              day: day,
              isDisabled: this.disabledDate(`${year}/${month}/${day}`),
            };
          });
        } else if (index === 5) {
          row = row.map((day) => {
            let year = this.year;
            let month = this.month;
            if (day < 15) {
              if (month === 12) {
                year++;
                month = 1;
              } else {
                month++;
              }
            }
            return {
              id: `${year}/${month}/${day}`,
              day: day,
              isDisabled: this.disabledDate(`${year}/${month}/${day}`),
            };
          });
        } else {
          row = row.map((day) => {
            let year = this.year;
            let month = this.month;
            return {
              id: `${year}/${month}/${day}`,
              day: day,
              isDisabled: this.disabledDate(`${year}/${month}/${day}`),
            };
          });
        }
        _calendarData.push(row);
      });
      return _calendarData;
    },
    async getPosition(dom) {
      const BodyHeight = document.body.offsetHeight
      const BodyWidth = document.body.offsetWidth
      const arrowHeight = 10
      const PickerInputHeight = dom.offsetHeight
      const PickerInputWidth = dom.offsetWidth
      const PickerInputPosition = dom.getBoundingClientRect()
      await this.$nextTick()
      const PickerContainerHeight = this.$refs['picker-container'].offsetHeight
      const PickerContainerWidth = this.$refs['picker-container'].offsetWidth
      if(BodyWidth - PickerInputPosition.right >= PickerContainerWidth) {
        this.visibleRow = 'right'
        this.left = PickerInputPosition.left
      }else if(PickerInputPosition.left >= PickerContainerWidth){
        this.visibleRow = 'left'
        this.left = PickerInputPosition.left - Math.abs(PickerInputWidth-PickerContainerWidth)
      }else {
        this.visibleRow = 'right'
        this.left = PickerInputPosition.left
      }      
      if(BodyHeight - PickerInputPosition.bottom >= PickerContainerHeight + arrowHeight) {
        this.visibleCol = 'bottom'
        this.top = PickerInputPosition.top + PickerInputHeight + arrowHeight;
      }else if(PickerInputPosition.top >= PickerContainerHeight + arrowHeight){
        this.visibleCol = 'top'
        this.top = PickerInputPosition.top - PickerContainerHeight - arrowHeight;
      }else {
        this.visibleCol = 'bottom'
        this.top = PickerInputPosition.top + PickerInputHeight + arrowHeight;
      }
    },
    pickerController(e) {
      this.getPosition(e.target)
      this.timePickerVisible = false;
      this.pickerVisible = !this.pickerVisible;
      if (this.pickerVisible) {
        this.year = this.pickerValue
          ? new Date(this.pickerValue).getFullYear()
          : this.year_now;
        this.month = this.pickerValue
          ? new Date(this.pickerValue).getMonth() + 1
          : this.month_now;
        this.activeDay = this.pickerValue
          ? `${new Date(this.pickerValue).getFullYear()}/${
              new Date(this.pickerValue).getMonth() + 1
            }/${new Date(this.pickerValue).getDate()}`
          : ``;
        this.calendarData = this.changeCalendarData(
          $Calendar.getCalendarData(this.year, this.month)
        );
        this.activeHourIndex = this.pickerValue
          ? new Date(this.pickerValue).getHours()
          : 0;
        this.activeMinuteIndex = this.pickerValue
          ? new Date(this.pickerValue).getMinutes()
          : 0;
      }
    },
    checkDay(day) {
      this.activeDay = day;
      if (!this.isNeedTime) {
        this.$emit("change", new Date(this.activeDay).getTime());
        this.pickerVisible = false;
      }
    },
    confirmCheck() {
      const hour =
        this.activeHourIndex < 10
          ? `0${this.activeHourIndex}`
          : this.activeHourIndex;
      const minute =
        this.activeMinuteIndex < 10
          ? `0${this.activeMinuteIndex}`
          : this.activeMinuteIndex;
      this.$emit(
        "change",
        new Date(`${this.activeDay} ${hour}:${minute}`).getTime()
      );
      this.timePickerVisible = false;
      this.pickerVisible = false;
    },
    prevMonth() {
      if (this.month === 1) {
        this.year--;
        this.month = 12;
      } else {
        this.month--;
      }
      this.calendarData = this.changeCalendarData(
        $Calendar.getCalendarData(this.year, this.month)
      );
    },
    prevYear() {
      if (this.year > 1970) {
        this.year--;
        this.calendarData = this.changeCalendarData(
          $Calendar.getCalendarData(this.year, this.month)
        );
      }
    },
    nextMonth() {
      if (this.month === 12) {
        this.year++;
        this.month = 1;
      } else {
        this.month++;
      }
      this.calendarData = this.changeCalendarData(
        $Calendar.getCalendarData(this.year, this.month)
      );
    },
    nextYear() {
      this.year++;
      this.calendarData = this.changeCalendarData(
        $Calendar.getCalendarData(this.year, this.month)
      );
    },
    async timePickerController() {
      this.timePickerVisible = !this.timePickerVisible;
      if (this.timePickerVisible) {
        await this.$nextTick();
        this.$refs["hour-scroll"].scrollTop = 25 * this.activeHourIndex;
        this.$refs["minute-scroll"].scrollTop = 25 * this.activeMinuteIndex;
      }
    },
    changeHour(hour) {
      this.activeHourIndex = Number(hour);
      this.$refs["hour-scroll"].scrollTop = 25 * this.activeHourIndex;
    },
    changeMinute(minute) {
      this.activeMinuteIndex = Number(minute);
      this.$refs["minute-scroll"].scrollTop = 25 * this.activeMinuteIndex;
    },
    hourScrollHandler(e) {
      this.activeHourIndex = Math.round(e.target.scrollTop / 25);
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        e.target.scrollTop = 25 * this.activeHourIndex;
        clearTimeout(this.timer);
        this.timer = null;
      }, 300);
    },
    minuteScrollHandler(e) {
      this.activeMinuteIndex = Math.round(e.target.scrollTop / 25);
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        e.target.scrollTop = 25 * this.activeMinuteIndex;
        clearTimeout(this.timer);
        this.timer = null;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.yy-picker-day {
  // padding: 10px;
  user-select: none;
  .is-empty {
    color: #c0c4cc !important;
  }
  .is-hover {
    border: 1px solid #036ed5 !important;
    transition: 0.5s;
  }
  .picker-entry {
    width: 100%;
    height: 35px;
    display: flex;
    align-items: center;
    color: #303133;
    font-size: 14px;
    background: url("./images/icon-date.png") no-repeat 15px 50% #ffffff;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    cursor: pointer;
    position: relative;
    padding: 0 20px 0 40px;
    .icon-clear {
      position: absolute;
      right: 10px;
      padding: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .picker-container {
      // transition: 0.5s;
      cursor: default;
      position: fixed;
      z-index: 888;
      width: 320px;
      // height: 267px;
      background: #ffffff;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border: 1px solid #e4e7ed;
      // top: 43px;
      // left: 0;
      padding: 15px 0 0 0;
      .container-arrow {
        height: 16px;
        width: 16px;
        border-radius: 2px;
        position: absolute;
        // left: 0;
        // right: 0;
        // margin: 0 auto;
        // top: -5px;
        background: #ffffff;
        transform: rotate(45deg);
      }
      .container-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 16px;
        .header-icon {
          display: flex;
          align-items: center;
          cursor: pointer;
          img {
            height: 16px;
            width: 16px;
          }
        }
        .header-title {
          font-size: 14px;
          font-weight: 600;
          color: #2e2e2e;
        }
      }
      .container-body {
        padding: 0 14px 15px 11px;
        .calendar {
          .calendar-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-top: 10px;
            .calendar-header-cell {
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 12px;
              font-weight: 600;
              color: #303133;
              height: 30px;
              width: 30px;
              border-radius: 4px;
            }
          }
          .calendar-body {
            .calendar-body-row {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .is-not-current {
                color: #c0c4cc !important;
                &:hover {
                  background-color: rgba(3, 110, 213, 1);
                  color: #ffffff !important;
                }
              }
              .is-disabled {
                background-color: rgba(243, 243, 243, 1) !important;
                color: #c0c4cc !important;
                cursor: not-allowed !important;
                &:hover {
                  background-color: rgba(243, 243, 243, 1) !important;
                  color: #c0c4cc !important;
                }
              }
              .is-today {
                color: #036ed5 !important;
                &:hover {
                  background-color: rgba(3, 110, 213, 1);
                  color: #ffffff !important;
                }
              }
              .is-active {
                background-color: rgba(3, 110, 213, 1) !important;
                color: #ffffff !important;
              }
              .calendar-body-row-cell {
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: 600;
                color: #303133;
                height: 30px;
                width: 30px;
                border-radius: 4px;
                cursor: pointer;
                margin-top: 3px;
                &:hover {
                  background-color: rgba(3, 110, 213, 1);
                  color: #ffffff;
                }
              }
            }
          }
        }
      }
      .container-footer {
        padding: 10px 14px 20px 14px;
        border-top: 1px solid rgba(228, 231, 237, 1);
        .time-picker {
          position: relative;
          width: 100%;
          height: 35px;
          background: #ffffff;
          border-radius: 4px;
          border: 1px solid #dcdfe6;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          cursor: pointer;
          .time-value {
            font-size: 14px;
            color: #2e2e2e;
          }
          .time-picker-icon {
            display: flex;
            align-items: center;
            transition: 0.5s;
          }
          .time-picker-container {
            transition: 0.5s;
            cursor: default;
            position: absolute;
            z-index: 999;
            width: 100%;
            height: 218px;
            background: #ffffff;
            box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
            border-radius: 4px;
            border: 1px solid #e4e7ed;
            bottom: 43px;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 8px 0;
            .column-hour {
              overflow-y: auto;
              flex: 1;
              height: 100%;
              text-align: right;
              padding-right: 20px;
              cursor: pointer;
              &::-webkit-scrollbar {
                display: none;
              }
              .is-active {
                color: #303133 !important;
              }
              .column-hour-cell {
                font-size: 12px;
                color: #c0c4cc;
                height: 25px;
                line-height: 25px;
              }
            }
            .icon-split {
              font-size: 12px;
              color: #303133;
              height: 25px;
              border-top: 1px solid #e8e8e8;
              border-bottom: 1px solid #e8e8e8;
              display: flex;
              align-items: center;
              justify-content: center;
              position: absolute;
              width: 100%;
              top: -30px;
              bottom: 0;
              margin: auto;
            }
            .column-minute {
              overflow-y: auto;
              flex: 1;
              height: 100%;
              text-align: left;
              padding-left: 20px;
              cursor: pointer;
              &::-webkit-scrollbar {
                display: none;
              }
              .is-active {
                color: #303133 !important;
              }
              .column-minute-cell {
                font-size: 12px;
                color: #c0c4cc;
                height: 25px;
                line-height: 25px;
              }
            }
          }
        }
        .is-disabled {
          cursor: not-allowed !important;
          background-color: #ffffff !important;
          color: #c0c4cc !important;
          border: 1px solid #dcdfe6;
        }
        .btn-confirm {
          height: 40px;
          background-color: rgba(3, 110, 213, 1);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #ffffff;
          font-size: 14px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>