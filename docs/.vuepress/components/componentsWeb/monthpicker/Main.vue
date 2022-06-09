<template>
  <div class="yy-picker-month">
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
          <div class="header-icon" @click="prevYear">
            <img src="./images/arrow-left.png" />
          </div>
          <div class="header-title">{{ year }}年</div>
          <div class="header-icon" @click="nextYear">
            <img src="./images/arrow-right.png" />
          </div>
        </div>
        <div class="container-body">
          <div
            :class="[
              'body-option',
              m.isActive ? 'is-active' : '',
              m.isCurrent ? 'is-current' : '',
              m.isDisabled ? 'is-disabled' : '',
            ]"
            @click="m.isDisabled ? null : changeMonth(m)"
            v-for="m in months"
            :key="m.id"
          >
            {{ m.month }}月
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "YyMonthPicker",
  props: {
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "选择年月",
    },
    pickerValue: {
      type: String | Number,
      default: "",
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
      return `${year}/${month}`;
    },
  },
  data() {
    return {
      pickerVisible: false,
      months: new Array(12).fill(0).map((v, index) => {
        return {
          month: index + 1,
          id: `${new Date().getFullYear()}/${index + 1}`,
          isDisabled: false,
          isCurrent: false,
          isActive: false,
        };
      }),
      year: new Date().getFullYear(),
      year_now: new Date().getFullYear(),
      month_now: new Date().getMonth() + 1,
      clearIconVisible: false,

      top:0,
      left:0,
      visibleCol:'bottom',
      visibleRow:'right',
    };
  },
  methods: {
    blur() {
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
      this.pickerVisible = false;
      this.$emit("clear");
    },
    changeMonthsData() {
      this.months = this.months.map((m) => {
        return {
          id: `${this.year}/${m.month}`,
          month: m.month,
          isDisabled: this.disabledDate(`${this.year}/${m.month}`),
          isCurrent:
            `${this.year}/${m.month}` === `${this.year_now}/${this.month_now}`,
          isActive:
            `${this.year}/${m.month}` ===
            `${new Date(this.pickerValue).getFullYear()}/${
              new Date(this.pickerValue).getMonth() + 1
            }`,
        };
      });
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
      this.pickerVisible = !this.pickerVisible;
      if (this.pickerVisible) {
        this.year = this.pickerValue
          ? new Date(this.pickerValue).getFullYear()
          : new Date().getFullYear();
      }
      this.changeMonthsData();
    },
    prevYear() {
      if (this.year > 1970) {
        this.year--;
        this.changeMonthsData();
      }
    },
    nextYear() {
      this.year++;
      this.changeMonthsData();
    },
    changeMonth(m) {
      this.$emit("change", new Date(m.id).getTime());
      this.pickerVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.yy-picker-month {
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
      height: 267px;
      background: #ffffff;
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
      border: 1px solid #e4e7ed;
      // top: 43px;
      // left: 0;
      padding: 15px 16px 0 16px;
      .container-arrow {
        height: 16px;
        width: 16px;
        border-radius: 2px;
        position: absolute;
        // left: 0;
        // right: 0;
        // margin: 0 auto;
        background: #ffffff;
        transform: rotate(45deg);
      }
      .container-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .header-icon {
          padding: 2px;
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        .header-title {
          font-size: 14px;
          font-weight: 600;
          color: #2e2e2e;
        }
      }
      .container-body {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .is-disabled {
          background-color: rgba(243, 243, 243, 1) !important;
          color: #c0c4cc !important;
          cursor: not-allowed !important;
        }
        .is-current {
          background-color: #e8e8e8;
          color: #036ed5 !important;
        }
        .is-active {
          background-color: rgba(3, 110, 213, 0.2) !important;
          color: #036ed5 !important;
        }
        .body-option {
          cursor: pointer;
          width: 86px;
          height: 30px;
          background-color: #e8e8e8;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
          color: #909399;
          margin-top: 20px;
          &:hover {
            background-color: rgba(3, 110, 213, 0.2);
            color: #036ed5;
          }
        }
      }
    }
  }
}
</style>