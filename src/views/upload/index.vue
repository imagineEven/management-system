<template>
  <div>
    <input type="file" accept="image/*" @change="onFileInputChange">
  </div>
</template>
<script>
  export default {
    data() {
      return {
        
      }
    },
    methods: {
      onFileInputChange(event) {
        console.log('why')
        var _URL = window.URL || window.webkitURL;
        var file, img;
        if ((file = this.files[0])) {
          img = new Image();
          //img.src = _URL.createObjectURL(file);
        }
      },
    }
  }
</script>
<style>

</style>
