<template>
    <div id="register-box">
        <h1>Welcome</h1>
        <h2>邂逅之恋
            <h3>注册页面</h3>
        </h2>
        <van-cell-group>
        <van-field
            v-model="email"
            required
            clearable
            label="邮箱"
            right-icon="question-o"
            placeholder="请输入邮箱"
            v-bind:error-message="emailmsg"
            @click-right-icon="$toast('邮箱格式：user@host.domainnames')"
            v-on:blur="checkemail"
        />

        <van-field
            v-model="password"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
        />
        <van-field
            v-model="sms"
            center
            clearable
            label="验证码"
            placeholder="请输入邮箱验证码"
        >
            <van-button slot="button" size="small" type="warning" class="send-btn" @click="send" v-bind:disabled="val">{{title}}</van-button>
        </van-field>
        </van-cell-group>
        <van-button type="danger" class="regbtn" @click="register"  v-bind:disabled="tjval">立即注册</van-button>
        <div class="linkbox">
            <router-link to="/login">已有账号</router-link>
            <span>|</span>
            <router-link to="/home">返回主页</router-link>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
export default {
    name:'Forgetpwd',
    data(){
        return{
            email:'',
            password:'',
            sms:'',
            val:false,
            title:'发送验证码',
            emailmsg:"",
            tjval:true

        }
    },
    methods:{
        checkemail(){
            var str = this.email
            var close =true;
            var open = false
            var patt = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            var value = patt.test(str)
            if(value==true)
            {
                this.emailmsg ="";
                this.tjval =open
            }else
            {
                this.emailmsg ="邮箱格式有误请重新修改！"
                this.tjval =close
            }
        },
        send(){
            var time = 60 ;
            this.val = true;
            this.title = time;
            var othis = this;
            function timeover(){
                if(time>0)
                {
                    time = time-1;
                    othis.title = time
                    setTimeout(timeover,1200)  
                }else
                {
                    othis.val = false;
                    othis.title = "发送验证码"
                }
            }
            timeover();
            axios({
                method:'post',
                url:'http://10.8.157.63:8080/user/validEmail',
                data:qs.stringify({email:this.email}),
            }).then((data)=>{
                switch(data.data)
                {
                    case 0 :
                        Toast.fail('邮箱已注册,不可重复注册!');
                        break;
                    case -1 :
                        Toast.fail('验证码发送失败');
                        break;
                    case 1 :
                        Toast.success('验证码已发送');
                }
                
            })
        },
        register(){

            axios({
                method:'post',
                url:'http://10.8.157.63:8080/user/register',
                data:qs.stringify({email:this.email,password:this.password,yzm:this.sms}),
            }).then((data)=>{
                console.log(data)

            }).catch((data)=>{
                console.log(data)
            })
        }
    }
}
</script>
<style scoped>
#register-box{
    background: url(../../../public/images/xin.png) no-repeat top center/contain,
    url(../../../public/images/beijing.png) no-repeat center center/cover,
    linear-gradient(to bottom right, #ffa4d0, #fb7379)
    ;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
#register-box h1{font-size: 60px;
font-weight: lighter;
color: #fff;
font-family: "Batang", Times, serif;
letter-spacing: -3px
}
#register-box h2{
    font-family:"YouYuan";
    color: rgb(255, 255, 255);
    margin-bottom: 80px;
}
#register-box h2 h3{
    font-family:"YouYuan";
    color: rgb(255, 255, 255);
     font-size: 12px;
     display: inline;
}
#register-box .van-hairline--top-bottom::after
{
    border: none
}
.linkbox{
    height: 50px;
}
#register-box /deep/ .van-field__label{
    color: #fff;
    width: 70px
}
#register-box .van-cell-group
{
    background: rgba(255, 255, 255, 0)
}
#register-box .van-cell{
    background: rgba(255, 255, 255, 0.1);
    border:1px solid #fff;
    margin-bottom: 25px;
    border-radius: 23px;
    color: #f2f2f2
}
#register-box .van-cell:not(:last-child)::after
{
    border:none
}
#register-box .van-field__control{color: #fff}
#register-box .van-field__control::placeholder{
    color: #fff
}
#register-box .van-button--danger {
    background-color: rgba(255, 255, 255, 0);
    border-color:  rgba(255, 255, 255, 1);
    border-radius: 23px
}
#register-box .van-button--warning{
    border-radius: 5px;
    background-color: rgb(240, 106, 106);
    border-color:  rgb(240, 106, 106);
}
#register-box .regbtn {
    margin-bottom: 20px;
}
#register-box div a{
    color: #fff;
    font-size: 14px
}
#register-box div span{
    color: #fff;
    padding: 0 5px
}
#register-box /deep/ input{
    color: #fff !important
}
#register-box /deep/ .van-field__control::placeholder{
    color: rgba(51,51,51,0.4) !important
}
#register-box /deep/ i{
    color: #fff !important
}
.send-btn{
    display: inline-block;
    vertical-align: middle
    }


</style>