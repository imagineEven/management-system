<template>
  <div class="compress_wraper">

    <img :src="base64str ? 'data:image/png;base64,'+base64str: 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'"  class="rounded-circle" />
    <br>
    <br>
    <div class="file-box">
      <input type="file" @change="fetchImage" ref="file" accept="image/*" value="nihao" class="file-btn"/>
      更换头像
    </div>
    <br>
    <br>
    <br>
    <br>
    <button @click="clickUpload"> sure? </button>
  </div>
</template>

<script>
import { compressFile } from '@/utils/img';
import api from '@/api/index';
export default {
  data() {
    return {
      base64str: '',
      file: '',
      url: ''
    }
  },
  methods: {
    clickUpload() {
      api.upload(this.file).then(res => {
        console.log(res)
      })
    },

    fetchImage(event) {
      const fileList = event.target.files;
      if (fileList.length === 0) return;
      const files = fileList;
      const file = files[0];
      this.file = file;
      let compress = compressFile(file, { quality: 0.8 }).then((data) => {
        this.base64str = data.base64str;
        this.file = data.fileBlob;
      })
    }
  }
}  
</script>

<style>
.rounded-circle {
  width: 200px;
  height: 200px;
}
.compress_wraper {
  margin-top: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.fileInput {
  height: 60px;
  width: 60px;
  background: bisque;
}
.file-box{
  display: inline-block;
  position: relative;
  padding: 3px 5px;
  overflow: hidden;
  color:green;
  background-color: #ccc;
}
.file-btn{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  outline: none;
  -moz-opacity:0;
  -khtml-opacity: 0;
  opacity: 0;
}
</style>


