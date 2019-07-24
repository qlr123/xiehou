<template>
  <div>
    <heads></heads>
    <div id="mid">
      <showInfo>
        <div :slot="userinfo">
          <van-collapse v-model="activeNames">
            <van-collapse-item title="个人信息" name="1">
              <div class="pohtoshwo">
                <van-image width="100%" height="200" src="https://img.yzcdn.cn/vant/cat.jpeg" />
              </div>
              <van-cell-group>
                <van-field v-model="username" label="姓名" readonly />
                <van-field v-model="sex" label="性别" readonly />
                <van-field v-model="age" label="年龄" readonly />
                <van-field v-model="heights" label="身高" readonly />
                <van-field v-model="weights" label="体重" readonly />
                <van-field v-model="constellation" label="星座" readonly />
                <van-field v-model="blood" label="血型" readonly />
                <van-field v-model="nation" label="民族" readonly />
                <van-field v-model="eduinfo" label="学历" readonly />
                <van-field readonly label="职业" v-model="job" />
                <van-field readonly label="年收入" v-model="income" />
                <van-field readonly label="地址" v-model="address" />
                <van-field readonly label="婚况" :value="marry" />
                <van-field readonly label="购房情况" v-model="house" />
                <van-field readonly label="兴趣爱好" v-model="hobbies" />
                <van-field readonly label="独白" v-model="monologue" />
                <van-field readonly label="性格" v-model="characters" />
              </van-cell-group>
            </van-collapse-item>
          </van-collapse>
        </div>
        <div :slot="loveinfo">
          <van-collapse v-model="activeNamess">
            <van-collapse-item title="心意对象信息" name="1">
              <van-field label="年龄" readonly v-model="minMaxAge" />
              <van-field label="身高" readonly v-model="minMaxHeight" />
              <van-field label="婚况" readonly v-model="marrys" />
              <van-field label="年收入" readonly v-model="incomes" />
              <van-field label="学历" readonly v-model="eduinfos" />
              <van-field label="地址" readonly v-model="addresss" />
              <van-field label="性格" readonly v-model="hobbiess" />
            </van-collapse-item>
          </van-collapse>
        </div>
      </showInfo>

      <van-row type="flex" justify="center" v-if="nowshow">
        <van-col span="6">
          <van-button type="warning" style>发布信息</van-button>
        </van-col>
      </van-row>
    </div>

    <foots></foots>
  </div>
</template>
<script>
import heads from "../../components/Tou";
import foots from "../../components/Foot";
import showInfo from "../../components/showInfo";
import favoredTypeVue from "./favoredType.vue";
export default {
  components: {
    heads,
    foots,
    showInfo
  },
  data() {
    return {
      userinfo: "",
      loveinfo: "",
      activeNames: ["1"],
      activeNamess: ["1"],
      username: "",
      sex: "",
      age: "",
      heights: "",
      weights: "",
      constellation: "",
      blood: "",
      nation: "",
      eduinfo: "",
      job: "",
      income: "",
      address: "",
      marry: "",
      house: "",
      hobbies: "",
      monologue: "",
      characters: "",
      uploadFile: "",

      marrys: "",
      incomes: "",
      eduinfos: "",
      addresss: "",
      hobbiess: "",
      minMaxAge: "",
      minMaxHeight: "",
      nowshow: false
    };
  },
  mounted() {
    // setTimeout(()=>{
    //     this.userinfo = "u"
    // },3000)
  },
  created() {
    if (this.$store.state.selfInfo != null) {
      this.userinfo = "u";
      this.username = this.$store.state.selfInfo.username;
      this.sex = this.$store.state.selfInfo.sex;
      this.age = this.$store.state.selfInfo.age + "岁";
      this.heights = this.$store.state.selfInfo.heights + "cm";
      this.weights = this.$store.state.selfInfo.weights + "kg";
      this.constellation = this.$store.state.selfInfo.constellation;
      this.blood = this.$store.state.selfInfo.blood;
      this.nation = this.$store.state.selfInfo.nation;
      this.eduinfo = this.$store.state.selfInfo.eduinfo;
      this.job = this.$store.state.selfInfo.job;
      this.income = this.$store.state.selfInfo.income;
      this.address = this.$store.state.selfInfo.address;
      this.marry = this.$store.state.selfInfo.marry;
      this.house = this.$store.state.selfInfo.house;
      this.hobbies = this.$store.state.selfInfo.hobbies;
      this.monologue = this.$store.state.selfInfo.monologue;
      this.characters = this.$store.state.selfInfo.characters;
      this.uploadFile = this.$store.state.selfInfo.uploadFile;
    }
    if (this.$store.state.favoredType != null) {
      this.loveinfo = "c";
      this.marrys = this.$store.state.favoredType.marry;
      this.incomes = this.$store.state.favoredType.income;
      this.eduinfos = this.$store.state.favoredType.eduinfo;
      this.addresss = this.$store.state.favoredType.address;
      this.hobbiess = this.$store.state.favoredType.hobbies;
      this.minMaxAge =
        this.$store.state.favoredType.minAge +
        "岁至" +
        this.$store.state.favoredType.maxAge +
        "岁";
      this.minMaxHeight =
        this.$store.state.favoredType.maxHeight +
        "cm至" +
        this.$store.state.favoredType.minHeight +
        "cm";
    }
    if (
      this.$store.state.favoredType != null &&
      this.$store.state.selfInfo != null
    ) {
      this.nowshow = true;
    }
  },
  beforeCreate() {
    this.$store.commit("lefttitle", "返回"); //定义导航左侧名字
    this.$store.commit("righttitle", "重新编写"); //定义导航右侧按钮名字，没功能可以为空
    this.$store.commit("changeTitle", "发布"); //定义导航中间名字
    this.$store.commit("footercheck", "addInfo"); //底部按钮锁定，名字为路由跳转名字
  }
};
</script>

<style scoped>
.van-cell {
  padding-left: 0px !important;
  padding-right: 0px !important;
}
#mid {
  margin-top: 46px;
  margin-bottom: 50px;
  text-align: left !important;
}
</style>
