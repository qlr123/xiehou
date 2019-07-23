<template>
  <div>
    <van-tabbar v-model="active" router active-color="rgb(239, 66, 168)">
      <van-tabbar-item name="home" icon="home-o" @click="tohome">首页</van-tabbar-item>
      <van-tabbar-item name="addInfo" icon="eye-o" @click="toaddInfo">发布</van-tabbar-item>
      <van-tabbar-item name="hd" icon="like-o" @click="tohd">活动</van-tabbar-item>
      <van-tabbar-item name="myself" icon="manager" @click="tomyself">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: this.$store.state.fcheck
    };
  },
  methods: {
    tohome() {
      this.$router.push({ path: "/" });
    },
    toaddInfo() {
      this.$router.push({ path: "/addInfo" });
    },
    tohd() {
      this.$router.push({ path: "/hd" });
    },
    tomyself() {
      this.$router.push({ path: "/myself" });
    }
  }
};
</script>
