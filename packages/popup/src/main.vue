<template>
  <transition name='fade'>
    <div class="popup-moke" v-show="value" @click="hidePopup">
      <transition :name="`slide-${direction}`">
        <div class="popup-wrap" :class='[className]' v-show="value" @click.stop>
          <slot></slot>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
export default {
  name: "MsPopup",
  props: {
    value: {
      default: false,
      type: Boolean
    },
    direction: {
      default: "top",
      type: String
    }
  },
  computed: {
    className() {
      return `popup-${this.direction}`;
    }
  },
  methods: {
    hidePopup() {
      this.$emit("input", false);
      this.$emit("hide")
    }
  }
};
</script>