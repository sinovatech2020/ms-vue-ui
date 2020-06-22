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
<!--<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  /* .fade-leave-active below version 2.1.8 */
  opacity: 0;
}

.loading-box {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  > div.loading-container {
    background: rgba(0, 0, 0, 0.5);
    border-radius: 0.2rem;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px 20px;
    img {
      width: 30px;
      margin-bottom: 10px;
    }
    span {
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
