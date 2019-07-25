<template >
  <div class="main">
    <van-nav-bar
      style="background:#fa6481;color:#fff"
      :fixed="true"
      :title="info"
      left-text="返回"
      right-text="筛选"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-popup v-model="show" style="width:90vw;height:90vh;font-size:20px">
      <van-field readonly clickable label="性别" :value="value" @click="showPicker = true" />

      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="sex" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>
      <van-row type="flex">
        <van-col offset="2" span="4" style="line-height:44px;color:#323233;font-size: 14px;">身高</van-col>
        <van-col span="6">
          <van-field v-model="minHeight" placeholder="最小值" />
        </van-col>
        <van-col offset="2" span="4" style="line-height:44px;color:#323233;font-size: 14px;">--</van-col>
        <van-col span="6">
          <van-field v-model="maxHeight" placeholder="最大值" />
        </van-col>
      </van-row>
      <van-row type="flex">
        <van-col offset="2" span="4" style="line-height:44px;color:#323233;font-size: 14px;">年龄</van-col>
        <van-col span="6">
          <van-field v-model="minage" placeholder="最小值" />
        </van-col>
        <van-col span="4" style="line-height:44px;color:#323233;font-size: 14px;">--</van-col>
        <van-col span="6">
          <van-field v-model="maxage" placeholder="最大值" />
        </van-col>
      </van-row>
      <van-field v-model="income" label="年收入" readonly @click="incomeShows" placeholder="请填写您的年收入" />
      <van-popup v-model="incomeShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="incomeColumns"
          @cancel="incomeCancel"
          @confirm="incomeConfirm"
        />
      </van-popup>

      <van-field readonly clickable label="婚况" :value="value2" @click="showPicker2 = true" />
      <van-popup v-model="showPicker2" position="bottom">
        <van-picker
          show-toolbar
          :columns="marryColumns"
          @cancel="showPicker2 = false"
          @confirm="onConfirm2"
        />
      </van-popup>
      <van-button round style="background:#fb7379;font-size:20px" size="large" @click="sousuo">搜索</van-button>
      <van-button round style="background:#fb7379;font-size:20px" size="large" @click="quxiao">取消</van-button>
    </van-popup>

    <div class="zhanshi">
      <ul>
        <li style="position:relative;padding:14px;" v-for="item in list">
          <van-image
            style="float:left"
            width="100"
            height="100"
            :src="item.headportrait"
            @click="xiqin(item.id)"
          />
          <p
            style="width:160px;float:left ;text-align:left;margin-left:20px;font-size:20px"
          >{{item.username}}</p>
          <p
            style="width:160px;float:left ;text-align:left;margin-left:20px;margin-top:10px;font-size:20px"
          >{{item.sex}}</p>
          <van-button
            round
            style="background:#fb7379;font-size:20px"
            size="large"
            @click="chat(item.id)"
          >打招呼</van-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axiox from "axios";
export default {
  name: "shaixuan",
  data() {
    return {
      info: "",
      show: false,
      show1: true,
      value: "",
      value1: "",
      value2: "",
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      sex: ["男", "女"],
      minHeight: "",
      maxHeight: "",
      minage: "",
      maxage: "",
      money: "",
      income: "",
      incomeShow: false,

      incomeColumns: [
        "1-5万",
        "5-10万",
        "10-15万",
        "15-20万",
        "20-35万",
        "35-50万",
        "50-100万",
        "100万以上"
      ],
      marryColumns: ["未婚", "单身离异", "离异带孩", "丧偶单身", "丧偶带孩"],
      list: []
    };
  },
  mounted() {
    this.info = this.$route.query.job;
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.show = true;
    },
    onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
    incomeShows() {
      this.incomeShow = true;
    },
    incomeConfirm(value, index) {
      this.incomeShow = false;
      this.income = value;
    },
    incomeCancel() {
      this.incomeShow = false;
    },

    onConfirm2(value2) {
      this.value2 = value2;
      this.showPicker2 = false;
    },
    sousuo() {
      console.log("搜索");
      var data = {
        sex: this.value,
        minHeight: this.minHeight,
        maxHeight: this.maxHeight,
        minAge: this.minage,
        maxAge: this.maxge,
        income: this.income,
        marry: this.value2
      };
      // console.log(data);
      axiox({
        method: "post",
        url: "http://10.8.157.63:8080/user/chooseMate",
        params: data
      }).then(res => {
        // console.log(res);
        this.list = res.data;
        this.show = false;
      });
    },
    quxiao() {
      this.show = false;
    },
    xiqin(i) {
      // console.log(i);
      this.$router.push({ name: "detail", query: { userId: i } });
    },
    chat(i) {
      this.$router.push({ name: "chat", query: { id: i } });
    }
  }
};
</script>

<style  scoped>
p {
  margin: 0;
  padding: 0;
}
.zhanshi {
  margin-top: 46px;
}
.main .van-nav-bar__text {
  color: #fff;
  line-height: 48px;
}
.main .van-nav-bar .van-icon {
  color: #fff;
}
.main .van-nav-bar__title {
  color: #fff;
  letter-spacing: 2px;
  font-size: 15px;
}
</style>
