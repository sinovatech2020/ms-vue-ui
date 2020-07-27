<template>
  <div class="btn-wrapper" :style="bg" @click="handleClick">
    <span class="btn-text" :style="{fontSize:fontSize}">{{msg}}</span>
  </div>
</template>
<script>
export default {
  name: "MsButton",
  props: {
    msg: {
      default: "完成",
      type: String
    },
    disable: {
      default: false,
      type: Boolean
    },
    type: {
      default: "default",
      type: String
    },
    width: String,
    height: String,
    fontSize: String
  },
  computed: {
    bg() {
      if (this.disable && this.type === "default") {
        return {
          background: "#ff6024",
          width: this.width,
          height: this.height
        };
      } else if (this.disable && this.type === "empty") {
        return {
          border: "1px solid #ff6024",
          color: "#ff6024",
          width: this.width,
          height: this.height
        };
      } else if (!this.disable && this.type === "default") {
        return {
          background: "#ccc",
          width: this.width,
          height: this.height
        };
      } else {
        return {
          border: "1px solid #ccc",
          color: "#ccc",
          width: this.width,
          height: this.height
        };
      }
    }
  },
  methods: {
    handleClick() {
      if (this.disable) {
        this.$emit("clickCb");
      }
    }
  }
};
</script>