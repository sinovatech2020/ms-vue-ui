<template>
  <div class="ms-switch" @click="move">
    <div class="ms-switch-common" :class="{'ms-switch-on-gray':!value}" :style="{backgroundColor:bgColor}"></div>
    <div class="ms-switch-btn" :class="{'ms-switch-btn-on':value,'ms-switch-btn-off':!value}"></div>
  </div>
</template>
<script>
export default {
  name: "MsSwitch",
  props: {
    value: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      disable: false,
      actColor: "#ff6024",
      inactiveColor: "#fff"
    };
  },
  computed:{
      bgColor(){
          if(this.value){
              return this.actColor
          }else{
              return this.inactiveColor
          }
      }
  },
  methods: {
    move() {
      if (this.disable) {
        return;
      }
      this.$emit("input", !this.value);
      this.$emit("change",!this.value)
    }
  },
  mounted() {
    if(this.$attrs["active-color"]){
      this.actColor = this.$attrs["active-color"];
    }
    if(this.$attrs["inactive-color"]){
      this.inactiveColor = this.$attrs["inactive-color"];
    }
  }
};
</script>