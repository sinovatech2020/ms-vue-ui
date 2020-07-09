<template>
  <div class="pulldown view">
    <div ref="bsWrapper" id="bsWrapper" class="pulldown-bswrapper">
      <div class="pulldown-scroller">
        <div class="pulldown-wrapper" v-if="pullDownEnable">
          <div v-show="beforePullDown">
            <span>下拉刷新</span>
          </div>
          <div v-show="!beforePullDown">
            <div v-show="isPullingDown">
              <span>
                <img class="loadingImg" src="../../icons/loading.gif" alt="">
                加载中...
              </span>
            </div>
            <div v-show="!isPullingDown"><span>刷新成功</span></div>
          </div>
        </div>
        <div class="pulldown-list" ref="wrapper">
          <slot></slot>
        </div>
        <div class="pullup-wrapper" v-show="!isPullingDown">
          <div v-if="!isPullUpLoad" class="before-trigger">
            <span class="pullup-txt">{{upText}}</span>
          </div>
          <div v-else class="after-trigger">
            <span class="pullup-txt">
              <img class="loadingImg" src="../../icons/loading.gif" alt="">
              加载中...
            </span>
          </div>
        </div>
      </div>
    </div>
    <img class="scollTop" v-show="S_IMG_SHOW"  src="../../icons/top.png" @click="goTop" alt="">
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import PullDown from "@better-scroll/pull-down";
import Pullup from "@better-scroll/pull-up";
BScroll.use(PullDown);
BScroll.use(Pullup);

const TIME_BOUNCE = 800;
const TIME_STOP = 600;
const THRESHOLD = 70;
const STOP = 56;
let STEP = 0;

export default {
  name:"MsScroll",
  props: {
    pullDownEnable: {
      default: true,
      type: Boolean
    }
  },
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false,
      isPullUpLoad: false,
      upText: "上拉加载更多",
      y: "",
      bscroll:null
    };
  },
  created() {
    this.bscroll = null;
  },
  mounted() {
    this.initBscroll();
  },
  computed: {
    S_IMG_SHOW() {
      if (Math.abs(this.y) > 2 * document.body.offsetHeight) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    initBscroll() {
      this.bscroll = new BScroll("#bsWrapper", {
        scrollY: true,
        pullUpLoad: true,
        click: true,
        bounce: {
          top: this.pullDownEnable
        },
        bounceTime: TIME_BOUNCE,
        pullDownRefresh: {
          threshold: THRESHOLD,
          stop: STOP
        }
      });
      this.bscroll.noMoreFun = this.noMoreFun;
      if (this.pullDownEnable) {
        this.bscroll.on("pullingDown", this.pullingDownHandler);
      } else {
        this.bscroll.closePullDown();
      }
      this.bscroll.on("scroll", this.scrollHandler);
      this.bscroll.on("pullingUp", this.pullingUpHandler);
    },
    scrollHandler(pos) {
      this.y = pos.y;
    },
    //下拉刷新
    pullingDownHandler() {
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$emit("pullDownFun", this.finishPullDown);
      this.bscroll.openPullUp();
      // this.upText = "下拉刷新";
    },
    finishPullDown() {
      this.isPullingDown = false;
      this.bscroll.finishPullDown();
      setTimeout(() => {
        this.beforePullDown = true;
        this.bscroll.refresh();
      }, 200);
    },
    //上拉加载
    pullingUpHandler() {
      this.isPullUpLoad = true;
      this.$emit("pullUpFun", this.finishPullUp);
    },
    finishPullUp(noMore = true) {
      this.bscroll.finishPullUp();
      setTimeout(() => {
        this.isPullUpLoad = false;
        if (noMore) {
          this.bscroll.refresh();
        } else {
          this.noMoreFun();
        }
      }, 200);
    },
    noMoreFun() {
       this.bscroll.refresh();
      this.upText = "没有更多数据";
      this.bscroll.closePullUp();
    },
    //回到顶部
    goTop() {
      this.bscroll.scrollTo(0, 0, 1000);
    }
  }
};
</script>