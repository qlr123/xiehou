<template>
  <div>
   <ul>
     <li v-for="(item,i) in list"style="text-align:center;border:1px solid gray;height:100px"@click="sat(i)">
        <van-image style="float:left" width="100" height="100" :src="item.headportrait" />
        <p 
        style="margin:20px 0 10px 0"
        >活动举办方:{{item.hostunit}}</p>
        <p
        style="margin:10px 0 10px 0"
        >活动名称:{{item.hotlistname}}</p>
      <p>活动日期:{{item.activitytime}}</p>
     </li>
   </ul>
  </div>
</template>
<script>
import axios from "axios";
import "lib-flexible";
export default {
  name: "hd",
  data() {
    return {
      list:[]
    };
  },
  mounted() {
    var _this = this;
    // console.log(_this.vname)
    axios({
      method: "post",
      url: "http://10.8.157.63:8080//user/showAllHotlist"
    }).then(data => {
      this.list = data.data;
      console.log(data)
    });
  },
  methods:{
      sat(i){
        this.$router.push({path:"/xq"})
        
      }
  },
  beforeCreate() {
    this.$store.commit("lefttitle", "返回"); //定义导航左侧名字
    this.$store.commit("righttitle", ""); //定义导航右侧按钮名字，没功能可以为空
    this.$store.commit("changeTitle", "活动"); //定义导航中间名字
    this.$store.commit("footercheck", "hd"); //底部按钮锁定，名字为路由跳转名字
  },
};
</script>
