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

/**slide top */
.slide-top-enter,
.slide-top-leave-to {
  opacity: 0.5;
  transform: translate3d(0, -270px, 0);
}

.slide-top-enter-active,
.slide-top-leave-active {
  transition: all 0.3s ease;
}

/* slide bottom */
.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0.5;
  transform: translate3d(0, 270px, 0);
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: all 0.3s ease;
}

/* slide right */

.slide-right-enter,
.slide-right-leave-to {
  opacity: 0.5;
  transform: translate3d(300px, 0, 0);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

/* slide left */
.slide-left-enter,
.slide-left-leave-to {
  opacity: 0.5;
  transform: translate3d(-300px, 0, 0);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.popup-moke {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.popup {
  &-bottom {
    width: 100%;
    height: 270px;
    background: #fff;
    position: absolute;
    bottom: 0;
  }
  &-right {
    width: 300px;
    height: 100%;
    background: #fff;
    position: absolute;
    right: 0;
  }
  &-left {
    width: 300px;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
  }
  &-top {
    width: 100%;
    height: 270px;
    background: #fff;
    position: absolute;
    top: 0;
  }
}
</style>