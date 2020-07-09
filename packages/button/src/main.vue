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