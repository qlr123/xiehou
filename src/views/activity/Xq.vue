<template style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379);
">
  <div style="background:linear-gradient(to bottom right, #ffa4d0, #fb7379);
">
    <van-nav-bar
      title="活动"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
    />
    <van-cell-group
      style="border:1px solid gray;margin-top:15px;margin:0 auto;background: linear-gradient(to bottom right, #ffa4d0, #fb7379);
 position:relative"
    >
      <van-image width="90vw" height="220px" :src="src" />
      <van-cell-group
        style="position:absolute;left:13px;bottom:0px;background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
      >
        <van-image width="45px" height="45px" :src="src" />
      </van-cell-group>
      <van-cell-group
        style="width:135px;margin-left:70px;margin-top:1.5px;background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
      >
        <van-field
          v-model="value"
          placeholder="联系方式"
          style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
        />
      </van-cell-group>
      <span
        style="float:right;margin-top:10px;background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
      >已有{{num}}人报名</span>
    </van-cell-group>
    <van-button
      type="primary"
      @click="showPopup"
      style="border:1px solid gray;float:left;margin:0.3rem 0 0 0.3rem;background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
    >活动详情</van-button>
    <van-popup v-model="show"></van-popup>
    <van-cell-group
      style="margin-top:3.5rem;background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
    >
      <van-field
        style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
        v-model="value1"
        disabled
        label="活动时间"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="value2"
        disabled
        label="地点"
        style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
        placeholder="地点"
      />
      <van-field
        v-model="value3"
        disabled
        label="主办单位"
        style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
        placeholder="主办单位"
      />
      <van-field
        v-model="value4"
        disabled
        label="人数"
        placeholder
        style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
      />
      <van-field
        v-model="value5"
        disabled
        label="报名须知"
        placeholder
        style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
      />
      <van-field
        v-model="value6"
        disabled
        label="活动费用"
        placeholder
        style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
      />
      <van-button
        @click="showPopup1"
        style="background: linear-gradient(to bottom right, #ffa4d0, #fb7379)"
      >详情咨询</van-button>
      <van-popup
        v-model="show1"
        style="width:7rem;height:7rem;border-radius:50%;line-height:7rem;"
      >qq949051451</van-popup>
    </van-cell-group>
    <van-image width="352px" height="457px" :src="src" />
    <van-tabbar v-model="active">
      <van-tabbar-item to="/Bm">我要报名</van-tabbar-item>
      <van-tabbar-item>我要分享</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import "lib-flexible";
import axios from "axios";
export default {
  name: "xq",
  data() {
    return {
      active: 0,
      username: "",
      value: "11111",
      num: "",
      show: false,
      show1: false,
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      value5: "",
      value6: "",
      src: ""
    };
  },
  mounted() {
    axios({
      method: "post",
      url: "http://39.97.226.25:8082/user/showAllHotlist"
    }).then(data => {
      data = data.data;
      // console.log(data);
      // console.log(data[0].id);
      this.value1 = data[0].activitytime;
      this.num = data[0].usernum;
      this.value2 = data[0].addresss;
      this.value3 = data[0].particulars;
      this.value4 = data[0].sumuser;
      this.value5 = data[0].application;
      this.value6 = data[0].applicationcost;
      this.src = data[0].hotlistImgUrl;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    showPopup() {
      this.show = false;
    },
    showPopup1() {
      this.show1 = true;
    }
  }
};
</script>
