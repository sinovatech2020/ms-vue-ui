<template>
  <div class="btn-wrapper" :style="bg" @click="handleClick">
    <span>{{msg}}</span>
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
    }
  },
  computed: {
    bg() {
      if (this.disable && this.type === "default") {
        return {
          background: "#ff6024"
        };
      } else if (this.disable && this.type === "empty") {
        return {
          border: "1px solid #ff6024",
          color: "#ff6024"
        };
      } else if (!this.disable && this.type === "default") {
        return {
          background: "#ccc"
        };
      } else {
        return {
          border: "1px solid #ccc",
          color: "#ccc"
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
<!--<style lang="scss">
@import "../../../src/styles/var.scss";
.btn-wrapper {
  width: calc(100% - 80px);
  margin: 0 auto;
  height: 40px;
  color: $defult-color;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  font-weight: bold;
  span {
    font-size: 18px;
  }
}
</style>-->