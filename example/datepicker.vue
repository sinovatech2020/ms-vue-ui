<template>
  <div class="text">
    <button @click="showClick">click 显示日期</button>
    <Un-date-picker v-model="display" @confirm='confirm' :min='min' :max='max'></Un-date-picker>
  </div>
</template>
<script>
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
