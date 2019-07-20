<template>
 <div>
<van-nav-bar
  title="报名"
  left-arrow
  :fixed=true
  @click-left="onClickLeft"
/>
<van-row style="margin-top:46px">
  <van-col span="12">
    <van-cell-group>
  <van-field
    v-model="name"
    required
    clearable
    label="姓名"
    right-icon="question-o"
    placeholder="姓名"
  />
   <van-field
    v-model="sex"
    required
    clearable
    label="性别"
    right-icon="question-o"
    placeholder="male"
  />
  <van-field

    v-model="age"
    required
    clearable
    label="年龄"
    right-icon="question-o"
    placeholder="male"
  />
  <van-field
    v-model="phone"
    label="手机号"
    placeholder="请输入手机号"
  />
</van-cell-group>
  </van-col>
  <van-col span="12">
<van-uploader :before-read="beforeRead" >
  <van-button  style="width:120px;height:126px">上传图片</van-button>
</van-uploader>
  </van-col>
</van-row>
<van-cell-group style="margin-top:10px">
 <van-field
    v-model="hk"
    required
    clearable
    label="婚况"
    right-icon="question-o"
    placeholder=""
  />
 <van-field
    v-model="adress"
    required
    clearable
    label="工作地"
    right-icon="question-o"
    placeholder=""
  />
   <van-field
    v-model="work"
    required
    clearable
    label="职业"
    right-icon="question-o"
    placeholder=""
  />
   <van-field
    v-model="lent"
    required
    clearable
    label="身高"
    right-icon="question-o"
    placeholder=""
  />
   <van-field
    v-model="weight"
    required
    clearable
    label="体重"
    right-icon="question-o"
    placeholder=""
  />
   <van-field
    v-model="money"
    required
    clearable
    label="年收入"
    right-icon="question-o"
    placeholder=""
  />
<van-tabbar v-model="active">
  <van-button type="info" style="margin:0 auto">我要报名</van-button>
</van-tabbar>
  </van-cell-group>
    </div>
</template>
<script>
import axios from 'axios';
import 'lib-flexible'
export default {
    name:"Bm",
    data(){
      return{
        active:"0",
        value:"2",
        name:"2",
        phone:"2",
        sex:"男",
        age:"18",
        hk:"单身",
        money:"5毛",
        adress:"八大胡同",
        lent:"三四米",
        weight:"50斤",
        work:"banzhuan"
      }
    },
    mounted(){
      let _this = this
      axios({
        method:"post",
        url:"http://10.8.157.63:8080/user/showAllHotlist",
        
      }).then((data)=>{
        _this.data = data.data
        console.log(_this.data)
      })
    },

    methods:{
 onClickLeft() {
    this.$router.go(-1)
    },
       beforeRead(file) {
      if (file.type !== 'image/jpg') {
        return false;
      }

      return true;
    },
    }
}
</script>
