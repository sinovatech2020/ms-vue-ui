<template>
  <div class="text">
    <button @click="showClick">click 显示日期</button>
    <ms-date-picker v-model="display" @confirm='confirm' :min='min' :max='max'></ms-date-picker>
  </div>
</template>
<script>
import '../packages/theme/src/datePicker.scss'
export default {
  data() {
    return {
      display: false,
      min:[2019,3,1],
      max:[2020,6,15]
    };
  },
  methods: {
    showClick(){
      this.display=true
    },
    confirm(res){
      console.log(res)
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
