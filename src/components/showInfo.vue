<!--这个是发布模块使用的组件-->
<template>
  <div>
      <slot name="u">
        <van-row type="flex" justify="center">
          <van-button icon="manager-o" type="primary" round id="but" to="/release">编辑个人信息</van-button>
        </van-row>
      </slot>
      <slot name="c">
        <van-row type="flex" justify="center">
          <van-button icon="like-o" type="primary" round id="but" to="/favoredType">编辑心意对象信息</van-button>
        </van-row>
      </slot>
  </div>
</template>
    
<script>
export default {
  data() {
    return {};
  },
  methods: {
    getImg() {
      vant.ImagePreview(["图片地址"]);
    }
  }
};
</script>

<style scoped>
 
    #but{
      width: 70vw;
      height: 15vh;
      font-size: 20px;
      margin:60px 0;
    }
    
</style>

