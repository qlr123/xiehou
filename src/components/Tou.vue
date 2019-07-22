<template>
  <div id="header-box">
    <van-nav-bar 
    :title="this.$store.state.title" 
    :left-text="this.$store.state.leftTitle" 
    :right-text="this.$store.state.rightTitle" 
    left-arrow 
    @click-left="onClickLeft"
    @click-right="onClickRight"
    :fixed="true"
    />
  </div>
</template>

<script>
export default {
  name: "tou",
  data(){
    return{

    }
    
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onClickRight() {
      this.$router.push("/addInfo")
    }
  },
  data(){
    return {
      
    }
  }
};
</script>
<style scoped>
#header-box .van-nav-bar
{
  background: #fa6481;
  height: 48px;
  display: flex;
}
#header-box .van-nav-bar .van-icon
{
  color: #fff
}
#header-box .van-nav-bar__text
{
  color: #fff;
  line-height: 48px
}
#header-box .van-nav-bar__title
{
  color:	#fff;
  letter-spacing: 2px;
  font-size: 15px
}
</style>

