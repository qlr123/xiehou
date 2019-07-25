<template>
  <div>
    <van-nav-bar title="报名" left-arrow :fixed="true" @click-left="onClickLeft" />
    <van-row style="margin-top:46px">
      <van-col span="12">
        <van-cell-group>
          <van-field
            v-model="name"
            disabled
            label="姓名"
            right-icon="question-o"
            placeholder="姓名"
            style="height:50px;line-heght:50px"
          />
          <van-field
            v-model="sex"
            disabled
            label="性别"
            style="height:50px;line-heght:50px"
            right-icon="question-o"
            placeholder="male"
          />
          <van-field
            v-model="age"
            disabled
            label="年龄"
            right-icon="question-o"
            placeholder="male"
            style="height:50px;line-heght:50px"
          />
          <van-field
            v-model="phone"
            label="手机号"
            placeholder="请输入手机号"
            disabled
            style="height:50px;line-heght:50px"
          />
        </van-cell-group>
      </van-col>
      <van-col span="12">
        <van-image style="border:1px solid gray" width="180" height="200" :src="src" to="/xq.vue" />
      </van-col>
    </van-row>
    <van-cell-group style="margin-top:10px">
      <van-field
        v-model="hk"
        disabled
        label="婚况"
        right-icon="question-o"
        placeholder
        style="height:50px;line-heght:50px"
      />
      <van-field
        v-model="adress"
        disabled
        label="工作地"
        right-icon="question-o"
        placeholder
        style="height:50px;line-heght:50px"
      />
      <van-field
        v-model="work"
        disabled
        label="职业"
        right-icon="question-o"
        placeholder
        style="height:50px;line-heght:50px"
      />
      <van-field
        v-model="lent"
        disabled
        label="身高"
        right-icon="question-o"
        placeholder
        style="height:50px;line-heght:50px"
      />
      <van-field
        v-model="weight"
        disabled
        label="体重"
        right-icon="question-o"
        placeholder
        style="height:50px;line-heght:50px"
      />
      <van-field
        v-model="money"
        disabled
        label="年收入"
        right-icon="question-o"
        placeholder
        style="height:50px;line-heght:50px"
      />
      <van-tabbar v-model="active">
        <van-button type="info" style="margin:0 auto" @click="sat()">我要报名</van-button>
      </van-tabbar>
    </van-cell-group>
  </div>
</template>
<script>
import axios from "axios";
import { Toast } from "vant";
import "lib-flexible";
export default {
  name: "Bm",
  data() {
    return {
      active: "0",
      value: "2",
      name: "2",
      phone: "2",
      sex: "男",
      age: "18",
      hk: "单身",
      money: "5毛",
      adress: "八大胡同",
      lent: "三四米",
      weight: "50斤",
      work: "banzhuan",
      src: ""
    };
  },
  mounted() {
    axios({
      method: "post",
      url: "http://39.97.226.25:8082/user/showUserById",
      params: { id: localStorage.getItem("userId") }
    }).then(data => {
      data = data.data;
      //  console.log(data)
      this.name = data.username;
      this.phone = data.phone;
      this.sex = data.sex;
      this.age = data.age;
      this.hk = data.marry;
      this.money = data.income;
      this.adress = data.address;
      this.lent = data.heights;
      this.weight = data.weights;
      this.work = data.job;
      this.src = data.headportrait;
    });
  },

  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    beforeRead(file) {
      if (file.type !== "image/jpg") {
        return false;
      }

      return true;
    },
    sat() {
      axios({
        method: "post",
        url: "http://39.97.226.25:8082/user/apply",
        params: { hotlistId: 1, userId: localStorage.getItem("userId") }
      }).then(data => {
        // console.log(data)
        if (data.data == 1) {
          Toast.success("已报名");
          this.$router.push({ path: "/" });
        } else {
          Toast.fail("已报名请勿重复提交");
          // location.reload()
        }
      });
    }
  }
};
</script>
