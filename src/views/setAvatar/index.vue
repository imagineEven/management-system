<template>
  <div class="compress_wraper">

    <img :src="base64str ? 'data:image/png;base64,'+base64str: 'https://www.gravatar.com/avatar/default?s=200&r=pg&d=mm'" class="rounded-circle" />
    <br>
    <br>
    <div class="file-box">
      <input type="file" @change="fetchImage" ref="file" accept="image/*" value="nihao" class="file-btn"/>
      更换头像
    </div>
    <br>
    <br>
      <input type="file" @change="fetchVideo" accept="video/*">
    <br>
    <button @click="clickUpload"> sure? </button>
    <br>
    <video v-show="videoSrc" controls :src="videoSrc" class="video_content"></video>
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
      url: '',
      videoSrc: ''
    }
  },
  methods: {
    clickUpload() {
      api.upload(this.file).then(res => {
        console.log(res)
      })
    },
    fetchVideo(event) {
      const fileList = event.target.files;
      let url = URL.createObjectURL(fileList[0]);
      this.videoSrc = url;
    },
    fetchImage(event) {
      const fileList = event.target.files;
      if (fileList.length === 0) return;
      const reader = new FileReader();
      reader.readAsDataURL(fileList[0]);
      reader.onload=(e) =>{
        this.base64str = e.target.result.split(',')[1];
      }
    }
  }
}  
</script>

<style>
.video_content {
  height: 200px;
  width: 200px;
}
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


