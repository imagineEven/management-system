<template>
  <div>
    nihao
    <div ref="gameScreen">

    </div>
    <!-- <router-view></router-view> -->
  </div>
</template>
<script>
  import 'pixi'
  import 'p2'
  import Phaser from 'phaser'
  import vuePng from '@/assets/logo.png'

  export default {
    data() {
      return {

      }
    },
    mounted() {
    this.game = new Phaser.Game('100', '100', Phaser.AUTO, this.$refs.gameScreen, {
      preload: this.preload(),
      create: this.create(),
      update: this.update()
    })
    },
    methods: {
      preload () {
        this.game.load.image('sprite', vuePng)
      },
      create () {
        let vueImage = this.game.add.sprite(0, 0, 'sprite')
        vueImage.inputEnabled = true
        vueImage.input.enableDrag()
        vueImage.events.onInputDown.add(() => {
          console.log('图片被点击了')
        })
      },
      update () {

      },
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
