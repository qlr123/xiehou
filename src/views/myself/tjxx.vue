<template>
  <div>
    <heads></heads>

    <div id="mid" style="overflow:hidden;">
      <van-row>
        
        <van-uploader
          :after-read="afterRead"
          v-model="fileList"
          multiple
          capture
          @delete="deleteimg"
          :max-count="1"
          upload-text="照片上传"
          id="upload"
        />
      </van-row>
      <van-field
        v-model="username"
        clearable
        label="姓名"
        right-icon="question-o"
        :placeholder="this.$store.state.values.username"
        :error-message="usernameerr"
        @click-right-icon="$toast('请输入您的真实姓名')"
      />
      <van-field v-model="sex" label="性别" :placeholder="this.$store.state.values.sex" readonly @click="show" />
      <van-popup v-model="shows" style="width:100%" position="bottom">
        <van-picker show-toolbar :columns="sexcolumns" @cancel="onCancel" @confirm="onConfirm" />
      </van-popup>

      <van-field
        v-model="age"
        type="number"
        clearable
        label="年龄"
        :error-message="ageerr"
        right-icon="question-o"
        :placeholder="this.$store.state.values.age"
        @click-right-icon="$toast('有效年龄18-100岁')"
      />
      <van-field
        v-model="heights"
        type="number"
        clearable
        label="身高"
        :error-message="heightserr"
        :placeholder="this.$store.state.values.heights"
        right-icon="question-o"
        @click-right-icon="$toast('身高的单位cm')"
      />
      <van-field
        v-model="weights"
        type="number"
        clearable
        :error-message="weightserr"
        label="体重"
        :placeholder="this.$store.state.values.weights "
        right-icon="question-o"
        @click-right-icon="$toast('体重的单位kg')"
      />
      <van-field
        v-model="constellation"
        label="星座"
        readonly
        @click="constellationShow"
        :placeholder="this.$store.state.values.constellation"
      />
      <van-popup v-model="xzshow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="constellationColumns"
          @cancel="constellationCancel"
          @confirm="constellationConfirm"
        />
      </van-popup>

      <van-field v-model="blood" label="血型" readonly @click="bloodShows" :placeholder="this.$store.state.values.blood" />
      <van-popup v-model="bloodShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="bloodColumns"
          @cancel="bloodCancel"
          @confirm="bloodConfirm"
        />
      </van-popup>

      <van-field v-model="nation" label="民族" readonly @click="nationShows" :placeholder="this.$store.state.values.nation" />
      <van-popup v-model="nationShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="nationColumns"
          @cancel="nationCancel"
          @confirm="nationConfirm"
        />
      </van-popup>

      <van-field v-model="eduinfo" label="学历" readonly @click="eduinfoShows" :placeholder="this.$store.state.values.eduinfo" />
      <van-popup v-model="eduinfoShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="eduinfoColumns"
          @cancel="eduinfoCancel"
          @confirm="eduinfoConfirm"
        />
      </van-popup>

      <van-field v-model="job" label="工作" readonly @click="jobShows" :placeholder="this.$store.state.values.job" />
      <van-popup v-model="jobShow" style="width:100%" position="bottom">
        <van-picker show-toolbar :columns="jobColumns" @cancel="jobCancel" @confirm="jobConfirm" />
      </van-popup>

      <van-field v-model="income" label="年收入" readonly @click="incomeShows" :placeholder="this.$store.state.values.income" />
      <van-popup v-model="incomeShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="incomeColumns"
          @cancel="incomeCancel"
          @confirm="incomeConfirm"
        />
      </van-popup>

      <van-field
        v-model="address"
        label="地址"
        readonly
        @click="addressShows"
        :placeholder="this.$store.state.values.address"
      />
      <van-popup v-model="addressShow" style="width:100%" position="bottom">
        <van-area :area-list="areaList" @cancel="addressCancel" @confirm="addressConfirm" />
      </van-popup>

      <van-field v-model="marry" label="婚状" readonly @click="marryShows" :placeholder="this.$store.state.values.marry" />
      <van-popup v-model="marryShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="marryColumns"
          @cancel="marryCancel"
          @confirm="marryConfirm"
        />
      </van-popup>

      <van-field v-model="house" label="购房情况" readonly @click="houseShows" :placeholder="this.$store.state.values.house" />
      <van-popup v-model="houseShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="houseColumns"
          @cancel="houseCancel"
          @confirm="houseConfirm"
        />
      </van-popup>

      <van-field
        v-model="characters"
        label="性格"
        type="textarea"
        :placeholder="this.$store.state.values.hobbies"
        rows="1"
        autosize
        right-icon="question-o"
        @click-right-icon="$toast('您需要简单的介绍下您的性格')"
      />

      <van-field
        v-model="monologue"
        label="独白"
        type="textarea"
        :placeholder="this.$store.state.values.monologue"
        rows="1"
        autosize
        right-icon="question-o"
        @click-right-icon="$toast('就是独白')"
      />

      <van-field
        v-model="hobbies"
        label="兴趣爱好"
        type="textarea"
        :placeholder="this.$store.state.values.characters"
        rows="1"
        autosize
        right-icon="question-o"
        @click-right-icon="$toast('您需要简单的介绍下您的兴趣爱好')"
      />

      <van-row type="flex" justify="center">
        <van-button type="danger" size="small" id="but" @click="sendimgs">提交</van-button>
      </van-row>
    </div>
  </div>
</template>
<script>
import heads from "../../components/Tou";
import list from "../../../public/js/list";
import axios from "axios";
import { Toast } from 'vant';
import qs from 'qs';
export default {
  data() {
    return {
      fileList: [],
      areaList: list,
      shows: false,
      xzshow: false,
      username: "",
      sex: "",
      heights: "",
      sexcolumns: ["男", "女"],
      constellation: "",
      constellationColumns: [
        "水瓶座",
        "双鱼座",
        "金牛座",
        "双子座",
        "巨蟹座",
        "处女座",
        "天秤座",
        "天蝎座",
        "射手座",
        "摩羯座"
      ],
      blood: "",
      bloodShow: false,
      bloodColumns: ["A", "B", "O", "AB"],
      age: "",
      weights: "",
      nation: "",
      nationShow: false,
      nationColumns: [
        "汉族",
        "蒙古族",
        "回族",
        "藏族",
        "维吾尔族",
        "苗族",
        "彝族",
        "壮族",
        "布依族",
        "朝鲜族",
        "满族",
        "侗族",
        "瑶族",
        "白族",
        "土家族",
        "哈尼族",
        "哈萨克族",
        "傣族",
        "黎族",
        "傈僳族",
        "佤族",
        "畲族",
        "高山族",
        "拉祜族",
        "水族",
        "东乡族",
        "纳西族",
        "景颇族",
        "柯尔克孜族",
        "土族",
        "达斡尔族",
        "仫佬族",
        "羌族",
        "布朗族",
        "撒拉族",
        "毛南族",
        "仡佬族",
        "锡伯族",
        "阿昌族",
        "普米族",
        "塔吉克族",
        "怒族",
        "乌孜别克族",
        "俄罗斯族",
        "鄂温克族",
        "德昂族",
        "保安族",
        "裕固族",
        "京族",
        "塔塔尔族",
        "独龙族",
        "鄂伦春族",
        "赫哲族",
        "门巴族",
        "珞巴族",
        "基诺族"
      ],
      eduinfo: "",
      eduinfoShow: false,
      eduinfoColumns: ["高中及以下", "专科", "本科", "研究生", "博士"],
      job: "",
      jobShow: false,
      jobColumns: ["事业单位", "商业人员", "教师", "医生", "律师"],
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
      address: "",
      addressShow: false,
      marry: "",
      marryShow: false,
      marryColumns: ["未婚", "单身离异", "离异带孩", "丧偶单身", "丧偶带孩"],
      house: "",
      houseShow: false,
      houseColumns: ["有房", "无房"],
      characters: "",
      monologue: "",
      hobbies: "",
      imgdata: [],
      usernameerr: "",
      ageerr: "",
      heightserr: "",
      weightserr: "",
      bool: true,
      agebool: true,
      heightsboll: true,
      weightsboll: true
    };
  },
  components: {
    heads
  },
  beforeCreate(){
    this.$store.commit('lefttitle','返回')//定义导航左侧名字
    this.$store.commit('righttitle','')//定义导航右侧按钮名字，没功能可以为空
    this.$store.commit('changeTitle','编写个人信息')//定义导航中间名字
  },
  mounted() {},
  watch: {
    username: function(newinfo) {
      let reg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      this.bool = reg.test(newinfo);
      console.log(this.bool);
      if (this.bool) {
        this.usernameerr = "";
      } else {
        this.usernameerr = "请输入正确的姓名";
      }
    },
    age: function(newinfo) {
      console.log(newinfo);
      if (newinfo >= 18 && newinfo < 100) {
        this.ageerr = "";
        this.agebool = true;
      } else {
        this.ageerr = "合理的年龄为18-100岁";
        this.agebool = true;
      }
    },
    heights: function(newinfo) {
      if (newinfo > 100 && newinfo < 300) {
        this.heightserr = "";
        this.heightsboll = true;
      } else {
        this.heightserr = "合理的身高为100-300cm";
        this.heightsboll = true;
      }
    },
    weights: function(newinfo) {
      if (newinfo > 0 && newinfo < 200) {
        this.weightserr = "";
        this.weightsbool = true;
      } else {
        this.weightserr = "合理的身高为0-200kg";
        this.weightsboll = true;
      }
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    //   this.headerImg = file.content;
    //   let fordata = new FormData();
    //   fordata.append("avatarfile", file.file);
    //   this.imgdata = fordata;
    //   console.log(fordata.get("avatarfile"));
        this.imgdata = file.file
    },
    deleteimg(file){
        this.imgdata = "";
        console.log(this.imgdata)
    },

    sendimgs() {
      let mark = true;
      let objinfo = {
        username: this.username,
        sex: this.sex,
        age: this.age,
        heights: this.heights,
        weights: this.weights,
        constellation: this.constellation,
        blood: this.blood,
        nation: this.nation,
        eduinfo: this.eduinfo,
        job: this.job,
        income: this.income,
        address: this.address,
        marry: this.marry,
        house: this.house,
        hobbies: this.hobbies,
        monologue: this.monologue,
        characters: this.characters,
        uploadFile:this.imgdata,
        id:this.$store.state.userID
      };
        let fordata = new FormData();
       
      console.log(fordata.get("uploadFile"));
      let tipinfo = "";
      let othis = this;
      for(let key in objinfo){
        if(objinfo[key] == "") {
          othis[key] = othis.$store.state.values[key]
        }
      }
      for (let key in objinfo) {
        // console.log(objinfo[key],key);
        if (objinfo[key] == "") {
          console.log(objinfo.key, 1, key);
          switch (key) {
            case "uploadFile":
              Toast.fail('图片必须上传！');
              break;
            case "username":
              objinfo.username = this.$store.state.values.username;
              break;
            case "sex":
              objinfo.sex = this.$store.state.values.sex;
              break;
            case "age":
              objinfo.age = this.$store.state.values.age;
              break;
            case "heights":
              objinfo.heights = this.$store.state.values.heights;
              break;
            case "weights":
              objinfo.weights = this.$store.state.values.weights;
              break;
            case "constellation":
              objinfo.constellation = this.$store.state.values.constellation;
              break;
            case "blood":
              objinfo.blood = this.$store.state.values.blood;
              break;
            case "nation":
              objinfo.nation= this.$store.state.values.nation;
              break;
            case "eduinfo":
              objinfo.eduinfo= this.$store.state.values.eduinfo;
              break;
            case "job":
              objinfo.job = this.$store.state.values.job;
              break;
            case "income":
              objinfo.income = this.$store.state.values.income;
              break;
            case "address":
              objinfo.address = this.$store.state.values.address;
              break;
            case "marry":
              objinfo.marry= this.$store.state.values.marry;
              break;
            case "hobbies":
              objinfo.hobbies= this.$store.state.values.hobbies;
              break;
            case "monologue":
              objinfo.monologue = this.$store.state.values.monologue;
              break;
            case "characters":
              objinfo.characters = this.$store.state.values.characters;
          }
          return (mark = true);
        }
      }
       for(let key in objinfo) {
            fordata.append(key,objinfo[key]);
        } 
        console.log(fordata);
        this.$store.state.selfInfo = objinfo
        console.log(this.$store.state.selfInfo)
            axios({
              url: "http://10.8.157.63:8080/user/updateUserInfo",
              method:"post",
              data:fordata,
              headers:{
                  'Content-Type':'multipart/form-data'
              }
           }).then(function(data){
               console.log(data)
               othis.$router.push({path:'/myself'})
           }).catch(function(err){
               console.log(err)
           })
    },
    show() {
      this.shows = true;
    },
    onConfirm(value, index) {
      this.shows = false;
      this.sex = value;
    },
    onCancel() {
      this.shows = false;
    },
    constellationShow() {
      this.xzshow = true;
    },
    constellationConfirm(value, index) {
      this.xzshow = false;
      this.constellation = value;
    },
    constellationCancel() {
      this.xzshow = false;
    },
    bloodShows() {
      this.bloodShow = true;
    },
    bloodConfirm(value, index) {
      this.bloodShow = false;
      this.blood = value;
    },
    bloodCancel() {
      this.bloodShow = false;
    },
    nationShows() {
      this.nationShow = true;
    },
    nationConfirm(value, index) {
      this.nationShow = false;
      this.nation = value;
    },
    nationCancel() {
      this.eduinfoShow = false;
    },
    eduinfoShows() {
      this.eduinfoShow = true;
    },
    eduinfoConfirm(value, index) {
      this.eduinfoShow = false;
      this.eduinfo = value;
    },
    eduinfoCancel() {
      this.eduinfoShow = false;
    },
    jobShows() {
      this.jobShow = true;
    },
    jobConfirm(value, index) {
      this.jobShow = false;
      this.job = value;
    },
    jobCancel() {
      this.jobShow = false;
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
    addressShows() {
      this.addressShow = true;
    },
    addressConfirm(value) {
      this.addressShow = false;
      let addressinfo = "";
      for (let i = 0; i < value.length; i++) {
        if (addressinfo != value[i].name) {
          addressinfo = addressinfo + value[i].name;
        }
      }
      this.address = addressinfo;
    },
    addressCancel() {
      this.addressShow = false;
    },
    marryShows() {
      this.marryShow = true;
    },
    marryConfirm(value, index) {
      this.marryShow = false;
      this.marry = value;
    },
    marryCancel() {
      this.marryShow = false;
    },
    marryShows() {
      this.marryShow = true;
    },
    marryConfirm(value, index) {
      this.marryShow = false;
      this.marry = value;
    },
    marryCancel() {
      this.marryShow = false;
    },
    houseShows() {
      this.houseShow = true;
    },
    houseConfirm(value, index) {
      this.houseShow = false;
      this.house = value;
    },
    houseCancel() {
      this.houseShow = false;
    }
  }
};
</script>
<style scoped>
#mid {
  margin-bottom: 50px
}
#but {
  margin: 30px 0;
  background: pink;
  border-color: pink;
}

</style>
