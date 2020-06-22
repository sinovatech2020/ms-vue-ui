<template>
    <transition name="fade">
      <div class="toast-text" v-show="theToast">
        <div class="toast-success">
          <img v-show="iconType==='success'" class="toast-icon" src="../../icons/suc_icon.png" alt="">
          <img v-show="iconType==='fail'" class="toast-icon" src="../../icons/fail_icon.png" alt="">
          <img v-show="iconType==='loading'" class="toast-icon toast-rotate" src="../../icons/loading.png" alt="">
          <span>{{message}}</span>
        </div>
      </div>
    </transition>
</template>
<script>
export default {
  name: "MsToast",
  props: {
    message: String,
    iconType:String
  },
  data() {
    return {
      theToast: false
    };
  }
};
</script>
<!--<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.toast-success {
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  font-size: 14px;
  line-height: 20px;
  z-index: 99999;
  span {
    max-width: 140px;
  }

  padding: 8px 12px;
  color: #fff;
}
.toast-icon{
  width: 20px;
  margin-right: 10px;
}
.toast-rotate{
  animation: toastRotate 2s linear infinite;
}
@keyframes toastRotate {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
