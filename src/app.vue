<template>
  <div class="un-scroll-box">
    <ms-scroll @pullUpFun='pullUpFun' @pullDownFun='pullDownFun' ref='myScroll'>
      <div v-for="(item,index) in list" :key="index">
        <div class="item">{{item}}</div>
      </div>
    </ms-scroll>
  </div>
</template>
<script>
import '../packages/theme/src/scroll.scss'
const arr = () => {
  return [...new Array(30).keys()];
};
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    pullDownFun(cb) {
      setTimeout(() => {
        this.list = arr();
        cb();
      }, 2000);
    },
    pullUpFun(cb) {
      console.log(arr());
      setTimeout(() => {
        this.list = this.list.concat(arr());
        cb(false);
      }, 1000);
    }
  },
  mounted() {
    // setTimeout(()=>{
      this.list=arr()
      this.$nextTick(()=>{
        this.$refs.myScroll.bscroll.refresh();
      })
    // },2000)
  }
};
</script>
<style lang="scss" scoped>
.un-scroll-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.item {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  background: #ccc;
}
</style>
