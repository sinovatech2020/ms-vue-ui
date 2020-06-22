<template>
  <div class="text">
    <template v-for="(item,index) in list">
      <ms-swtich-cell :move="move" :unit='unit'>
        <div>
          <div class="switch-cell">
            {{item.name}}
          </div>
          <div class="switch-cell-right" @click="delClick(index)">
            删除
          </div>
        </div>
      </ms-swtich-cell>
    </template>
  </div>
</template>
<script>
import MsSwtichCell from "../packages/switchCell/src/main.vue";
export default {
  components: {
    MsSwtichCell
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
      move:60,
      unit:"px"
    };
  },
  methods: {
    delClick(idx) {
      this.list.splice(idx, 1);
    }
  }
};
</script>
<style lang="scss" scoped>
.text{
  width: 375px;
  overflow: hidden;
}
.switch-cell {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  overflow: hidden;
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
}
.switch-cell-right {
  position: absolute;
  top: 0;
  height: 100%;
  right: 0;
  width: 60px;
  line-height: 42px;
  text-align: center;
  color: #fff;
  background-color: #ee0a24;
  border: 1px solid #ee0a24;
  transform: translate3d(100%, 0, 0);
  font-size: 14px;
}
</style>
