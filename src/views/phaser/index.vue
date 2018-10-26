<template>
  <div id='wrapper'>
    <div class="nav">
       <el-button class="back" type="primary" plain @click="clickBack">返回</el-button>
    </div>
    <div id="gameScreen" ref="gameScreen"></div>
  </div>
</template>
<script>
  import phaserFrameWork from './mixin'
  export default {
    data() {
      return {
        game: null,
        stateGame: ''
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
    background: #ffffff;
    display: flex;
    align-items: center;
  }
  #gameScreen {
    margin: 0 auto;
    height: 95vh;
  }

  #gameScreen canvas {
    display: block;
    margin: 0 auto;
  }
  .back {
    margin-left: auto;
    margin-right: 20px;
  }
</style>
