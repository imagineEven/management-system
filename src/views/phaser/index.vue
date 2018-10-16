<template>
  <div id='wrapper'>
    <div class="nav">
      nihao
    </div>
    <div id="gameScreen" ref="gameScreen"></div>
  </div>
</template>
<script>
  import phaserFrameWork from './mixin'
  export default {
    data() {
      return {
        game: null
      }
    },
    mixins: [ phaserFrameWork ],
    mounted() {

    },
    methods: {

    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  #wrapper {
    height: 100vh;
  }
  .nav {
    height: 5vh;
    background: red;
  }
  #gameScreen {
    margin: 0 auto;
    height: 95vh;
  }

  #gameScreen canvas {
    display: block;
    margin: 0 auto;
  }
</style>
