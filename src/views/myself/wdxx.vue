<template>
  <div id="wdxx">
    <van-popup v-model="show">
      <div class="nrbox">
        <div class="bt"></div>
        <div class="nr">
          <p class="senduser">{{senduser}}:</p>
          <p class="content2">{{details.content}}</p>
          <p class="time">{{details.sendTime}}</p>
        </div>
        <div class="footer">
          <van-button plain hairline type="danger" class="btn" @click="reliao">开始热聊</van-button>
        </div>
      </div>
    </van-popup>
    <van-tabs v-model="active">
      <van-tab title="未读消息">
        <div class="wdwd">
          <div class="title">我的消息</div>
          <div class="wdnr">
            {{neirong1}}
            <ul>
              <li @click="detail" v-for="item in xiaoxi1" :key="item.id" :id="item.id">
                <span class="user">{{item.username}}</span>
                <span class="to">给你</span>
                <span class="do">说</span>
                <span class="content">{{item.content}}</span>
                <span class="date">{{item.sendTime}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="xtwd">
          <div class="title">系统消息</div>
          <div class="wdnr">{{neirong2}}</div>
        </div>
      </van-tab>
      <van-tab title="已读消息">
        <div class="wdwd">
          <div class="title">我的消息</div>
          <div class="wdnr">
            {{neirong3}}
            <ul>
              <li @click="detail1" v-for="item in xiaoxi3" :key="item.id" :id="item.id">
                <span class="user">{{item.username}}</span>
                <span class="to">给你</span>
                <span class="do">说</span>
                <span class="content">{{item.content}}</span>
                <span class="date">{{item.sendTime}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="xtwd">
          <div class="title">系统消息</div>
          <div class="wdnr">{{neirong4}}</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
export default {
  data() {
    return {
      active: 2,
      neirong1: "",
      xiaoxi1: "",
      neirong2: "",
      xiaoxi2: "",
      neirong3: "",
      xiaoxi3: "",
      neirong4: "",
      xiaoxi4: "",
      show: false,
      senduser: "",
      details: "",
      userid: ""
    };
  },
  methods: {
    detail(data) {
      // console.log(data);
      var name = data.srcElement.parentElement.firstChild.innerHTML;
      axios({
        method: "post",
        url: "http://10.8.157.63:8080/user/readMessage",
        data: qs.stringify({ id: data.srcElement.parentElement.id })
      }).then(data => {
        // console.log(data);
        this.show = true;
        this.senduser = name;
        this.details = data.data;
        this.userid = data.data.recipients;
        location.reload();
      });
    },
    detail1(data) {
      // console.log(data);
      var name = data.srcElement.parentElement.firstChild.innerHTML;
      axios({
        method: "post",
        url: "http://10.8.157.63:8080/user/readMessage",
        data: qs.stringify({ id: data.srcElement.parentElement.id })
      }).then(data => {
        // console.log(data);
        this.show = true;
        this.senduser = name;
        this.details = data.data;
        this.userid = data.data.recipients;
      });
    },
    reliao(data) {
      this.$router.push({ path: "/chat", query: { id: this.userid } });
    }
  },

  beforeCreate() {
    this.$store.commit("lefttitle", "返回"); //定义导航左侧名字
    this.$store.commit("righttitle", ""); //定义导航右侧按钮名字，没功能可以为空
    this.$store.commit("changeTitle", "我的消息"); //定义导航中间名字
    this.$store.commit("footercheck", "myself"); //底部按钮锁定，名字为路由跳转名字

    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/myNotReadUserMessage",
      data: qs.stringify({ addresser: localStorage.getItem("userId") })
    }).then(data => {
      console.log(data); //未读用户
      if (data.data.length == 0) {
        // console.log(123);
        this.neirong1 = "还没有消息哦";
      } else {
        this.neirong1 = "";
        this.xiaoxi1 = data.data;
      }
    });

    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/myNotReadSystemMessage",
      data: qs.stringify({ addresser: localStorage.getItem("userId") })
    }).then(data => {
      // console.log(data); //未读系统
      if (data.data.length == 0) {
        // console.log(123);
        this.neirong2 = "还没有消息哦";
      } else {
        this.neirong2 = "";
        this.xiaoxi2 = data.data;
      }
    });

    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/myReadUserMessage",
      data: qs.stringify({ addresser: localStorage.getItem("userId") })
    }).then(data => {
      console.log(data); //已读用户
      if (data.data.length == 0) {
        // console.log(123);
        this.neirong3 = "还没有消息哦";
      } else {
        // console.log(data.data); //已读用户
        this.neirong3 = "";
        this.xiaoxi3 = data.data;
      }
    });

    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/myReadSystemMessage",
      data: qs.stringify({ addresser: localStorage.getItem("userId") })
    }).then(data => {
      console.log(data); //已读系统
      if (data.data.length == 0) {
        // console.log(123);
        this.neirong4 = "还没有消息哦";
      } else {
        this.neirong4 = "";
        this.xiaoxi4 = data.data;
      }
    });
  }
};
</script>
<style scoped>
.title {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-weight: 800;
  text-align: left;
  padding-left: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid #eee;
}
.wdnr {
  height: auto;
}
.wdnr ul li {
  height: 30px;
  font-size: 14px;
  border-bottom: 1 px solid #eee;
  line-height: 30px;
  text-align: left;
  padding: 0 15px;
  box-sizing: border-box;
  display: flex;
}
.content {
  display: inline-block;
  overflow: hidden;
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-indent: 5px;
}
.user {
  min-width: 40px;
  color: pink;
}
.date {
  float: right;
  min-width: 66px;
}
.nrbox {
  width: 80vw;
  height: 40vh;
  display: flex;
  flex-direction: column;
}
.bt {
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, #fa6481, #fff);
}
.nr {
  flex: 1;
  padding: 20px;
}
.footer {
  width: 100%;
  height: 60px;
  background: linear-gradient(to bottom, #fff, #fa6481);
}
.senduser {
  color: pink;
  font-size: 16px;
  text-align: left;
}
.content2 {
  height: 75%;
  text-align: left;
  margin-top: 10px;
  padding-left: 30px;
}
.time {
  text-align: right;
}
.btn {
  background: rgba(0, 0, 0, 0);
  width: 100px;
  height: 38px;
  line-height: 38px;
  margin-top: 10px;
  color: red;
}
</style>
