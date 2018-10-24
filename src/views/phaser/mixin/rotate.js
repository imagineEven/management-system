import vuePng from '@/assets/logo.png';
import { BasePhaser } from '@/utils/phaser'
class Rotate extends BasePhaser{
  constructor(view) {
    //let self = this
    // let preload = (game) => {
    //   this.game.load.image('sprite', vuePng)
    // }
    // let create = (game) => {
    //   let vueImage = this.game.add.sprite(100, 100, 'sprite')
    //   vueImage.inputEnabled = true
    //   vueImage.input.enableDrag()
    //   vueImage.events.onInputDown.add(() => {
    //     console.log('图片被点击了')
    //   })
    // }
    // let update = (game) => {

    // }
    //let self =
    super(view, (game) => {
      this.preload(game).bind(rotate);
    }, (game) => {
      this.create(game).bind(rotate);
    }, (game) => {
      this.update(game).bind(rotate);
    });
  }

  preload(game) {
    debugger
    this.game.load.image('sprite', vuePng)
  }

  create(game) {
    debugger
    let vueImage = this.game.add.sprite(100, 100, 'sprite')
    vueImage.inputEnabled = true
    vueImage.input.enableDrag()
    vueImage.events.onInputDown.add(() => {
      console.log('图片被点击了')
    })
    //game.add.tween(sprite).to( { y: game.world.centerY }, 4000, Phaser.Easing.Bounce.Out, true);
  }

  update(game) {

  }
}

let rotate = new Rotate();

export {
  Rotate
}