<template>
  <transition name='fade'>
    <div class="loading-box" v-show="display">
      <div class="loading-container">
        <img src="../../icons/loading.gif" alt="">
        <span>{{message}}</span>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "MsLoading",
  props: {
    display: Boolean,
    message:String
  }
};
</script>
