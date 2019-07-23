<template>
  <div>
    <heads></heads>
    <div id="mid">
      <van-row type="flex">
        <van-col span="4" style="line-height:44px;color:#323233;font-size: 14px;">年龄</van-col>
        <van-col span="8">
          <van-field v-model="minAge" placeholder="最小值" type="number" right-icon="question-o"
            :error-message="minAgeerr" 
            @click-right-icon="$toast('最小年龄大18岁')"
          />
        </van-col>
        <van-col span="4" style="line-height:44px;color:#323233;font-size: 14px;">至</van-col>
        <van-col span="8">
          <van-field v-model="maxAge" placeholder="最大值" type="number" right-icon="question-o"
          @click-right-icon="$toast('最大年龄需要大于最小年龄且小于100岁')" 
           :error-message="maxAgeerr"
        />
        </van-col>
      </van-row>


      <van-row type="flex">
        <van-col span="4" style="line-height:44px;color:#323233;font-size: 14px;">身高</van-col>
        <van-col span="8">
          <van-field v-model="minHeight" placeholder="最小值" type="number" right-icon="question-o"
          @click-right-icon="$toast('身高的最小值为100cm')" 
          :error-message="minHeighterr"
          />
        </van-col>
        <van-col span="4" style="line-height:44px;color:#323233;font-size: 14px;">至</van-col>
        <van-col span="8">
          <van-field v-model="maxHeight" placeholder="最大值" type="number" right-icon="question-o"
          :error-message="maxHeighterr"
          @click-right-icon="$toast('最大身高需要大于最小身高且小于300cm')" />
        </van-col>
      </van-row>

      <van-field v-model="marry" label="婚状" @click="marryShows" readonly placeholder="请选择您期望的婚姻状况" />
      <van-popup v-model="marryShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="marryColumns"
          @cancel="marryCancel"
          @confirm="marryConfirm"
        />
      </van-popup>

    <van-field v-model="income" label="年收入" readonly @click="incomeShows"  placeholder="请填写您的年收入" />
      <van-popup v-model="incomeShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="incomeColumns"
          @cancel="incomeCancel"
          @confirm="incomeConfirm"
        />
      </van-popup>

      <van-field v-model="eduinfo" label="学历" @click="eduinfoShows" readonly placeholder="请选择写您期望的学历" />
      <van-popup v-model="eduinfoShow" style="width:100%" position="bottom">
        <van-picker
          show-toolbar
          :columns="eduinfoColumns"
          @cancel="eduinfoCancel"
          @confirm="eduinfoConfirm"
        />
      </van-popup>

      <van-field v-model="address" label="地址" @click="addressShows" readonly placeholder="请选择你的所在地" />
      <van-popup v-model="addressShow" style="width:100%" position="bottom">
        <van-area :area-list="areaList" @cancel="addressCancel" @confirm="addressConfirm" />
      </van-popup>

      <van-field
        v-model="hobbies"
        label="性格"
        type="textarea"
        placeholder="请填写您期望的"
        rows="1"
        autosize
        right-icon="question-o"
        @click-right-icon="$toast('您需要简单的描述下您期望对方的性格特点')"
      />

      <van-row type="flex" justify="center">
        <van-button type="danger" size="small" id="but" @click="upload">提交</van-button>
      </van-row>
    </div>
  </div>
</template>
<script>
import list from "../../../public/js/list";
import heads from "../../components/Tou";
export default {
  components: {
    heads
  },
  data() {
    return {
      marry: "",
      marryShow: false,
      marryColumns: ["未婚", "单身离异", "离异带孩", "丧偶单身", "丧偶带孩"],
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
      eduinfo: "",
      eduinfoShow: false,
      eduinfoColumns: ["高中及以下", "专科", "本科", "研究生", "博士"],
      address: "",
      addressShow: false,
      areaList: list,
      hobbies: "",
      minAge: "",
      maxAge: "",
      minHeight: "",
      maxHeight: "",
      minAgeerr:"",
      maxAgeerr:"",
      minHeighterr:"",
      maxHeighterr:"",
      minAgeboll:true,
      maxAgeboll:true,
      minHeightbool:true,
      maxHeightbool:true,
    };
  },
  watch:{
      minAge:function(newinfo){
          if(newinfo>=18&&newinfo<=100){
            this.minAgeerr = "";
            this.minAgeboll = true;
          }else {
            this.minAgeerr = "年龄不合理"
            this.minAgeboll = false;
          }
      },
      maxAge:function(newinfo){
          if(this.minAge==""){
            this.maxAgeerr = "请先填写最小值";
            this.maxAgeboll = false;
          }else {
              if(newinfo>this.minAge&&newinfo<100){
                  this.maxAgeerr = "";
                  this.maxAgeboll = true;
              }else{
                  this.maxAgeerr = "身高不合理"
                  this.maxAgeboll = false;
              }
          }
      },
       minHeight:function(newinfo){
          if(newinfo>=100&&newinfo<=300){
            this.minHeighterr = ""
            this.minHeightbool = true;
          }else {
            this.minHeighterr = "最小身高不合理";
            this.minHeightbool = false;
          }
      },
      maxHeight:function(newinfo){
          if(this.minHeight==""){
            this.maxHeighterr = "请先填写最小值";
            this.maxHeightbool = false;
          }else {
              if(newinfo>this.minHeight&&newinfo<300){
                  this.maxHeighterr = "" 
                  this.maxHeightbool = true;
              }else{
                  this.maxHeighterr = "请按照规则填写"
                  this.maxHeightbool = false;
              }
        }
      
      
  }
  },

  
  methods: {
    upload() {
      let mark = true; 
      let tipinfo = "";
      let obj = {minAge:this.minAge,
                maxAge:this.maxAge,minHeight:this.minHeight,
                maxHeight:this.maxHeight ,marry: this.marry,income:this.income,
                eduinfo:this.eduinfo,address:this.address,
                hobbies:this.hobbies };
                console.log(obj);
                
                for (const key in obj) {
                    if (obj[key] == "") {
                         switch (key) {
                            case "marry":
                                tipinfo = "请选择您期望婚姻状况";
                                break;
                            case "income":
                                tipinfo = "请选择您期望的年薪";
                                break;
                            case "eduinfo":
                                tipinfo = "请选择您期望的教育经历";
                                break;
                            case "address":
                                tipinfo = "请选择您期望的位置";
                                break;
                            case "hobbies":
                                tipinfo = "请您简要描述期望的性格";
                                break;
                            case "minAge":
                                tipinfo = "请您填写最小年龄";
                                break;
                            case "maxAge":
                                tipinfo = "请选择您期望的最大年龄";
                                break;
                            case "minHeight":
                                tipinfo = "请选择您期望的最小身高";
                                break;
                            case "maxHeight":
                                tipinfo = "请选择您期望的最大身高";
                                break;
                         }
                        this.$toast(tipinfo);
                        return (mark = false);
                    }
                }
                if(mark&&this.maxHeightbool&&this.minHeightbool&&this.minAgeboll&&this.maxAgeboll){
                    this.$store.state.favoredType = obj
                }else {
                     this.$toast("请按照规则填写");
                }
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
  }
};
</script>
<style scoped>
#mid {
  margin-top: 46px;
}
.van-col {
  /*border-left:1px solid #ebedf0;
    border-right:1px solid #ebedf0; */
  text-align: center;
}
.van-cell{
  text-align: left !important;
}
#but {
  margin: 30px 0;
  background: pink;
  border-color: pink;
}
</style>
