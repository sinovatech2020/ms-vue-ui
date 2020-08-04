<template>
  <div class="un-scroll-box">
    <button @click="handleClick">showClick</button>
    <ms-area-picker v-model="show" @confirm='confirm' :pickerData='pickerData' :row='2'></ms-area-picker>
  </div>
</template>
<script>
import "../packages/theme/src/areaPicker.scss";
export default {
  data() {
    return {
      pickerData: [],
      show: false,
    };
  },
  methods: {
    handleClick() {
      this.show = true;
    },
    confirm(data) {
      console.log(data);
    },
  },
  mounted() {
    // setTimeout(() => {
      this.pickerData = all();
      console.log(this.pickerData);
    // }, 2000);
  },
};
const randomFun = function () {
  return Math.floor(Math.random() * 5);
};
const all = function () {
  let provice = ["北京", "上海", "广州", "山东", "天津"];
  let values = ["011", "012", "013", "014", "015"];
  let citys = ["城市1", "城市2", "城市3", "城市4", "城市5"];
  let areas = ["区域1", "区域2", "区域3", "区域4", "区域5"];
  let arr = [];
  for (let i = 0; i < 10; i++) {
    let provices = {
      provice: provice[randomFun()],
      value: values[randomFun()],
      cityes: [],
    };
    for (let j = 0; j < 6; j++) {
      let citye = {
        text: citys[randomFun()],
        value: values[randomFun()],
        areas: [],
      };
      provices.cityes.push(citye);
      for (let k = 0; k < 6; k++) {
        let area = {
          text: areas[randomFun()],
          value: values[randomFun()],
        };
        provices.cityes[j].areas.push(area);
      }
    }
    arr.push(provices);
  }
  return arr;
};
</script>
<style lang="scss" scoped>
</style>
