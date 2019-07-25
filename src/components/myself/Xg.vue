<template>
    <div id="xg-box">
        <van-cell-group>
        <van-field
            :value="this.$store.state.email"
            label="邮箱"
            disabled
        />
        <van-field
            v-model="password"
            label="新密码"
            placeholder="请输入要修改的密码"
            required
        />
        </van-cell-group>
        <van-button type="danger" class="regbtn" @click="xgpwd">修改密码</van-button>
    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
export default {
    
    name:'Xg',
    data(){
        return{
            password:''
        }
    },
    methods:{
        xgpwd(){
            axios({
                method:'post',
                url:'http://39.97.226.25:8082/user/resetPassword',
                data:qs.stringify({email:this.$store.state.email,password:this.password}),
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
    }

}
</script>
<style scoped>
#xg-box .van-hairline--top-bottom::after
{
    border: none
}

#xg-box /deep/ .van-field__label{
    color: #fff;
    width: 70px
}
#xg-box .van-cell-group
{
    background: rgba(255, 255, 255, 0)
}
#xg-box .van-cell{
    background: rgba(255, 255, 255, 0.1);
    border:1px solid #fff;
    margin-bottom: 25px;
    border-radius: 23px;
    color: #f2f2f2
}
#xg-box .van-cell:not(:last-child)::after
{
    border:none
}
#xg-box .van-field__control{color: #fff}
#xg-box .van-field__control::placeholder{
    color: #fff
}
#xg-box .van-button--danger {
    background-color: rgba(255, 255, 255, 0);
    border-color:  rgba(255, 255, 255, 1);
    border-radius: 23px
}
#xg-box .van-button--warning{
    border-radius: 5px;
    background-color: rgb(240, 106, 106);
    border-color:  rgb(240, 106, 106);
}
#xg-box .regbtn {
    margin-bottom: 20px;
    width: 100%
}

#xg-box /deep/ input{
    color: #fff !important
}
#xg-box /deep/ .van-field__control::placeholder{
    color: rgba(51,51,51,0.4) !important
}
#xg-box /deep/ i{
    color: #fff !important
}
.send-btn{
    display: inline-block;
    vertical-align: middle
}
#xg-box .van-hairline--top-bottom::after
{
    border: none
}
#xg-box /deep/ .van-field__label{
    color: #fff;
    width: 70px
}
#xg-box .van-cell-group
{
    background: rgba(255, 255, 255, 0)
}
#xg-box .van-cell{
    background: rgba(255, 255, 255, 0.1);
    border:1px solid #fff;
    margin-bottom: 25px;
    border-radius: 23px;
    color: #f2f2f2
}
#xg-box .van-cell:not(:last-child)::after
{
    border:none
}
#xg-box .van-field__control{color: #fff}
#xg-box .van-field__control::placeholder{
    color: #fff
}
#xg-box .van-button--danger {
    background-color: rgba(255, 255, 255, 0);
    border-color:  rgba(255, 255, 255, 1);
    border-radius: 23px;
}
#xg-box .van-button--warning{
    border-radius: 5px;
    background-color: rgb(240, 106, 106);
    border-color:  rgb(240, 106, 106);
    
}
#xg-box .regbtn {
    margin-bottom: 20px;
}

#xg-box /deep/ .van-field__control::placeholder{
    color: rgba(51,51,51,0.4) !important
}
#xg-box /deep/ i{
    color: #fff !important
}
.send-btn{
    display: inline-block;
    vertical-align: middle
    }
.dis{
    cursor: no-drop
}
.dis /deep/ input{
    cursor: no-drop
}
</style>
