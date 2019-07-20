<template>
    <div id="yz-box">
        <van-cell-group>
        <van-field
            v-model="email"
            required
            clearable
            label="邮箱"
            right-icon="question-o"
            placeholder="请输入邮箱"
            @click-right-icon="$toast('user@host.domainnames')"
            v-on:blur="checkemail"
            v-bind:error-message="emailmsg"
        />
        <van-field
            v-model="sms"
            center
            clearable
            label="验证码"
            placeholder="请输入邮箱验证码"
         class="tjbox">
            <van-button slot="button" size="small" type="warning" class="send-btn" @click="send" v-bind:disabled="val">{{title}}</van-button>
        </van-field>
        </van-cell-group>
        <van-button type="danger" class="regbtn" @click="pwdback" v-bind:disabled="tjval">找回密码</van-button>
    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
export default {
    name:'Yz',
    data(){
        return{
            email:'',
            sms:'',
            title:'发送验证码',
            val:false,
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
                url:'http://10.8.157.63:8080/user/forgetPassword',
                data:qs.stringify({email:this.email}),
            }).then((data)=>{
                switch(data.data)
                {
                    case 0 :
                        Toast.fail('验证码发送失败');
                        break;
                    case -1 :
                        Toast.fail('邮箱尚未注册，请先注册!');
                        this.$router.push({path:'/register'})
                        break;
                    case 1 :
                        Toast.success('验证码已发送');
                }
            })
        },
        pwdback(){
            axios({
                method:'post',
                url:'http://10.8.157.63:8080/user/vaildYzm',
                data:qs.stringify({email:this.email,yzm:this.sms}),
            }).then((data)=>{
                console.log(data)
                this.$store.commit('addEmail',data.data)
                this.$router.push({path:'/Xg'})
            })
        }
    }
}
</script>
<style scoped>
#yz-box .van-hairline--top-bottom::after
{
    border: none
}

#yz-box /deep/ .van-field__label{
    color: #fff;
    width: 70px
}
#yz-box .van-cell-group
{
    background: rgba(255, 255, 255, 0)
}
#yz-box .van-cell{
    background: rgba(255, 255, 255, 0.1);
    border:1px solid #fff;
    margin-bottom: 25px;
    border-radius: 23px;
    color: #f2f2f2
}
#yz-box .van-cell:not(:last-child)::after
{
    border:none
}
#yz-box .van-field__control{color: #fff}
#yz-box .van-field__control::placeholder{
    color: #fff
}
#yz-box .van-button--danger {
    background-color: rgba(255, 255, 255, 0);
    border-color:  rgba(255, 255, 255, 1);
    border-radius: 23px
}
#yz-box .van-button--warning{
    border-radius: 5px;
    background-color: rgb(240, 106, 106);
    border-color:  rgb(240, 106, 106);
}
#yz-box .regbtn {
    margin-bottom: 20px;
    width: 100%
}

#yz-box /deep/ input{
    color: #fff !important
}
#yz-box /deep/ .van-field__control::placeholder{
    color: rgba(51,51,51,0.4) !important
}
#yz-box /deep/ i{
    color: #fff !important
}
.send-btn{
    display: inline-block;
    vertical-align: middle
}
#yz-box .van-hairline--top-bottom::after
{
    border: none
}
#yz-box /deep/ .van-field__label{
    color: #fff;
    width: 70px
}
#yz-box .van-cell-group
{
    background: rgba(255, 255, 255, 0)
}
#yz-box .van-cell{
    background: rgba(255, 255, 255, 0.1);
    border:1px solid #fff;
    margin-bottom: 25px;
    border-radius: 23px;
    color: #f2f2f2
}
#yz-box .van-cell:not(:last-child)::after
{
    border:none
}
#yz-box .van-field__control{color: #fff}
#yz-box .van-field__control::placeholder{
    color: #fff
}
#yz-box .van-button--danger {
    background-color: rgba(255, 255, 255, 0);
    border-color:  rgba(255, 255, 255, 1);
    border-radius: 23px;
}
#yz-box .van-button--warning{
    border-radius: 5px;
    background-color: rgb(240, 106, 106);
    border-color:  rgb(240, 106, 106);
    
}
#yz-box .regbtn {
    margin-bottom: 20px;
}
#yz-box /deep/ input{
    color: #fff !important
}
#yz-box /deep/ .van-field__control::placeholder{
    color: rgba(51,51,51,0.4) !important
}
#yz-box /deep/ i{
    color: #fff !important
}
.send-btn{
    display: inline-block;
    vertical-align: middle
    }
.tjbox{
    padding: 7px 15px
}
</style>
