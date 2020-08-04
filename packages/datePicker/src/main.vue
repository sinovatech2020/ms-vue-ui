<template>
  <div>
    <transition name="fade">
      <div class="picker-moke" v-show="value" @click="hide"></div>
    </transition>
    <transition name="slide">
      <div class="picker-wrap" v-show="value">
        <div class="picker-nav">
          <span class="picker-cancel" @click="cancel">取消</span>
          <span class="pciker-title" v-if="title">{{title}}</span>
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
      },
    },
    max: {
      type: Array,
      default() {
        return [2021, 12, 20];
      },
    },
    value: {
      type: Boolean,
      default: false,
    },
    title: String,
    row: {
      type: Number,
      default: 3,
    },
  },
  data() {
    return {
      wheels: [],
      selectedIndex: [0, 0, 0],
      data: [],
    };
  },
  computed: {
    data1() {
      let data = range(this.min[0], this.max[0], false, "年"); //输出月
      data.forEach((year) => {
        let minMonth = year.value === this.min[0] ? this.min[1] : 1; //返回  最小月份 如果没有则1
        let maxMonth = year.value === this.max[0] ? this.max[1] : 12; //返回 最大月份 如果没有返回12
        year.children = range(minMonth, maxMonth, false, "月"); //给年追加一个子数组月份
        year.children.forEach((month) => {
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
    },
  },
  watch: {
    value(n) {
      if (n) {
        setTimeout(()=>{
          this.show();
        },100)
      }
    },
  },
  mounted() {
    if (this.row === 2) {
      this.selectedIndex.pop();
    } else if (this.row === 1) {
      this.selectedIndex = this.selectedIndex.slice(0, 1);
    }
    console.log(this.selectedIndex);
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
        (wheel) => {
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
            rotate: 25,
          },
          observeDOM: false,
          click: true,
        });
        let prevSelectedIndex = this.selectedIndex;
        this.wheels[i].on("scrollEnd", () => {
          //滚动完成之后获取当前选取的索引值
          const currentSelectedIndex = this.wheels.map((wheel) =>
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
        if (this.row >= 1) {
          years = dataFun(this.data1);
        }
        if (this.row >= 2) {
          mouths = dataFun(this.data1[newSelect[0]].children);
        }
        if (this.row >= 3) {
          days = dataFun(
            this.data1[newSelect[0]].children[newSelect[0]].children
          );
        }
        this.data = [];
        if (years.length > 0) {
          this.data.push(years);
        }
        if (mouths.length > 0) {
          this.data.push(mouths);
        }
        if (days.length > 0) {
          this.data.push(days);
        }
      } else {
        if (newSelect[0] !== oldSelect[0]) {
          if (this.row >= 2) {
            mouths = dataFun(this.data1[newSelect[0]].children);
            this.data.splice(1, 1, mouths);
            this.$nextTick(() => {
              this.wheels[1].refresh();
            });
          }
          if (this.row >= 3) {
            days = this.data1[newSelect[0]].children[[newSelect[1]]].children;
            this.data.splice(2, 1, days);
            this.$nextTick(() => {
              this.wheels[2].refresh();
            });
          }
        } else if (newSelect[1] !== oldSelect[1]) {
          if (this.row >= 3) {
            days = this.data1[newSelect[0]].children[newSelect[1]].children;
            this.data.splice(2, 1, days);
            this.$nextTick(() => {
              this.wheels[2].refresh();
            });
          }
        }
      }
    },
  },
};
function range(n, m, polyfill = false, unit = "") {
  let arr = [];
  for (let i = n; i <= m; i++) {
    let value = (polyfill && i < 10 ? "0" + i : i) + unit;
    arr.push({
      text: value,
      value: i,
    });
  }
  return arr;
}

function dataFun(arr) {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let obj = {
      text: arr[i].text,
      value: arr[i].value,
    };
    newArr.push(obj);
  }
  return newArr;
}
</script>