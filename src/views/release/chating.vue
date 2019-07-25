<template>
  <div>
    <van-nav-bar
      :title="'与'+titles+'聊天中'"
      left-text="返回"
      :fixed="true"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="neirong">
      <ul>
        <li v-for="(item,key) in chatdata" :key="key" :class="item.username">
          <p>{{item.chatinfo}}</p>
          <van-image width="40" height="40" :src="item.headimg" style="margin:5px 0" />
          <p>{{item.chatinfo}}</p>
        </li>
        <li id="fix"></li>
      </ul>
    </div>
    <div id="bottomNav">
      <van-row type="flex" justify="space-between">
        <van-col span="3">
          <van-icon name="volume-o" />
        </van-col>
        <van-col span="18">
          <input
            type="text"
            id="txtinput"
            v-model="chating"
            placeholder="等待输入"
            @keydown.enter="sendinfo"
            style="width:90%;"
          />
        </van-col>
        <van-col span="3">
          <van-icon name="chat-o" @click="sendinfo" />
        </van-col>
        <van-col span="3">
          <van-icon name="add-o" @click="shows=!shows" />
        </van-col>
      </van-row>
      <van-grid :gutter="8" v-show="shows">
        <van-grid-item
          v-for="(item,key) in actiondata"
          :key="key"
          :icon="item.icons"
          :text="item.iconInfo"
          @click="tips"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "chating",
  beforeCreate() {
    let data = this.$store.state.favoredType;
    data.id = this.$store.state.userID;
    // console.log(data);

    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/chooseMate",
      params: data,
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then(data => {
      // console.log(data.data[0]);
      this.otherinfo = data.data[0];
      this.titles = this.otherinfo.username;
      // console.log(this.chatdata);
    });
  },

  data() {
    return {
      shows: false,
      chating: "",
      actiondata: [
        { iconInfo: "相册", icons: "photo-o" },
        { iconInfo: "拍摄", icons: "flower-o" },
        { iconInfo: "通话", icons: "phone-o" },
        { iconInfo: "位置", icons: "location-o" },
        { iconInfo: "收藏", icons: "star-o" },
        { iconInfo: "文件", icons: "upgrade" }
      ],
      chatdata: [],
      info: "",
      titles: "",
      otherinfo: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    sendinfo() {
      this.chatdata.push({
        chatinfo: this.chating,
        username: "self",
        headimg: this.$store.state.selfInfo.headportrait
      });
      axios({
        url: "http://i.itpk.cn/api.php",
        params: {
          question: this.chating,
          api_key: "d59d916609b385a065e8cb316deb17ec",
          api_secret: "0a83lrp1kb16"
        }
      }).then(data => {
        // console.log(data.data);
        this.chatdata.push({
          chatinfo: data.data,
          username: "other",
          headimg: this.otherinfo.headportrait
        });
        this.chating = "";
        let scrollTop =
          document.body.scrollTop || document.documentElement.scrollTop;
        // console.log(scrollTop);

        if (document.body.scrollHeight > 667) {
          document.body.scrollTop = document.documentElement.scrollTop =
            document.body.scrollHeight;
        }
      });
    },
    tips() {
      this.$toast("木有写(๑•̀ㅂ•́)و✧");
    },

    submit() {
      if (this.info != "") {
        let obj = { chatinfo: this.info, username: "self" };
        this.chatdata.push(obj);
        this.info = "";
      }
    }
  }
};
</script>
<style scoped>
ul {
  margin-top: 46px;
  padding: 5px 10px;
  margin-bottom: 50px;
}
li {
  text-align: left;
  margin: 5px 0;
  display: flex;
  line-height: 40px;
}
li p {
  margin: 5px 10px;
  padding: 0 15px;
}
.other p {
  background: #f6f6f6;
}
.other p:nth-child(1) {
  display: none;
}
.self p {
  background: #98e165;
  max-width: 65vw;
}
.self {
  flex-direction: row-reverse;
}
.self p:nth-child(1) {
  display: none;
}
#bottomNav {
  position: fixed;
  bottom: 0;
  width: 100vw;
  border-top: 1px solid #f3f4f6;
  background: #fff;
}
.van-icon {
  height: 50px;
  width: 30px;
  font-size: 30px;
  line-height: 50px;
}
#txtinput {
  height: 30px;
  margin: 9px 0px;
  border: 1px solid #2c3e50;
}
.neirong {
  margin-top: 46px;
  overflow: hidden;
}
.van-nav-bar {
  background: #fa6481;
  height: 48px;
  display: flex;
}
.van-nav-bar .van-icon {
  color: #fff;
}
.van-nav-bar__text {
  color: #fff;
  line-height: 48px;
}
.van-nav-bar__title {
  color: #fff;
  letter-spacing: 2px;
  font-size: 15px;
}
#fix {
  height: 50px;
}
</style>