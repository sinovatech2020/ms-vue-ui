<template>
  <transition name="fade">
    <div class="moke" @click="hideMoke" v-show="value"></div>
  </transition>
</template>
<script>
export default {
  name: "MsMoke",
  props: {
    value: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    hideMoke() {
      console.log("改变");
      this.$emit("input", false);
    }
  }
};
</script>
<!--<style lang="scss">
/* fade */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.moke {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
</style>