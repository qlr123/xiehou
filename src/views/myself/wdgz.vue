<template>
  <div class="gz-box">
    <van-tabs v-model="active">
      <van-tab title="关注我的">
        <div class="item-box" v-for="item in values" :key="item.id" @click="detail" :vid="item.id">
          <div class="img">
            <img :src="item.headportrait" alt width="90px" height="90px" />
          </div>
          <div class="name">姓名:{{item.username}}</div>
          <div class="sex">性别:{{item.sex}}</div>
          <div class="monologue">
            自我描述:
            <span>{{item.monologue}}</span>
          </div>
          <div class="income">
            年收入:
            <span>{{item.income}}</span>
          </div>
          <div class="house">
            有无房产:
            <span>{{item.house}}</span>
          </div>
        </div>
      </van-tab>
      <van-tab title="我关注的">
        <div class="item-box" v-for="item in values2" :key="item.id" @click="detail" :vid="item.id">
          <div class="img">
            <img :src="item.headportrait" alt width="90px" height="90px" />
          </div>
          <div class="name">姓名:{{item.username}}</div>
          <div class="sex">性别:{{item.sex}}</div>
          <div class="monologue">
            自我描述:
            <span>{{item.monologue}}</span>
          </div>
          <div class="income">
            年收入:
            <span>{{item.income}}</span>
          </div>
          <div class="house">
            有无房产:
            <span>{{item.house}}</span>
          </div>
          <div class="addgz" v-on:click="addgzs" :id="item.id">取消关注</div>
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
      values: "",
      values2: ""
    };
  },
  methods: {
    addgzs(data) {
      let odata = data;
      // console.log(data.srcElement.id);
      axios({
        method: "post",
        url: "http://10.8.157.63:8080/user/saveOrUpdateAttention",
        data: qs.stringify({
          attention: localStorage.getItem("userId"),
          focused: data.srcElement.id
        })
      }).then(data => {
        // console.log(data);

        switch (data.data) {
          case 0:
            Toast.fail("操作失败!请稍后再试");
            break;
          case 1:
            Toast.success("关注成功!");
            odata.target.innerText = "取消关注";
            break;
          case 2:
            Toast.success("取关成功!");
            console.log(odata);
            odata.target.innerText = "添加关注";
        }
      });
    },
    detail(data) {
      this.$router.push({
        path: "/detail",
        query: { userId: data.srcElement.offsetParent.attributes[1].nodeValue }
      });
    }
  },
  beforeCreate() {
    this.$store.commit("lefttitle", "返回"); //定义导航左侧名字
    this.$store.commit("righttitle", ""); //定义导航右侧按钮名字，没功能可以为空
    this.$store.commit("changeTitle", "我的关注"); //定义导航中间名字
    this.$store.commit("footercheck", "myself"); //底部按钮锁定，名字为路由跳转名字

    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/myFocused",
      data: qs.stringify({ id: localStorage.getItem("userId") })
    }).then(data => {
      // console.log(data); //关注我的
      this.values = data.data;
    });

    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/myAttention",
      data: qs.stringify({ id: localStorage.getItem("userId") })
    }).then(data => {
      // console.log(data); //我关注的
      this.values2 = data.data;
    });
  }
};
</script>
<style scoped>
.gz-box {
  margin-bottom: 50px;
}
.item-box {
  height: 100px;
  background: #fafafa;
  position: relative;
  box-sizing: border-box;
  padding: 5px 15px;
  margin-bottom: 10px;
}
.img {
  width: 90px;
  height: 90px;
  display: inline-block;
  float: left;
}
.name {
  font-size: 14px;
  text-align: left;
  padding-left: 110px;
  box-sizing: border-box;
  color: #323233;
}
.sex {
  font-size: 12px;
  text-align: left;
  padding-left: 110px;
  box-sizing: border-box;
}
.monologue {
  color: #7d7e80;
  font-size: 12px;
  padding-left: 110px;
  box-sizing: border-box;
  text-align: left;
  padding-right: 60px;
}
.monologue span {
  display: block;
  height: 38px;
  overflow: hidden;
  word-wrap: break-word;
}
.income {
  position: absolute;
  right: 15px;
  top: 5px;
}
.income span {
  color: red;
  font-weight: 700;
}
.house {
  position: absolute;
  right: 15px;
  top: 24px;
}
.house span {
  color: red;
  font-weight: 700;
}
.addgz {
  position: absolute;
  bottom: 16px;
  right: 15px;
  width: 65px;
  height: 25px;
  border-radius: 5px;
  line-height: 25px;
  background: pink;
  color: #fff;
}
</style>
