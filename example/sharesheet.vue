<template>
  <div class="text">
    <button @click="showShare">click</button>
    <un-share-sheet v-model="show" @cancle='cancle'></un-share-sheet>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  methods: {
    showShare() {
      this.show = true;
    },
    cancle() {
      console.log("取消时间");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
