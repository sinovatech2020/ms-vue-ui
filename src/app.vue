<template>
  <div class="text">
    <button @click="showClick">click</button>
    <ms-popup v-model="show" :direction="'right'">
      <input type="text">
    </ms-popup>
  </div>
</template>
<script>
import MsPopup from "../packages/popup/src/main.vue";
import '../packages/theme/src/popup.scss'
export default {
  components: {
    MsPopup
  },
  data() {
    return {
      show: false,
      list: [
        {
          name: "hly1",
          id: 0
        },
        {
          name: "hly2",
          id: 1
        },
        {
          name: "hly3",
          id: 2
        },
        {
          name: "hly4",
          id: 3
        }
      ],
      move: 60,
      unit: "px"
    };
  },
  methods: {
    showClick(){
      this.show=true
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
