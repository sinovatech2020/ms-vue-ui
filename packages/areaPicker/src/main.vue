<template>
  <div>
    <transition name="fade">
      <div class="picker-moke" v-show="show" @click="hide"></div>
    </transition>
    <transition name="slide">
      <div class="picker-wrap" v-show="show">
        <div class="picker-nav">
          <span class="picker-cancel" @click="cancel">取消</span>
          <span class="picker-confirm" @click="confirm">确认</span>
        </div>
        <div class="picker-content">
          <div class="mask-top border-bottom-1px"></div>
          <div class="mask-bottom border-top-1px"></div>
          <div class="wheel-wrapper" ref="wrapper">
            <template v-if="insideData">
              <div class="wheel" v-for="(col, index) in insideData" :key="index">
                <ul class="wheel-scroller">
                  <li class="wheel-item" v-for="(item, index) in col" :key="index">
                    {{ item.text }}
                  </li>
                </ul>
              </div>
            </template>
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
  name: "MsAreaPicker",
  props: {
    row: {
      type: Number,
      default: 3,
    },
    pickerData: {
      type: Array,
      default: () => [],
    },
    show: Boolean,
    selected: {
      type: Array,
      default: () => [0, 0, 0],
    },
  },
  model: {
    prop: "show",
    event: "hide",
  },
  watch: {
    pickerData(n) {
      if (n) {
        // 初始化数据
        this.changeData(this.selectedIndex, undefined);
      }
    },
    show(n) {
      if (n) {
        console.log("显示");
        this.visibable();
      }
    },
    selected(n) {
      if (n) {
        this.selectedIndex = n;
      }
    },
  },
  data() {
    return {
      wheels: [],
      insideData: [],
      saveNum: 0,
      selectedIndex: [0, 0, 0],
    };
  },
  methods: {
    visibable() {
      //如果没有wheels对象 创建wheels 对象
      if (this.wheels.length === 0 && this.insideData.length !== 0) {
        this.$nextTick(() => {
          let wrapper = this.$refs.wrapper;
          for (let i = 0; i < this.insideData.length; i++) {
            this.createWheel(wrapper, i);
          }
        });
      } else {
        //如果有  停止运动  滚动到上一次所选择的
        for (let i = 0; i < this.insideData.length; i++) {
          this.wheels[i].enable();
          this.wheels[i].wheelTo(this.selectedIndex[i]);
        }
      }
      this.saveNum = 1;
    },
    hide() {
      //隐藏 移除wheels 对象
      this.$emit("hide", false);
      // this.show = false;
      if (this.wheels.length !== 0) {
        for (let i = 0; i < this.insideData.length; i++) {
          this.wheels[i].disable();
        }
      }
    },
    cancel() {
      //关闭
      this.hide();
    },
    confirm() {
      if (!this.isMoveing()) {
        return;
      }
      this.hide();
      this.restPendding();
      const currentSelectedIndex = (this.selectedIndex = this.wheels.map(
        (wheel) => {
          return wheel.getSelectedIndex();
        }
      ));
      const pickerData = this.insideData;
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
            rotate: 30,
          },
          probeType: 3,
        });
        this.wheels[i].isMoveing = true;
        let prevSelectedIndex = this.selectedIndex;
        this.wheels[i].on("scrollStart", () => {
          this.restPendding();
        });
        this.wheels[i].on("scrollEnd", () => {
          this.wheels[i].isMoveing = true;
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
      if (this.row === 1) {
        if (!oldSelect) {
          let provinces = [];
          mapFun(provinces, this.pickerData);
          this.insideData.push(provinces);
        }
      } else if (this.row === 2) {
        let provinces = [],
          cityes = [];
        if (!oldSelect) {
          // 如果没有上一次选中的 遍历 数据 在省数组中追加对象
          mapFun(provinces, this.pickerData);
          mapFun(cityes, this.pickerData[newSelect[0]].cityes);
          this.insideData = [];
          this.insideData.push(provinces, cityes);
        } else {
          if (newSelect[0] !== oldSelect[0]) {
            cityes = this.pickerData[newSelect[0]].cityes;
            this.insideData.splice(1, 1, cityes);
            this.$nextTick(() => {
              this.wheels[1].refresh();
            });
          }
        }
      } else {
        let provinces = [],
          cityes = [],
          areas = [];
        if (!oldSelect) {
          // 如果没有上一次选中的 遍历 数据 在省数组中追加对象
          mapFun(provinces, this.pickerData);
          mapFun(cityes, this.pickerData[newSelect[0]].cityes);
          mapFun(
            areas,
            this.pickerData[newSelect[0]].cityes[newSelect[0]].areas
          );
          this.insideData = [];
          this.insideData.push(provinces, cityes, areas);
          console.log(this.insideData);
        } else {
          if (newSelect[0] !== oldSelect[0]) {
            cityes = this.pickerData[newSelect[0]].cityes;
            areas = this.pickerData[newSelect[0]].cityes[newSelect[1]].areas;
            this.insideData.splice(1, 1, cityes);
            this.insideData.splice(2, 1, areas);
            this.$nextTick(() => {
              this.wheels[1].refresh();
            });
          }
          if (newSelect[1] !== oldSelect[1]) {
            areas = this.pickerData[newSelect[0]].cityes[newSelect[1]].areas;
            this.insideData.splice(2, 1, areas);
            this.$nextTick(() => {
              this.wheels[2].refresh();
            });
          }
        }
      }
      if (this.show && this.saveNum === 0) {
        this.visibable();
        
      }
    },
    isMoveing() {
      return this.wheels.some((wheel) => {
        return wheel.isMoveing;
      });
    },
    restPendding() {
      this.wheels.forEach((wheel) => {
        wheel.isMoveing = false;
      });
    },
  },
};
const mapFun = function (map, arr) {
  arr.forEach((item, index) => {
    let text = item.provice ? item.provice : item.text;
    map.push({
      text: text,
      value: item.value,
    });
  });
};
</script>
