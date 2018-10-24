window.PIXI = require('phaser-ce/build/custom/pixi.js');
window.p2 = require('phaser-ce/build/custom/p2.js');
window.Phaser = require('phaser-ce/build/custom/phaser-split.js');
import vuePng from '@/assets/logo.png'
import { Rotate } from './rotate'

export default {

  mounted() {
    new Rotate(this.$refs.gameScreen)
    // if (this.game == null) {
    //   this.game = new Phaser.Game('100', '100', Phaser.AUTO, this.$refs.gameScreen, {
    //     preload: rotate.preload,
    //     create: rotate.create,
    //     update: rotate.update
    //   })
    // }
  },
  methods: {
    // preload (game) {
    //   this.game.load.image('sprite', vuePng)
    // },
    // create (game) {

    //   let vueImage = this.game.add.sprite(100, 100, 'sprite')
    //   vueImage.inputEnabled = true
    //   vueImage.input.enableDrag()
    //   vueImage.events.onInputDown.add(() => {
    //     console.log('图片被点击了')
    //   })
    //   //game.add.tween(sprite).to( { y: game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);
    // },
    // update (game) {

    // },
  }
}
