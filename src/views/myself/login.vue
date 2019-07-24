<template>
  <div id="login-box">
    <h1>Welcome</h1>
    <h2>
      邂逅之恋
      <h3>登录页面</h3>
    </h2>

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

      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
    </van-cell-group>
    <van-button type="danger" v-on:click="login" v-bind:disabled="tjval">立即登录</van-button>
    <div class="linkbox">
      <router-link to="/register">立即注册</router-link>
      <span>|</span>
      <router-link to="/forgetpwd">忘记密码?</router-link>
      <router-link to="/" class="bc">返回主页</router-link>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import { Toast } from "vant";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      tjval: true,
      emailmsg: ""
    };
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
        login(){
            axios({
                method:'post',
                url:'http://10.8.157.63:8080/user/login',
                data:qs.stringify({email:this.email,password:this.password})
            }).then((data)=>{
                if(data.data==-1)
                {
                    Toast.fail('登录失败');
                }
                else
                {
                    Toast.success('登录成功');
                    this.$store.commit('adduserID',data.data)
                    this.$store.commit('addEmail',this.email)
                    this.$router.push({path:'/'})
                }
                
            })
        }
      }
    }
</script>
<style scoped>
#login-box {
  background: url(../../../public/images/xin.png) no-repeat top center/contain,
    url(../../../public/images/beijing.png) no-repeat center center/cover,
    linear-gradient(to bottom right, #ffa4d0, #fb7379);
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
#login-box h1 {
  font-size: 60px;
  font-weight: lighter;
  color: #fff;
  font-family: "Batang", Times, serif;
  letter-spacing: -3px;
}
#login-box h2 {
  font-family: "YouYuan";
  color: rgb(255, 255, 255);
  margin-bottom: 80px;
}
#login-box h2 h3 {
  font-family: "YouYuan";
  color: rgb(255, 255, 255);
  font-size: 12px;
  display: inline;
}
#login-box .van-hairline--top-bottom::after {
  border: none;
}
#login-box /deep/ .van-field__label {
  color: #fff;
  width: 70px;
}
#login-box .van-cell-group {
  background: rgba(255, 255, 255, 0);
}
#login-box .van-cell {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid #fff;
  margin-bottom: 25px;
  border-radius: 23px;
  color: #f2f2f2;
}
#login-box .van-cell:not(:last-child)::after {
  border: none;
}
#login-box .van-field__control {
  color: #fff;
}
#login-box .van-field__control::placeholder {
  color: #fff;
}
#login-box .van-button--danger {
  background-color: rgba(255, 255, 255, 0);
  border-color: rgba(255, 255, 255, 1);
  border-radius: 23px;
}
#login-box button {
  margin-bottom: 20px;
}
.linkbox {
  height: 50px;
}
#login-box div a {
  color: #fff;
  font-size: 14px;
}
#login-box > a {
  color: #fff;
  font-size: 14px;
  float: left;
}
.bc {
  display: block;
  margin-top: 10px;
}
#login-box div span {
  color: #fff;
  padding: 0 5px;
}

#login-box /deep/ .van-field__control::placeholder {
  color: rgba(51, 51, 51, 0.4) !important;
}
#login-box /deep/ i {
  color: #fff !important;
}
</style>
