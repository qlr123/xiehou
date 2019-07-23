<template>
  <div style="position:relative">
    <van-nav-bar
      title="动态"
      left-text="返回"
      right-text="发布"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-cell-group style="border:1px solid #000 ;width:90vw;margin:0 auto">
      <van-field type="textarea" rows="10" cols="1" v-model="value" placeholder="请输入内容" />
    </van-cell-group>
    <van-uploader
      v-model="fileList"
      multiple
      :max-count="1"
      style="position:absolute;top:34vh;left:20px"
      upload-text="上传图片"
    />
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "dongtai",
  data() {
    return {
      value: "",
      fileList: [],
      show: "true",
      img: "",
      file: ""
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },

    onClickRight() {
      var formdata = new FormData();
      if (this.fileList.length != 0) {
        this.file = this.fileList[0].file;
        // console.log(1);
      } else {
        this.file = "";
        // console.log(0);
      }

      var id = this.$route.query.id;
      var data = {};
      if (id) {
        //修改动态
        data = {
          dynamiccontent: this.value,
          uploadFile: this.file,
          id: id
        };
        for (let key in data) {
          formdata.append(key, data[key]);
        }
        axios({
          method: "post",
          headers: { "Content-Type": "multipart/form-data" },
          url: "http://10.8.157.63:8080/user/updateDynamic",
          data: formdata
        }).then(res => {
          // console.log(res);
        });
        // console.log(1);
      } else {
        //新增动态
        data = {
          dynamiccontent: this.value,
          uploadFile: this.file,
          userId: 1
        };
        for (let key in data) {
          formdata.append(key, data[key]);
        }
        // console.log(0);
        axios({
          method: "post",
          headers: { "Content-Type": "multipart/form-data" },
          url: "http://10.8.157.63:8080/user/addDynamic",
          data: formdata
        }).then(res => {
          // console.log(res);
        });
      }

      /*  var data = {
        dynamiccontent: this.value,
        uploadFile: this.file,
        userId: 1
      }; */
    }
  }
};
</script>




