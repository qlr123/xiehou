<template>
  <div>
    <van-nav-bar :fixed="true" title="聊天" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="neirong">
      <ul>
        <li v-for="(item,key) in chatdata" :key="key">
          <p>
            <span>{{item.username}}</span>
            <span>我:{{item.chatinfo}}</span>
          </p>
        </li>
      </ul>
    </div>
    <van-tabbar>
      <van-cell-group>
        <van-field v-model="info" center clearable label="留言" placeholder="请输入消息">
          <van-button slot="button" size="small" type="primary" @click="submit">发送</van-button>
        </van-field>
      </van-cell-group>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from "vant";
import axios from "axios";
export default {
  name: "chat",
  data() {
    return {
      chatdata: [],
      info: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    submit() {
      //   console.log(this.$route.query.id);

      if (this.info != "") {
        var data = {
          addresser: this.$route.query.id,
          recipients: localStorage.getItem("userId"),
          content: this.info
        };
        console.log(data);
        axios({
          method: "post",
          url: "http://39.97.226.25:8082/user/sendMessage",
          params: data
        }).then(res => {
          console.log(res);
        });
        let obj = { chatinfo: this.info, username: "self" };
        this.chatdata.push(obj);
        this.info = "";
      } else {
        Toast("请输入信息");
      }
    }
  }
};
</script>
<style scoped>
ul {
  padding: 5px 10px;
}
li {
  font-size: 18px;
  text-align: left;
  margin: 5px 0;
}
</style>
