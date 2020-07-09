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