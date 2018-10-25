import vuePng from '@/assets/logo.png'
import { RotateGame } from './rotateGame'
export default {

  mounted() {
    new RotateGame(this.$refs.gameScreen)
  },
  methods: {
    preload () {
      this.game.load.image('sprite', vuePng)
    },
    create () {

      let vueImage = this.game.add.sprite(100, 100, 'sprite')
      vueImage.inputEnabled = true
      vueImage.input.enableDrag()
      vueImage.events.onInputDown.add(() => {
        console.log('图片被点击了')
      })
      //game.add.tween(sprite).to( { y: game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);
    },
    update () {

    },
  }
}
