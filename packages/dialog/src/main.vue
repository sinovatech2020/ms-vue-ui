<template>
  <transition name='fade' @before-enter='beforeEnter' @after-enter="onOpened" @after-leave='onClosed'>
    <div class="dialog-wrapper" v-show="value">
      <transition name='dialog'>
        <div class="dialog-container" v-show="value">
          <h2 class="dialog-title" v-show="title">{{title}}</h2>
          <div class="dialog-content" :style="{textAlign:align}">
            {{content}}
          </div>
          <div class="dialog-footer" v-show="showConfirm||showCancle">
            <div class="center cancle" v-show="showConfirm" @click="cancel">{{cancelText}}</div>
            <div class="center confirm" v-show="showCancle" @click="confirm">{{confirmText}}</div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
import LockBackground from "../../mixins/lockBackground.js";
export default {
  name: "MsDialog",
  mixins: [LockBackground],
  props: {
    value: { type: Boolean, default: false },
    title: {
      default: "",
      type: String
    },
    content: {
      default: "这是一个默认数据",
      type: String
    },
    align: {
      default: "center",
      type: String
    },
    showConfirm: {
      default: true,
      type: Boolean
    },
    confirmText: {
      default: "完成",
      type: String
    },
    cancelText: {
      default: "取消",
      type: String
    },
    showCancle: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    hide() {
      this.$emit("input", false);
    },
    confirm() {
      this.hide();
      this.$emit("confirm");
    },
    cancel() {
      this.hide();
      this.$emit("cancel");
    },
    beforeEnter() {
      this.open();
    },
    onOpened() {
      this.$emit("opened");
    },
    onClosed() {
      this.close();
      this.$emit("closed");
    }
  }
};
</script>
<!--<style lang="scss">
@import "../../../src/styles/var.scss";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.dialog-enter,
.dialog-leave-to {
  opacity: 0;
  transform: scale(1.1);
}

.dialog-enter-active,
.dialog-leave-active {
  transition: all 0.3s ease;
}

.dialog-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.dialog-container {
  width: 320px;
  background: #fff;
  border-radius: 10px;
  position: absolute;
  top: 30%;
  left: 50%;
  margin-left: -160px;
  // transform: translate3d(-50%, -50%, 0) ;
  // animation: dialog-zoom 0.5s;
}
.dialog-title {
  font-size: $default-font;
  padding-top: 24px;
  text-align: center;
}
.dialog-content {
  padding-top: 12px;
  padding: 24px;
  font-size: 14px;
  line-height: 20px;
}
.dialog-footer {
  height: 50px;
  border-top: 1px solid #f5f5f5;
  display: flex;
  align-items: center;
  div {
    text-align: center;
    flex: 1;
    height: 100%;
    font-size: 14px;
  }
  .confirm {
    color: $btn-default;
  }
  .cancle {
    color: $btn-gray;
  }
}
</style>