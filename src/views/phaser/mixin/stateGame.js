import vuePng from '@/assets/logo.png';
import { BasePhaser } from '@/utils/phaser'
class StateGame extends BasePhaser{ 
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
    this.vueImage = this.game.add.sprite(500, 400, 'sprite')
    this.vueImage.inputEnabled = true
    this.vueImage.input.enableDrag()
    this.vueImage.events.onInputDown.add(() => {
      console.log('图片被点击了')
    })
    this.vueImage.anchor.set(0.5)
    this.rotateMethod(this.vueImage, 360, 500).then(() => {
      return this.rotateMethod(this.vueImage, 360, 700)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 360, 800)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 360, 900)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 360, 1200)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 360, 1800)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 90, 2200)
    })
  }

  myupdate() {

  }

  rotateMethod(pahser, ratateAngle, time ) {
    return new Promise((resolve, reject) => {
      this.game.add.tween(pahser).to( { angle: +ratateAngle }, time, 'Linear', true).onComplete.add(() => {
        resolve();
      })
    })
  }
}

export {
  StateGame
}