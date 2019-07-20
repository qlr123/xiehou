<template>
    <div id="forget-box">
        
        <h1>Welcome</h1>
        <h2>邂逅之恋
            <h3>密码找回页面</h3>
        </h2>
        <router-view>
        </router-view>
        
        <div class="linkbox">
            <router-link to="/login">返回登录</router-link>
            <span>|</span>
            <router-link to="/home">返回主页</router-link>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs'
export default {
    name:'Forgetpwd',
    data(){
        return{
            email:'',
            password:''
        }
    },
    methods:{
        
    }
}
</script>
<style scoped>
#forget-box{
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
#forget-box h1{font-size: 60px;
font-weight: lighter;
color: #fff;
font-family: "Batang", Times, serif;
letter-spacing: -3px
}
#forget-box h2{
    font-family:"YouYuan";
    color: rgb(255, 255, 255);
    margin-bottom: 80px;
}
#forget-box h2 h3{
    font-family:"YouYuan";
    color: rgb(255, 255, 255);
     font-size: 12px;
     display: inline;
}

.linkbox{
    height: 50px;
}
.linkbox a{
    color: #fff;
    font-size: 14px
}
.linkbox span{
    color: #fff;
    padding: 0 5px
}


</style>