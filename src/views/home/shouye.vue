<template>
  <div class="main">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" style="width: 100vw;
  height: 30vh;" />
      </van-swipe-item>
    </van-swipe>

    <div class="cir">
      <ul>
        <li v-for="item in images1" @click="zhiye(item.job)">
          <img :src="item.img" />
          <p>{{item.job}}</p>
        </li>
      </ul>
    </div>
    <div class="fabu">
      <van-nav-bar
        z-index:1
        left-text="附近动态"
        right-text="发布动态+"
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <div>
      <ul>
        <li style="position:relative;padding:14px;height:auto" v-for="item in info">
          <van-image
            style="float:left"
            width="100"
            height="100"
            :src="item.headportrait"
            @click="xiqin(item.userId)"
          />
          <p
            style="width:160px;float:left ;text-align:left;margin-left:20px;font-size:20px;"
          >{{item.username}}</p>
          <p
            style="width:160px;float:left ;text-align:left;margin-left:20px;margin-top:10px"
          >{{item.dynamicTime}}</p>
          <van-button @click="showPopup">
            <van-icon name="arrow-down" />
          </van-button>
          <van-popup class="dongtai" v-model="show">
            <div @click="guanzhu(item.userId)">
              <van-icon name="star-o" />
              <span>关注Ti</span>
            </div>
            <div @click="pingbi">
              <van-icon name="closed-eye" />
              <span>屏蔽Ti</span>
            </div>
            <div @click="jubao">
              <van-icon name="info-o" />
              <span>举报Ti</span>
            </div>
          </van-popup>

          <div class="neirong">
            <p>{{item.dynamiccontent}}</p>
            <img :src="item.dynamicImgUrl" :class="item.dynamicImgUrl!=null?'img1':'img2'" />
          </div>
          <input style="float:left;margin-top:10px" type="text" />
          <van-icon name="like-o" size="23px" style="margin-top:10px" />
          <van-icon name="comment-o" size="23px" style="margin-top:10px;margin-left:5px" />
          <van-icon name="share" size="23px" style="margin-top:10px;margin-left:5px" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      images: [
        "http://img.netbian.com/file/2019/0505/smallcb065d8cccb2a29e2281c08d1f95051a1557064612.jpg",
        "http://img.netbian.com/file/2019/0604/smalla629ce509cc91156612cc5af9f7aa25d1559658072.jpg",
        "data:image/jpeg;base64,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"
      ],
      images1: [
        { img: "https://img.yzcdn.cn/vant/apple-4.jpg", job: "事业单位" },
        { img: "https://img.yzcdn.cn/vant/apple-4.jpg", job: "商业人员" },
        { img: "https://img.yzcdn.cn/vant/apple-4.jpg", job: "教师" },
        { img: "https://img.yzcdn.cn/vant/apple-4.jpg", job: "医生" },
        {
          img:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=361657734,3278680714&fm=26&gp=0.jpg",
          job: "护士"
        }
      ],
      show: false,
      info: ""
    };
  },
  beforeCreate() {
    this.$store.commit("lefttitle", "返回"); //定义导航左侧名字
    this.$store.commit("righttitle", ""); //定义导航右侧按钮名字，没功能可以为空
    this.$store.commit("changeTitle", "首页"); //定义导航中间名字
    this.$store.commit("footercheck", "home"); //底部按钮锁定，名字为路由跳转名字
  },
  mounted() {
    axios({
      method: "get",
      url: "https://10.8.157.63:8080/user/showDynamic"
    }).then(res => {
      this.info = res.data;
    });
  },
  methods: {
    onClickLeft() {
      console.log(1);
    },
    onClickRight() {
      this.$router.push({ name: "dongtai" });
    },
    showPopup() {
      this.show = true;
    },
    guanzhu(ouserId) {
      // console.log("关注");
      // console.log(ouserId);
      var userId = localStorage.getItem("userId");
      var data = {
        attention: userId,
        focused: ouserId
      };
      axios({
        mothed: "post",
        url: "https://10.8.157.63:8080/user/saveOrUpdateAttention",
        params: data
      }).then(res => {
        // console.log(res);
        if (res.data == 1) {
          Toast("关注成功");
        } else {
          Toast("取消关注");
        }
      });
    },
    pingbi() {
      console.log("屏蔽");
    },

    jubao() {
      console.log("举报");
    },
    zhiye(i) {
      // console.log(i);
      this.$router.push({ name: "shaixuan", query: { job: i } });
    },
    xiqin(userId) {
      // console.log(userId);
      this.$router.push({ name: "detail", query: { userId: userId } });
    }
  }
};
</script>

<style scoped>
h2,
li,
p,
div {
  margin: 0;
  padding: 0;
}

.cir {
  height: 130px;
  overflow: hidden;
}
.cir li {
  margin: 20px 0.29rem;
  float: left;
  height: auto;
}
.cir img {
  width: 13vw;
  height: 13vw;
  border: 1px solid #000;
  border-radius: 50%;
}
.fabu div {
  font-size: 20px;
  color: #000;
}
.dongtai {
  position: absolute;
  overflow: hidden;
  padding: 20px;
  height: 50px;
  width: 120px;
  left: 283px;
  top: 87px;
}
.neirong {
  height: auto;
  width: 92vw;
  border: 1px solid #000;
  margin: 0 auto;
  margin-top: 60px;
}
.img1 {
  width: 100px;
  height: 100px;
}
.img2 {
  display: none;
}
</style>
