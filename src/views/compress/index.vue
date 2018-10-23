<template>
  <div class="compress_wraper">
    <h1>使用compress插件压缩图片</h1>
    <br>
    <br>
    <input type="file" @change="fetchImage" ref="file" accept="image/*">
    <br>
    <br>
    <br>
    <h4>it show what's choice picture after</h4>
    <img v-show="base64str" :src="'data:image/png;base64,'+base64str"  class="rounded-circle" />
  </div>
</template>

<script>
import { compressFile } from '@/utils/img';
export default {
  data() {
    return {
      base64str: ''
    }
  },
  mounted() {
    console.log('process.env.BASE_API', process.env.BASE_API)
  },
  methods: {
    fetchImage(event) {
      const fileList = event.target.files;
      if (fileList.length === 0) return;
      console.log('fileList',fileList);
      const files = fileList;
      const file = files[0];
      let compress = compressFile(file, { quality: 0.8 }).then((data) => {
        this.base64str = data.base64str;
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
</style>
