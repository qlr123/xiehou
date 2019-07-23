<template>
  <div>
    <van-nav-bar title="详情" left-text="返回" left-arrow :fixed="true" @click-left="onClickLeft" />
    <div class="nei" style="margin-top:46px;height:130px">
      <van-image width="100" height="100" :src="list.headportrait" />
    </div>
    <van-button @click="hi" round type="danger" style="margin:0 20px">打招呼</van-button>
    <van-button @click="guanzhu" round type="danger">关注</van-button>
    <div style="padding:10px;">
      <p>基本信息</p>
      <van-cell-group>
        <van-field :value="list.username" type="textarea" rows="1" label="姓名" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.sex" type="textarea" rows="1" label="性别" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.age" type="textarea" rows="1" label="年龄" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.heights" type="textarea" rows="1" label="身高/cm" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.weights" type="textarea" rows="1" label="体重/斤" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field
          :value="list.constellation"
          type="textarea"
          rows="1"
          label="星座"
          disabled
          autosize
        />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.blood" type="textarea" rows="1" label="血型" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.nation" type="textarea" rows="1" label="民族" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.eduinfo" type="textarea" rows="1" label="学历" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.job" type="textarea" rows="1" label="职业" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.income" type="textarea" rows="1" label="年收入" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.address" type="textarea" rows="1" label="地址" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="list.marry" type="textarea" rows="1" label="婚况" disabled autosize />
      </van-cell-group>
      <p>择偶信息</p>
      <van-row type="flex">
        <van-col offset="2" span="4" style="line-height:44px;color:#323233;font-size: 14px;">年龄</van-col>
        <van-col span="6">
          <van-field disabled :value="info.minAge" placeholder="最小值" />
        </van-col>
        <van-col offset="1" span="4" style="line-height:44px;color:#323233;font-size: 14px;">--</van-col>
        <van-col span="6">
          <van-field disabled :value="info.maxAge" placeholder="最大值" />
        </van-col>
      </van-row>
      <van-row type="flex">
        <van-col offset="2" span="4" style="line-height:44px;color:#323233;font-size: 14px;">身高</van-col>
        <van-col span="6">
          <van-field disabled :value="info.minHeight" placeholder="最小值" />
        </van-col>
        <van-col offset="1" span="4" style="line-height:44px;color:#323233;font-size: 14px;">--</van-col>
        <van-col span="6">
          <van-field disabled :value="info.maxHeight" placeholder="最大值" />
        </van-col>
      </van-row>
      <van-cell-group>
        <van-field :value="info.marry" type="textarea" rows="1" label="婚况" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="info.income" type="textarea" rows="1" label="年收入" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="info.address" type="textarea" rows="1" label="地址" disabled autosize />
      </van-cell-group>
      <van-cell-group>
        <van-field :value="info.characters" type="textarea" rows="1" label="性格" disabled autosize />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "detail",
  data() {
    return {
      list: "",
      info: ""
    };
  },
  mounted() {
    var userId = this.$route.query.userId;
    axios({
      method: "get",
      url: "http://10.8.157.63:8080/user/showUserById",
      params: { id: userId }
    }).then(res => {
      // console.log(res.data);
      this.list = res.data;
    });
    axios({
      method: "get",
      url: "http://10.8.157.63:8080/user/showMate",
      params: { id: userId }
    }).then(res => {
      // console.log(res.data);
      this.info = res.data;
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    hi() {
      console.log("hi");
    },
    guanzhu() {
      console.log("关注");
    }
  }
};
</script>
     

<style scoped>
.van-cell-group {
  margin-top: 3px;
  color: #000;
}
</style>

