<template>
  <div id='wrapper'>
    <div class="nav">
      nihao
    </div>
    <div id="gameScreen" ref="gameScreen"></div>
  </div>
</template>
<script>
  // import 'pixi'
  // import 'p2'
  // import Phaser from 'phaser'
  window.PIXI = require('phaser-ce/build/custom/pixi.js');
  window.p2 = require('phaser-ce/build/custom/p2.js');
  window.Phaser = require('phaser-ce/build/custom/phaser-split.js');
  import vuePng from '@/assets/logo.png'

  export default {
    data() {
      return {
        game: null
      }
    },
    mounted() {
      if (this.game == null) {
        this.game = new Phaser.Game('100', '100', Phaser.AUTO, this.$refs.gameScreen, {
          preload: this.preload,
          create: this.create,
          update: this.update
        })
        console.log(this.game);
      }
    },
    methods: {
      preload (game) {
        this.game.load.image('sprite', vuePng)
      },
      create (game) {
        let vueImage = this.game.add.sprite(100, 100, 'sprite')
        console.log(vueImage);
        console.log(vueImage.input);
        vueImage.inputEnabled = true
        vueImage.input.enableDrag()
        vueImage.events.onInputDown.add(() => {
          console.log('图片被点击了')
        })
      },
      update (game) {

      },
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
