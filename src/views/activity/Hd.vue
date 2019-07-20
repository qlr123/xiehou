<template>
    <div>
        <van-cell-group style="border:1px solid gray">
<van-image
style="border:1px solid gray"
  width="100"
  height="100"
  src="https://img.yzcdn.cn/vant/cat.jpeg"
  to="/xq.vue"
/>
  <van-field
  to="/xq.vue"
    v-model="vname"
    label="名字"
    placeholder="请输入用户名"
  />
 <van-field
    v-model="vname"
    label="日期"
    placeholder=""
  />
   <van-field
    v-model="vname"
    label="地址"
    placeholder="请输入地址"
  />
</van-cell-group>
 
    </div>
</template>
<script>
import axios from 'axios';
import 'lib-flexible'
export default {
    name:"hd",
    data(){
        return{
            vname:"2222",
        }
    },
    mounted(){
      var _this = this
      console.log(_this.vname)
        axios({
          method:"post",
          url:"http://10.8.157.63:8080//user/showAllHotlist"
        }).then((data)=>{
           
          data = data.data
          console.log(data)
          for(var i in data){

            _this.vname = data[0].adresss
            console.log(_this)
            console.log(data[i])
          }
        })
    },
    beforeCreate(){
        this.$store.commit('lefttitle','返回')//定义导航左侧名字
        this.$store.commit('righttitle','')//定义导航右侧按钮名字，没功能可以为空
        this.$store.commit('changeTitle','活动')//定义导航中间名字
        this.$store.commit('footercheck','hd')//底部按钮锁定，名字为路由跳转名字
    },
    methods:{

    }
}
</script>
