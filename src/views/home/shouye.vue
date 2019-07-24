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
        "https://v1.qzone.cc/pic/201407/20/16/23/53cb7c8766eba761.jpg!600x600.jpg"
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
      url: "http://10.8.157.63:8080/user/showDynamic"
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
        url: "http://10.8.157.63:8080/user/saveOrUpdateAttention",
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
