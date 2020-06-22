<template>
  <div class="text">
    <div class="un-scroll-box">
      <UnScroll @pullUpFun='pullUpFun' @pullDownFun='pullDownFun'>
        <div v-for="(item,index) in list" :key="index">
          <div class="item">{{item}}</div>
        </div>
      </UnScroll>
    </div>
  </div>
</template>
<script>
const arr = () => {
  return [...new Array(30).keys()];
};
export default {
  data() {
    return {
      list: arr()
    };
  },
  methods: {
    pullDownFun(cb){
      setTimeout(()=>{
        this.list=arr();
        cb()
      },2000)
    },
    pullUpFun(cb) {
      console.log(arr());
      setTimeout(() => {
        this.list=this.list.concat(arr());
        cb(false);
      }, 1000);
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.un-scroll-box {
  position: absolute;
  top: 100px;
  left: 0;
  bottom: 0;
  right: 0;
}
.text {
  height: 2000px;
}
.item {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  background: #ccc;
}
</style>
