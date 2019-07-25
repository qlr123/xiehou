<template>
    <div>
        <heads></heads>
        <div id="mid">
        <showInfo>
        <div :slot="userinfo">
            <van-collapse v-model="activeNames">
            <van-collapse-item title="个人信息" name="1">
                <div class="pohtoshwo">
                <img id="tu"
                :src="this.$store.state.selfInfo.headportrait"
                />
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
                <van-field readonly label="兴趣爱好" v-model="hobbies"/>
                <van-field readonly label="独白" v-model="monologue" />
                <van-field readonly label="性格" v-model="characters" />
            </van-cell-group>
            </van-collapse-item>
            </van-collapse>
           
        </div>
        <div :slot="loveinfo">
            <van-collapse v-model="activeNamess">
                <van-collapse-item title="心意对象信息" name="1">
                    <van-field label="年龄"  readonly v-model="minMaxAge" />
                    <van-field label="身高"  readonly v-model="minMaxHeight"/>
                    <van-field label="婚况"  readonly v-model="marrys" />
                    <van-field label="性别"  readonly v-model="sexs" />
                    <van-field label="年收入" readonly v-model="incomes" />
                    <van-field label="学历"  readonly v-model="eduinfos" />
                    <van-field label="地址"  readonly v-model="addresss" />
                    <van-field label="性格"  readonly v-model="hobbiess" />

                </van-collapse-item>
            </van-collapse>
        </div>
        
        </showInfo>

        
        <van-row type="flex" justify="center" v-if="nowshow" >
            
            <van-col span="6"><van-button type="warning" id="but" @click="matching" style="">发布信息</van-button></van-col>
        
        </van-row>
        </div>

        <foots></foots>
    </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import heads from "../../components/Tou"
import foots from "../../components/Foot"
import showInfo from "../../components/showInfo"
import favoredTypeVue from './favoredType.vue';
export default {
    components:{
        heads,
        foots,
        showInfo
        
    },
       beforeCreate(){
           if(this.$store.state.userID==''){
               this.$router.push("/login")
           }

        this.$store.commit('lefttitle','返回')//定义导航左侧名字
        this.$store.commit('righttitle','重新编写')//定义导航右侧按钮名字，没功能可以为空
        this.$store.commit('changeTitle','发布')//定义导航中间名字
        this.$store.commit('footercheck','addInfo')//底部按钮锁定，名字为路由跳转名字\
    
    },
    methods:{
        
       matching(){
           let data = this.$store.state.favoredType;
           data.id = this.$store.state.userID;
           console.log(data);
            axios({
            method: "post",
            url: "http://10.8.157.63:8080/user/chooseMate",
            params:data,
            headers:{
                  'Content-Type':'multipart/form-data'
              }
            }).then((data)=>{
                console.log(data);
                if(data.data.length==0){
                    this.$toast({
                    message: '目前没有合适的人选哦',
                    icon: 'like-o'
                    });
                }else if(data.data.length!=0){
                    this.$router.push("/chat");
                }
            })
            
       }
    },
    updated(){
    
    },
    data(){
        return {
            userinfo:"",
            loveinfo:"",
            activeNames: ['1'],
            activeNamess:['1'],
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
            id:"",
            marrys:"",
            incomes: "",
            eduinfos: "",
            addresss: "",
            hobbiess: "",
            minMaxAge: "",
            minMaxHeight: "",
            nowshow:false,
            sexs:""
            
        }
    },
    mounted(){
        axios({
            method: "post",
            url: "http://10.8.157.63:8080/user/showUserById",
            data: qs.stringify({ id: this.$store.state.userID })
    }).then(data => {
      console.log(data);
      this.$store.commit("newinfos",data.data);
           if(this.$store.state.values!=''){
           let objs = {}
            objs.headportrait = this.$store.state.values.headportrait
            objs.username = this.$store.state.values.username  
            objs.sex = this.$store.state.values.sex  
            objs.age = this.$store.state.values.age
            objs.heights  = this.$store.state.values.heights 
            objs.weights = this.$store.state.values.weights
            objs.constellation = this.$store.state.values.constellation 
            objs.blood = this.$store.state.values.blood
            objs.nation = this.$store.state.values.nation
            objs.eduinfo = this.$store.state.values.eduinfo
            objs.job = this.$store.state.values.job
            objs.income = this.$store.state.values.income
            objs.address = this.$store.state.values.address
            objs.marry = this.$store.state.values.marry
            objs.house = this.$store.state.values.house
            objs.hobbies = this.$store.state.values.hobbies
            objs.monologue = this.$store.state.values.monologue
            objs.characters = this.$store.state.values.characters 
            objs.uploadFile = this.$store.state.values.uploadFile
            this.$store.state.selfInfo = objs;
       }
        if(this.$store.state.selfInfo!=null) {
            this.userinfo = "u"
            this.username = this.$store.state.selfInfo.username
            this.sex = this.$store.state.selfInfo.sex
            this.age = this.$store.state.selfInfo.age +"岁"
            this.heights = this.$store.state.selfInfo.heights + "cm"
            this.weights = this.$store.state.selfInfo.weights + "kg"
            this.constellation = this.$store.state.selfInfo.constellation
            this.blood = this.$store.state.selfInfo.blood
            this.nation = this.$store.state.selfInfo.nation
            this.eduinfo = this.$store.state.selfInfo.eduinfo
            this.job = this.$store.state.selfInfo.job
            this.income = this.$store.state.selfInfo.income
            this.address = this.$store.state.selfInfo.address
            this.marry = this.$store.state.selfInfo.marry
            this.house = this.$store.state.selfInfo.house
            this.hobbies = this.$store.state.selfInfo.hobbies
            this.monologue = this.$store.state.selfInfo.monologue
            this.characters = this.$store.state.selfInfo.characters
            this.uploadFile = this.$store.state.selfInfo.uploadFile
        }
        if(this.$store.state.favoredType!=null) {
            this.loveinfo = "c"
            this.marrys = this.$store.state.favoredType.marry
            this.incomes =this.$store.state.favoredType.income
            this.eduinfos = this.$store.state.favoredType.eduinfo
            this.addresss = this.$store.state.favoredType.address
            this.hobbiess = this.$store.state.favoredType.hobbies
            this.minMaxAge = this.$store.state.favoredType.minAge +"岁至" + this.$store.state.favoredType.maxAge +"岁"
            this.minMaxHeight = this.$store.state.favoredType.minHeight +"cm至" + this.$store.state.favoredType.maxHeight+"cm"
            this.sexs = this.$store.state.favoredType.sex;
           
        }

      
    });
         

        if(this.$store.state.favoredType!=null&&this.$store.state.selfInfo!=null) {
            this.nowshow = true;
        }

    },created(){
      
    },
 
}
</script>

<style scoped>
    .van-cell {
        padding-left:  0px !important;
        padding-right:  0px !important;

    }
  #mid {
      margin-bottom: 50px;
      text-align: left !important
  }
  #but {
  margin: 30px 0;
  background: pink;
  border-color: pink;
}
#mid #tu {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    margin: 0 auto;
}
</style>
