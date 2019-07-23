<template >
  <div class="main">
    <van-nav-bar
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
      <van-row type="flex">
        <van-col offset="2" span="4" style="line-height:44px;color:#323233;font-size: 14px;">年收入</van-col>
        <van-col span="6">
          <van-field v-model="money" />
        </van-col>
      </van-row>
      <van-field readonly clickable label="地址" :value="value1" @click="showPicker1 = true" />
      <van-popup v-model="showPicker1" position="bottom">
        <van-picker
          show-toolbar
          :columns="province_list"
          @cancel="showPicker1 = false"
          @confirm="onConfirm1"
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
        <li style="position:relative;padding:14px;">
          <van-image
            style="float:left"
            width="100"
            height="100"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <p style="width:160px;float:left ;text-align:left;margin-left:20px;">名称</p>
          <p
            style="width:160px;float:left ;text-align:left;margin-left:20px;margin-top:10px;font-size:20px"
          >介绍</p>
          <van-button round style="background:#fb7379;font-size:20px" size="large">打招呼</van-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
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

      province_list: [
        "北京市",
        "上海市",
        "天津市",
        "重庆市",
        "河北省",
        "山西省",
        "辽宁省",
        "吉林省",
        "河南省",
        "江苏省",
        "浙江省",
        "安徽省",
        "福建省",
        "江西省",
        "山东省",
        "湖北省",
        "湖南省",
        "广东省",
        "海南省",
        "四川省",
        "贵州省",
        "云南省",
        "陕西省",
        "甘肃省",
        "青海省",
        "黑龙江省",
        "内蒙古自治区",
        "广西壮族自治区",
        "西藏自治区",
        "宁夏回族自治区",
        "新疆维吾尔自治区",
        "台湾省",
        "香港特别行政区",
        "澳门特别行政区"
      ],
      marryColumns: ["未婚", "单身离异", "离异带孩", "丧偶单身", "丧偶带孩"]
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
    onConfirm1(value1) {
      this.value1 = value1;
      this.showPicker1 = false;
    },
    onConfirm2(value2) {
      this.value2 = value2;
      this.showPicker2 = false;
    },
    sousuo() {
      console.log("搜索");
    },
    quxiao() {
      this.show = false;
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
</style>
