import vuePng from '@/assets/logo.png';
import { BasePhaser } from '@/utils/phaser'
class RotateGame extends BasePhaser{
  constructor(view) {
    super(view, () => {
      this.mypreload()
    }, () => {
      this.mycreate()
    }, () => {
      this.myupdate()
    });
  }

  mypreload() {
    this.game.load.image('sprite', vuePng)
  }

  mycreate() {
    let vueImage = this.game.add.sprite(100, 100, 'sprite')
    vueImage.inputEnabled = true
    vueImage.input.enableDrag()
    vueImage.events.onInputDown.add(() => {
      console.log('图片被点击了')
    })
    //game.add.tween(sprite).to( { y: game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);
  }

  myupdate() {

  }
}

export {
  RotateGame
}