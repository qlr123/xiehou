<template>
    <div>
        <van-tabs v-model="active">
        <van-tab title="未读消息">
            <div class="wdwd">
                <div class="title">我的消息</div>
                <div class="wdnr">
                    <ul>
                        <li @click="detail">
                            <span class="user">螺旋霹雳爆炸</span>
                            <span class="to">给你</span>
                            <span class="do">说</span>
                            <span class="content">你妈死了草你妈的煞笔玩意日你妈狗东西尼玛死了！</span>
                            <span class="date">2019-7-23</span>
                        </li>
                            
                    </ul>
                </div>
            </div>
            <div class="xtwd">
                <div class="title">系统消息</div>
                <div class="wdnr">
                    {{neirong}} 
                </div>
            </div>
        </van-tab>
        <van-tab title="已读消息">
            <div class="wdwd">
                <div class="title">我的消息</div>
                <div class="wdnr">

                </div>
            </div>
            <div class="xtwd">
                <div class="title">系统消息</div>
                <div class="wdnr">
                    {{neirong}} 
                </div>
            </div>
        </van-tab>
        </van-tabs>

    </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';
import { Toast } from 'vant';
export default {
    data() {
        return {
            active: 2,
            neirong:'',
        };
    },
    methods:{
        detail(){}
    },
    beforeCreate(){
        this.$store.commit('lefttitle','返回')//定义导航左侧名字
        this.$store.commit('righttitle','')//定义导航右侧按钮名字，没功能可以为空
        this.$store.commit('changeTitle','我的消息')//定义导航中间名字
        this.$store.commit('footercheck','myself')//底部按钮锁定，名字为路由跳转名字

        axios({
            method:'post',
            url:'http://10.8.157.63:8080/user/myNotReadUserMessage',
            data:qs.stringify({addresser:this.$store.state.userID}),
        }).then((data)=>{
            console.log(data)//未读用户
        })

        axios({
            method:'post',
            url:'http://10.8.157.63:8080/user/myNotReadSystemMessage',
            data:qs.stringify({addresser:this.$store.state.userID}),
        }).then((data)=>{
            console.log(data)//未读系统
            if(data.data.length==0){
                console.log(123)
                this.neirong = '还没有消息哦'
            }
        })

        axios({
            method:'post',
            url:'http://10.8.157.63:8080/user/myReadUserMessage',
            data:qs.stringify({addresser:this.$store.state.userID}),
        }).then((data)=>{
            console.log(data)//已读用户
        })

        axios({
            method:'post',
            url:'http://10.8.157.63:8080/user/myReadSystemMessage',
            data:qs.stringify({addresser:this.$store.state.userID}),
        }).then((data)=>{
            console.log(data)//已读系统
        })
    }
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
  border-bottom: 1px solid #eee
}
.wdnr{
    height: 60px;
}
.wdnr ul li{
    height: 30px;
    font-size: 14px;
    border-bottom: 1 px solid #eee;
    line-height: 30px;
    text-align: left;
    padding: 0 15px;
    box-sizing: border-box;
    display: flex;
}
.content{
    display: inline-block;
    overflow: hidden;
    flex: 1;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-indent: 5px
}
.user{
    min-width: 40px;
    color: pink
}
.date{
    float: right;
    min-width: 66px;
}
</style>
