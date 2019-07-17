<template>
  <div>
    <van-tabbar v-model="active" router active-color="rgb(239, 66, 168)">
      <van-tabbar-item name="home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item name="eye" icon="eye-o">发布</van-tabbar-item>
      <van-tabbar-item name="like" icon="like-o">活动</van-tabbar-item>
      <van-tabbar-item name="manager" icon="manager">个人</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: "home"
    };
  }
};
</script>
