<template>
  <div class="un-scroll-box">
    <input type="text">
    <button @click="showClick">showClick</button>
    <ms-date-picker v-model="show" @confirm='confirm' :min='min' :max='max' :title='tit' :row='3' ref="myPicker"></ms-date-picker>
  </div>
</template>
<script>
import "../packages/theme/src/datePicker.scss";
export default {
  data() {
    return {
      min: [1998, 1, 1],
      max: [2030, 12, 31],
      tit: "我是要给标题",
      show: false,
    };
  },
  methods: {
    confirm(val) {
      console.log(val);
    },
    showClick() {
      this.show = true;
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
