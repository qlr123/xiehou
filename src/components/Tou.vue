<template>
  <div id="header-box">
    <van-nav-bar
      z-index="2"
      :fixed="true"
      :title="this.$store.state.title"
      :left-text="this.$store.state.leftTitle"
      :right-text="this.$store.state.rightTitle"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
export default {
  name: "tou",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push("/favoredType");
      
      
    }
  },
  data() {
    return {};
  }
};
</script>
<style scoped>
#header-box{
  height: 48px;
}
#header-box .van-nav-bar {
  background: #fa6481;
  height: 48px;
  display: flex;
}
#header-box .van-nav-bar .van-icon {
  color: #fff;
}
#header-box .van-nav-bar__text {
  color: #fff;
  line-height: 48px;
}
#header-box .van-nav-bar__title {
  color: #fff;
  letter-spacing: 2px;
  font-size: 15px;
}
</style>

