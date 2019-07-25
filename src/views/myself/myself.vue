<template>
  <div id="myself-box" :style="{'height':height}">
    <div class="top-box">
      <div class="img-box">
        <div class="img">
          <img :src="this.$store.state.values.headportrait" alt />
        </div>
      </div>
      <p>
        邮箱名:
        <span>{{email}}</span>
      </p>
    </div>
    <div class="msg-box">
      <div @click="wdxx">
        <p>12</p>
        <span>我的消息</span>
      </div>
      <div @click="wdyf">
        <p>12</p>
        <span>我的缘分</span>
      </div>
      <div @click="wdhd">
        <p>12</p>
        <span>我的活动</span>
      </div>
    </div>
    <div class="list-box">
      <li class="fw">我的服务</li>
      <li @click="toxxzs">
        <van-icon name="description" />
        <span>编辑资料</span>
      </li>
      <li @click="wdgz">
        <van-icon name="like-o" />
        <span>我的关注</span>
      </li>
      <li @click="todongtai">
        <van-icon name="eye-o" />
        <span>我的动态</span>
      </li>
      <li @click="toXgmm">
        <van-icon name="edit" />
        <span>修改密码</span>
      </li>
      <div class="exit" @click="exit">退出登录</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
export default {
  data() {
    return {
      email: this.$store.state.email,
      height: ""
    };
  },

  methods: {
    toxxzs() {
      this.$router.push({ path: "/xxzs" });
    },
    toXgmm() {
      this.$router.push({ path: "/Xgmm" });
    },
    todongtai() {
      this.$router.push({ path: "/myaction" });
    },
    wdxx() {
      this.$router.push({ path: "/wdxx" });
    },
    wdyf() {
      this.$router.push({ path: "/wdyf" });
    },
    wdhd() {
      this.$router.push({ path: "/wdhd" });
    },
    wdgz() {
      this.$router.push({ path: "/wdgz" });
    },
    exit() {
      localStorage.removeItem("userId");
      this.$router.push({ path: "/" });
      location.reload();
    }
  },
  beforeCreate() {
    if (localStorage.getItem("userId") == null) {
      Toast.fail("你还尚未登录，请登录！");
      this.$router.push({ path: "/login" });
    }
    this.$store.commit("lefttitle", "返回"); //定义导航左侧名字
    this.$store.commit("righttitle", ""); //定义导航右侧按钮名字，没功能可以为空
    this.$store.commit("changeTitle", "个人中心"); //定义导航中间名字
    this.$store.commit("footercheck", "myself"); //底部按钮锁定，名字为路由跳转名字
    axios({
      method: "post",
      url: "http://39.97.226.25:8082/user/showUserById",
      data: qs.stringify({ id: localStorage.getItem("userId") })
    }).then(data => {
      //   console.log(data);
      this.$store.commit("addmsg", data.data);
    });
  },
  beforeMount() {
    var h = document.body.clientHeight - 98;
    this.height = h + "px";
  }
};
</script>
<style scoped>
#myself-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.top-box {
  background: linear-gradient(to bottom, #fa6481, #ffa4d0);
  height: 160px;
  overflow: hidden;
}
.img-box {
  width: 120px;
  height: 120px;
  background: rgba(0, 0, 0, 0.01);
  margin: 0 auto;
  margin-top: 5px;
  border-radius: 60px;
}
.img {
  width: 100px;
  height: 100px;
  background: rgba(0, 0, 0, 0.02);
  margin: 0 auto;
  border-radius: 50px;
  transform: translateY(10px);
}
.img img {
  width: 80px;
  height: 80px;
  border-radius: 40px;
  margin: 0 auto;
  transform: translateY(10px);
}
.top-box > p {
  margin-top: 10px;
}
.msg-box {
  height: 60px;
  background: #ffa4d0;
  display: flex;
  justify-content: space-around;
}
.msg-box div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.msg-box div:nth-of-type(2)::before {
  width: 2px;
  height: 30px;
  box-shadow: 0 0px 3px #fff inset;
  background: rgba(0, 0, 0, 0);
  content: "";
  position: absolute;
  right: 30%;
}
.msg-box div:nth-of-type(2)::after {
  width: 2px;
  height: 30px;
  box-shadow: 0 0px 3px #fff inset;
  background: rgba(0, 0, 0, 0);
  content: "";
  position: absolute;
  left: 30%;
}

.msg-box div p {
  font-size: 16px;
  color: #ff1493;
}
.msg-box div span {
  margin-top: 2px;
}
.list-box {
  overflow: hidden;
  flex: 1;
  background: url(../../../public/images/myselfbg.png) no-repeat bottom
    center/100% 120%;
  padding: 15px;
  box-sizing: border-box;
}
.list-box li {
  height: 45px;
  background: rgba(255, 164, 208, 0.6);
  line-height: 45px;
  text-align: left;
  padding-left: 30px;
  box-sizing: border-box;
  margin-bottom: 1px;
}
.list-box li span {
  margin-left: 10px;
  vertical-align: middle;
  transform: translateY(1px);
  display: inline-block;
}
.fw {
  font-size: 18px;
  font-weight: 600;
  color: rgba(51, 51, 51, 0.8);
  border-radius: 5px 5px 0 0;
}
.list-box li .van-icon {
  font-size: 18px;
  vertical-align: middle;
}
.exit {
  width: 200px;
  height: 45px;
  border: 1px solid rgba(255, 164, 208, 0.6);
  margin: 0 auto;
  color: rgba(255, 0, 0, 0.527);
  background: rgba(255, 255, 255, 1);
  font-size: 14px;
  line-height: 45px;
  margin-top: 10px;
}
</style>
