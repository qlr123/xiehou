<template>
    <div id="xgmm-box">
        <div class="title">修改密码页</div>
        <div class="box" :style="{'height': height}">
            <van-cell-group>
                <van-field 
                    v-model="this.$store.state.email" 
                    label="邮箱" 
                    left-icon="envelop-o" 
                    disabled />
                <van-field 
                    v-model="password" 
                    label="新密码" 
                    left-icon="lock" 
                    placeholder="请输入新密码"/>
                <van-field 
                    v-model="password1" 
                    label="确认密码" 
                    left-icon="lock" 
                    placeholder="请再次输入新密码"
                    v-on:blur="checkpwd"
                    v-bind:error-message="pwdmsg"/>
                <van-button type="danger" v-on:click="save" v-bind:disabled="tjval" :style="{'margin-top':'20px'}">保存修改</van-button>
            </van-cell-group>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
export default {
    data(){
        return{
            password:'',
            password1:'',
            height:'',
            pwdmsg:'',
            tjval: true
        }
    },
    methods: {
      checkpwd() {
        if (this.password == this.password1){
            this.pwdmsg = "";
            this.tjval = false;
        } else {
            this.pwdmsg = "你输入的两次密码不相同！";
            this.tjval = true;
        }
    },
    save(){
        axios({
                method:'post',
                url:'http://10.8.157.63:8080/user/resetPassword',
                data:qs.stringify({email:this.$store.state.email,password:this.password1}),
            }).then((data)=>{
                switch(data.data)
                {
                    case 0 :
                        Toast.fail('密码重置失败!请稍后再试');
                        break;
                    case 1 :
                        Toast.success('密码已重置！请重新登录');
                        this.$router.push({path:'/login'})
                }
            })
    }  
    },
    beforeCreate(){
        if(this.$store.state.email=='')
        {
            // Toast.fail('你还尚未登录，请登录！');
            // this.$router.push({path:'/login'})
        }
        this.$store.commit('lefttitle','返回')//定义导航左侧名字
        this.$store.commit('righttitle','')//定义导航右侧按钮名字，没功能可以为空
        this.$store.commit('changeTitle','修改密码')//定义导航中间名字
        this.$store.commit('footercheck','myself')//底部按钮锁定，名字为路由跳转名字
    },
    beforeMount(){
        var h= document.body.clientHeight-158;
        this.height = h+'px'
    },

}
</script>
<style scoped>
.title {
  height: 60px;
  line-height: 60px;
  font-size: 16px;
  font-weight: 800;
  text-align: left;
  padding-left: 15px;
  box-sizing: border-box;
  background: linear-gradient(to bottom, #fa6481, #fff);
}
.box{
    margin-top: 40px
}
#xgmm-box .van-hairline--top-bottom::after{
  border: none;
}
</style>
