<template>
  <div class="text">
    <un-popup v-model="show" :direction="'bottom'" @hide='hide'>
      <h4 class="share-tit">分享至</h4>
      <div class="share-sheet-wrapper">
        <div class="share-item" v-for="(item,index) in icons" :key="index" @click="shareClick(item.id)">
          <img :src="item.img" alt="">
          <span>{{item.tit}}</span>
        </div>
      </div>
      <div class="share-cancle" @click.stop="cancle">取消</div>
    </un-popup>
  </div>
</template>
<script>
export default {
  name: "MsShareSheet",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  props: {
    shareTitle: String,
    shareContent: String,
    shareURL: String,
    shareIconURL: String,
    shareWxTitle: String,
    shareWxContent: String,
    shareWxIconURL: String,
    miniProgramPath: String,
    miniProgramType: String //0 正式 1 开发 2体验
  },
  data() {
    return {
      show: false,
      icons: [
        {
          id: 1,
          tit: "微信好友",
          img: require("../../icons/icon2.png")
        },
        {
          id: 2,
          tit: "朋友圈",
          img: require("../../icons/icon3.png")
        },
        {
          id: 3,
          tit: "QQ好友",
          img: require("../../icons/icon4.png")
        },
        {
          id: 4,
          tit: "微博",
          img: require("../../icons/icon5.png")
        }
      ]
    };
  },
  watch: {
    value(n) {
      this.show = n;
    }
  },
  methods: {
    isIOS() {
      let u = navigator.userAgent;
      let isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      return isIOS;
    },
    miniProgramShare(shareInfo, params) {
      let list;
      if (!this.isIOS()) {
        list = params;
      } else {
        list = params.replace(",", "");
      }
      var shareConfig = {
        type: "shareDirectly",
        url: "",
        shareList: list
          ? list
          : "wechat,wechatmoments,qq,qzone,sinaweibo,email,shortmessage",
        msg: ""
      };
      let shareJson = shareInfo;
      shareJson["shareType"] = "url";
      shareConfig["shareJson"] = shareJson;
      if (this.isIOS()) {
        window.location = "clientAction=" + JSON.stringify(shareConfig);
      } else {
        js_invoke.interact(JSON.stringify(shareConfig));
      }
    },
    shareDirectly(shareTitle, shareContent, shareURL, shareIconURL, shareList) {
      let list;
      if (!this.isIOS()) {
        list = shareList;
      } else {
        list = shareList.replace(",", "");
      }
      let config = {
        type: "shareDirectly",
        msg: {
          title: "",
          backUrl: "javascript:void(0)",
          isReload: "N"
        },
        url: "",
        shareJson: {
          shareURL: shareURL,
          shareShortURL: "https://u.10010.cn/qAkRq",
          shareQrcodeURL:
            "https://m1.img.10010.com/suimg/20191108/b31ddc2168d14ead83634cffb617a956.gif",
          shareTitle: shareTitle,
          shareContent: shareContent,
          shareIconURL: shareIconURL,
          shareType: "url"
        },
        shareList: list
      };

      if (!this.isIOS()) {
        window.js_invoke.interact(JSON.stringify(config));
      } else {
        window.location = encodeURI("clientAction=" + JSON.stringify(config));
      }
    },
    shareClick(id) {
      let shareTitle = this.shareTitle;
      let shareContent =this.shareContent
      let shareURL = this.shareURL;
      let shareIconURL =this.shareIconURL
      //微信
      if (id === 1) {
        let shareWxTitle = this.shareWxTitle;
        let shareWxContent =this.shareWxContent
        let shareInfo = {
          miniProgramUserName: "gh_2bab3e2deed1",
          miniProgramPath: this.miniProgramPath,
          miniProgramType: this.miniProgramType, //0 正式 1 开发 2体验,
          miniProgramShare: "1",
          miniProgramWebpageUrl: shareURL,
          shareTitle: this.shareWxTitle,
          shareContent: this.shareWxContent,
          shareIconURL: this.shareWxIconURL
        };
        this.miniProgramShare(shareInfo, "wechat,");
        //朋友圈
      } else if (id === 2) {
        this.shareDirectly(
          shareTitle,
          shareContent,
          shareURL,
          shareIconURL,
          "wechatmoments,"
        );
        //qq
      } else if (id === 3) {
        this.shareDirectly(
          shareTitle,
          shareContent,
          shareURL,
          shareIconURL,
          "qq,"
        );
        //新浪
      } else if (id === 4) {
        this.shareDirectly(
          shareTitle,
          shareContent,
          shareURL,
          shareIconURL,
          "sinaweibo,"
        );
      }
      window.setShareStatus_Local = content => {
        this.$emit("shareCallBack",content)
      };
    },
    hide() {
      this.$emit("input", false);
    },
    cancle() {
      this.$emit("input", false);
      this.$emit("cancle");
    }
  }
};
</script>
<!--<style lang="scss">
.share-sheet-wrapper {
  display: flex;
  justify-content: space-around;
  box-sizing: border-box;
  padding-top: 20px;
}
.share-tit {
  font-size: 14px;
  color: #999;
  text-align: center;
  padding-top: 18px;
}
.share-item {
  width: 50px;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 100%;
    margin-bottom: 10px;
  }
}
.share-cancle {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-top: 1px solid #eeeeee;
  position: absolute;
  bottom: 0;
}
</style>
