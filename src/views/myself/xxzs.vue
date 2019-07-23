<template>
    <div>
        <div id="mid">
        <div>      
        <div class="pohtoshwo">
        <van-image
        width="100%"
        height="200"
        :src="this.$store.state.values.headportrait"
        />
        </div> 
            <van-cell-group>
                <van-field v-model="username" label="姓名" readonly/>
                <van-field v-model="sex" label="性别" readonly/>
                <van-field v-model="age" label="年龄"  readonly/>
                <van-field v-model="heights" label="身高"  readonly/>
                <van-field v-model="weights" label="体重"  readonly/>
                <van-field v-model="constellation" label="星座"  readonly/>
                <van-field v-model="blood" label="血型"  readonly/>
                <van-field v-model="nation" label="民族"  readonly/>
                <van-field v-model="eduinfo" label="学历"  readonly/>
                <van-field label="职业" v-model="job"  readonly/>
                <van-field label="年收入" v-model="income"  readonly/>
                <van-field label="地址" v-model="address"  readonly/>
                <van-field label="婚况" :value="marry"  readonly/>
                <van-field label="购房情况" v-model="house"  readonly/>
                <van-field label="兴趣爱好" v-model="hobbies" readonly/>
                <van-field label="独白" v-model="monologue" readonly/>
                <van-field label="性格" v-model="characters" readonly/>
            </van-cell-group>
            <van-button plain type="danger" @click="xxxg">信息修改</van-button>
        </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
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
            marrys:"",
            incomes: "",
            eduinfos: "",
            addresss: "",
            hobbiess: "",
            minMaxAge: "",
            minMaxHeight: "",
        }
    },
    methods:{
        xxxg(){
            this.$router.push({path:'/tjxx'})
        }
    },
    created(){
            this.username = this.$store.state.values.username
            this.sex = this.$store.state.values.sex
            this.age = this.$store.state.values.age +"岁"
            this.heights = this.$store.state.values.heights + "cm"
            this.weights = this.$store.state.values.weights + "kg"
            this.constellation = this.$store.state.values.constellation
            this.blood = this.$store.state.values.blood
            this.nation = this.$store.state.values.nation
            this.eduinfo = this.$store.state.values.eduinfo
            this.job = this.$store.state.values.job
            this.income = this.$store.state.values.income
            this.address = this.$store.state.values.address
            this.marry = this.$store.state.values.marry
            this.house = this.$store.state.values.house
            this.hobbies = this.$store.state.values.hobbies
            this.monologue = this.$store.state.values.monologue
            this.characters = this.$store.state.values.characters
            this.uploadFile = this.$store.state.values.uploadFile
        },
    beforeCreate(){
        this.$store.commit('lefttitle','返回')//定义导航左侧名字
        this.$store.commit('righttitle','')//定义导航右侧按钮名字，没功能可以为空
        this.$store.commit('changeTitle','信息展示')//定义导航中间名字
        this.$store.commit('footercheck','myself')//底部按钮锁定，名字为路由跳转名字

    }
}
</script>

<style scoped>
    .van-cell {
        padding-left:  0px !important;
        padding-right:  0px !important;

    }
  #mid {
      margin-bottom: 50px;
  }
</style>
