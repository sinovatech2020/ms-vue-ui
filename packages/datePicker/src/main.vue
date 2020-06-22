<template>
  <div>
    <transition name="fade">
      <div class="picker-moke" v-show="value" @click="hide"></div>
    </transition>
    <transition name="slide">
      <div class="picker-wrap" v-show="value">
        <div class="picker-nav">
          <span class="picker-cancel" @click="cancel">取消</span>
          <span class="picker-confirm" @click="confirm">确认</span>
        </div>
        <div class="picker-content">
          <div class="mask-top border-bottom-1px"></div>
          <div class="mask-bottom border-top-1px"></div>
          <div class="wheel-wrapper" ref="wrapper">
            <div class="wheel" v-for="(col, index) in data" :key="index">
              <ul class="wheel-scroller">
                <li class="wheel-item" v-for="(item, index) in col" :key="index">
                  {{ item.text }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
const EVENT_CHANGE = "change";
import BScroll from "@better-scroll/core";
import Wheel from "@better-scroll/wheel";
BScroll.use(Wheel);
export default {
  name: "MsDatePicker",
  props: {
    min: {
      type: Array,
      default() {
        return [2010, 1, 1];
      }
    },
    max: {
      type: Array,
      default() {
        return [2021, 12, 20];
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      wheels: [],
      selectedIndex: [0, 0, 0],
      data: []
    };
  },
  computed: {
    data1() {
      let data = range(this.min[0], this.max[0], false, "年"); //输出月
      data.forEach(year => {
        let minMonth = year.value === this.min[0] ? this.min[1] : 1; //返回  最小月份 如果没有则1
        let maxMonth = year.value === this.max[0] ? this.max[1] : 12; //返回 最大月份 如果没有返回12
        year.children = range(minMonth, maxMonth, false, "月"); //给年追加一个子数组月份
        year.children.forEach(month => {
          let day = 30; //默认为30天
          if ([1, 3, 5, 7, 8, 10, 12].indexOf(month.value) > -1) {
            day = 31; //1, 3, 5, 7, 8, 10, 12  每月31天
          } else {
            if (month.value === 2) {
              //2月判断闰年 闰年29天
              day =
                !(year.value % 400) || (!(year.value % 4) && year.value % 100)
                  ? 29
                  : 28;
            }
          }
          //第一年第一个月有没有最小日 入过没有返回1
          let minDay =
            year.value === this.min[0] && month.value === this.min[1]
              ? this.min[2]
              : 1;
          //最后一年的最后一个月多少天 如果没有则换回30天
          let maxDay =
            year.value === this.max[0] && month.value === this.max[1]
              ? this.max[2]
              : day;
          month.children = range(minDay, maxDay, false, "日");
        });
      });
      return data;
    }
  },
  watch: {
    value(n) {
      if (n) {
        this.show();
      }
    }
  },
  mounted() {
    this.changeData(this.selectedIndex, undefined);
  },
  methods: {
    show() {
      //如果没有wheels对象 创建wheels 对象
      if (this.wheels.length == 0) {
        this.$nextTick(() => {
          let wrapper = this.$refs.wrapper;
          for (let i = 0; i < this.data.length; i++) {
            this.createWheel(wrapper, i);
          }
        });
      } else {
        //如果有  停止运动  滚动到上一次所选择的
        for (let i = 0; i < this.data.length; i++) {
          this.wheels[i].enable();
          this.wheels[i].wheelTo(this.selectedIndex[i]);
        }
      }
    },
    hide() {
      //隐藏 移除wheels 对象
      this.$emit("input", false);
      for (let i = 0; i < this.data.length; i++) {
        this.wheels[i].disable();
      }
    },
    cancel() {
      //关闭
      this.hide();
    },
    confirm() {
      this.hide();
      const currentSelectedIndex = (this.selectedIndex = this.wheels.map(
        wheel => {
          return wheel.getSelectedIndex();
        }
      ));
      const pickerData = this.data;
      const currentSelectedValue = pickerData.map((data, index) => {
        return data[currentSelectedIndex[index]];
      });
      this.$emit("confirm", currentSelectedValue);
    },
    createWheel(wrapper, i) {
      if (!this.wheels[i]) {
        this.wheels[i] = new BScroll(wrapper.children[i], {
          wheel: {
            selectedIndex: this.selectedIndex[i],
            wheelWrapperClass: "wheel-scroller",
            wheelItemClass: "wheel-item",
            rotate: 25
          },
          observeDOM: false,
          click: true
        });
        let prevSelectedIndex = this.selectedIndex;
        this.wheels[i].on("scrollEnd", () => {
          //滚动完成之后获取当前选取的索引值
          const currentSelectedIndex = this.wheels.map(wheel =>
            wheel.getSelectedIndex()
          );
          this.changeData(currentSelectedIndex, prevSelectedIndex);
          prevSelectedIndex = currentSelectedIndex;
          this.$emit(EVENT_CHANGE, this.wheels[i].getSelectedIndex());
        });
      } else {
        this.wheels[i].refresh();
      }
      return this.wheels[i];
    },
    changeData(newSelect, oldSelect) {
      let years = [];
      let mouths = [];
      let days = [];
      if (!oldSelect) {
        years = dataFun(this.data1);
        mouths = dataFun(this.data1[newSelect[0]].children);
        days = dataFun(
          this.data1[newSelect[0]].children[newSelect[0]].children
        );
        this.data = [];
        this.data.push(years, mouths, days);
      } else {
        if (newSelect[0] !== oldSelect[0]) {
          mouths = dataFun(this.data1[newSelect[0]].children);
          days = this.data1[newSelect[0]].children[[newSelect[1]]].children;
          this.data.splice(1, 1, mouths);
          this.data.splice(2, 1, days);
          this.$nextTick(() => {
            this.wheels[1].refresh();
            this.wheels[2].refresh();
          });
        } else if (newSelect[1] !== oldSelect[1]) {
          days = this.data1[newSelect[0]].children[newSelect[1]].children;
          this.data.splice(2, 1, days);
          this.$nextTick(() => {
            this.wheels[2].refresh();
          });
        }
      }
    }
  },
};
function range(n, m, polyfill = false, unit = "") {
  let arr = [];
  for (let i = n; i <= m; i++) {
    let value = (polyfill && i < 10 ? "0" + i : i) + unit;
    arr.push({
      text: value,
      value: i
    });
  }
  return arr;
}

function dataFun(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = {
      text: arr[i].text,
      value: arr[i].value
    };
    newArr.push(obj);
  }
  return newArr;
}
</script>
<!--<style lang="scss">
/* fade */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
/* slide */
.slide-enter,
.slide-leave-to {
  opacity: 0.5;
  transform: translate3d(0, 270px, 0);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.picker-moke {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: -1;
}
.picker-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 270px;
  background: #fff;
}
.picker-nav {
  position: relative;
  height: 44px;
  color: #333;
}
.picker-nav::after {
  content: "";
  display: block;
  border-bottom: 1px solid #ebebeb;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: scaleY(0.5);
}
.picker-nav > span {
  position: absolute;
  height: 44px;
  line-height: 44px;
  padding: 0 12px;
  font-size: 14px;
}
.picker-cancel {
  left: 0;
  color: #999;
}
.picker-confirm {
  right: 0;
  color: #42b983;
}
.picker-content {
  position: relative;
  height: 226px;
  padding: 24px 12px;
  box-sizing: border-box;
}
.wheel-wrapper {
  display: flex;
  padding: 0 16px;
}
.wheel {
  -ms-flex: 1 1 1e-9px;
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
  -webkit-flex-basis: 1e-9px;
  -ms-flex-preferred-size: 1e-9px;
  flex-basis: 1e-9px;
  width: 1%;
  height: 173px;
  overflow: hidden;
  font-size: 18px;
}
.wheel-scroller {
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 68px;
  line-height: 36px;
  list-style: none;
}
.wheel-item {
  height: 34px;
  line-height: 34px;
  font-size: 17px;
  text-align: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #333;
}
.mask-top {
  position: absolute;
  top: 0;
  left: 0;
  background: linear-gradient(
    0deg,
    hsla(0, 0%, 100%, 0.4),
    hsla(0, 0%, 100%, 0.8)
  );
  z-index: 10;
  width: 100%;
  height: 92px;
  pointer-events: none;
}
.mask-bottom {
  position: absolute;
  bottom: 1px;
  left: 0;
  background: linear-gradient(
    180deg,
    hsla(0, 0%, 100%, 0.4),
    hsla(0, 0%, 100%, 0.8)
  );
  z-index: 10;
  width: 100%;
  height: 99px;
  pointer-events: none;
}
.border-bottom-1px:after,
.border-bottom-1px:before,
.border-top-1px:after,
.border-top-1px:before {
  content: "";
  display: block;
  position: absolute;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
}
.border-bottom-1px:after {
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  left: 0;
  bottom: 0;
}
.border-top-1px::before {
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  left: 0;
  top: 0;
}
</style>-->
