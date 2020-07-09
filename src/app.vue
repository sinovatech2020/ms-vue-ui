<template>
  <div class="text">
    <ms-switch v-model="checked" :disabled='disabled'  @change='change'></ms-switch>
  </div>
</template>
<script>
import "../packages/theme/src/switch.scss";
export default {
  data() {
    return{
      checked:false,
      disabled:false
    }
  },
  methods:{
    change(value){
      console.log(value)
    }
  }
};
</script>
