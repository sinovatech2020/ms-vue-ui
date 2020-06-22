<template>
  <div class="switch-cell-wrapper">
    <div class="switch-cell-box" :style="transform" @touchstart='touchStart' @touchmove="touchMove" @touchend='touchEnd'>
      <slot></slot>
    </div>
  </div>
</template>
<script>
const MIN_DISTANCE = 10;
function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    return "horizontal";
  }

  if (y > x && y > MIN_DISTANCE) {
    return "vertical";
  }

  return "";
}
export default {
  name: "MsSwtichCell",
  data() {
    return {
      startX: 0,
      startY: 0,
      deltaX: 0,
      deltaY: 0,
      offsetX: 0,
      offsetY: 0,
      direction: "",
      x: 0,
      transition: 0.3
    };
  },
  props:{
    move:Number,
    unit:{
      type:String,
      default:'px'
    }
  },
  computed: {
    transform() {
      return `transform: translate3d(${this.x}${this.unit}, 0px, 0px); transition-duration: ${this.transition}s;`;
    }
  },
  methods: {
    touchStart(e) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove(e) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction =
        this.direction || getDirection(this.offsetX, this.offsetY);
      if (this.direction === "horizontal" && this.deltaX < 0) {
        //   水平向左
        this.deltaX < -this.move ? (this.x = -this.move) : (this.x = this.deltaX);
      }
    },
    touchEnd(e) {
      if (this.deltaX < -30) {
        this.x = -this.move;
      } else {
        this.x = 0;
      }
    },
    resetTouchStatus() {
      this.direction = "";
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }
};
</script>