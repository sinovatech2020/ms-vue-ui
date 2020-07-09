<template>
  <transition name='fade' @before-enter='beforeEnter' @after-enter="onOpened" @after-leave='onClosed'>
    <div class="dialog-wrapper" v-show="value">
      <transition name='dialog'>
        <div class="dialog-container" v-show="value">
          <slot></slot>
          <h2 class="dialog-title" v-show="title">
            <img class="dialog-icon" :src="icon" v-if="icon" alt="">
            <span>{{title}}</span>
          </h2>
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
    },
    icon:String
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