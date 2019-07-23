<template>
  <div>
    <van-nav-bar
      title="我的动态"
      left-text="返回"
      right-text="添加"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div style="margin-top:46px">
      <ul>
        <li style="position:relative;padding:14px;height:auto" v-for="info in userlist">
          <van-image style="float:left" width="100" height="100" :src="info.headportrait" />
          <p
            style="width:160px;float:left ;text-align:left;margin-left:20px;margin-top:10px"
          >{{info.dynamicTime}}</p>
          <van-button @click="showPopup">
            <van-icon name="arrow-down" />
          </van-button>
          <van-popup class="dongtai" v-model="show">
            <div @click="pingbi(info.id)">
              <span>置顶</span>
            </div>
            <div @click="jubao(info.id)">
              <span>删除</span>
            </div>
            <div @click="bianji(info.id)">
              <span>编辑</span>
            </div>
          </van-popup>

          <div class="neirong">
            <p>{{info.dynamiccontent}}</p>
            <img :src="info.dynamicImgUrl" :class="info.dynamicImgUrl!=null?'img1':'img2'" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "myaction",
  data() {
    return {
      show: false,
      userlist: ""
    };
  },
  mounted() {
    //获取动态
    axios({
      method: "post",
      url: "http://10.8.157.63:8080/user/showDynamicById",
      params: { id: 1 }
    }).then(res => {
      //   console.log(res.data);
      this.userlist = res.data;
      //   console.log(res.data[0].headportrait);
    });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      this.$router.push({ name: "dongtai" });
    },
    showPopup() {
      this.show = true;
    },

    pingbi(id) {
      console.log("置顶");
      axios({
        method: "post",
        url: "http://10.8.157.63:8080/user/upDynamic",
        params: { id: id, userId: 1 }
      }).then(res => {
        // console.log(res);
        location.reload();
      });
    },

    jubao(id) {
      console.log("删除", id);

      axios({
        method: "post",
        url: "http://10.8.157.63:8080/user/deleteDynamic",
        params: { id: id }
      }).then(res => {
        // console.log(res);
        location.reload();
      });
    },
    bianji(id) {
      //   console.log("编辑");
      //   console.log(id);
      this.$router.push({ name: "dongtai", query: { id: id } });
    }
  }
};
</script>

<style scoped>
.dongtai {
  position: absolute;
  overflow: hidden;
  padding: 5px;
  height: 88px;
  width: 143px;
  left: 283px;
  top: 102px;
}
.dongtai div {
  margin-top: 5px;
}
.neirong {
  height: auto;
  width: 93vw;
  border: 1px solid #000;
  margin: 0 auto;
  margin-top: 60px;
}
.img1 {
  width: 100px;
  height: 100px;
}
.img2 {
  display: none;
}
</style>
