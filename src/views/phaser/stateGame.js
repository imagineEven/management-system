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
      this.vueImage.inputEnabled = false
      this.rotateStart();
    })
    this.vueImage.anchor.set(0.5)
  }

  myupdate() {

  }

  rotateStart() {
    this.rotateMethod(this.vueImage, 360, 500).then(() => {
      return this.rotateMethod(this.vueImage, 720, 1200)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 360, 1000)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 360, 1500)
    }).then(() => {
      return this.rotateMethod(this.vueImage, 90, 1500)
    }).then(() => {
      this.vueImage.inputEnabled = true
    })
  }

  rotateMethod(pahser, ratateAngle, time ) {
    return new Promise((resolve, reject) => {
      this.game.add.tween(pahser).to( { angle: ratateAngle }, time, 'Linear', true).onComplete.add(() => {
        resolve();
      })
    })
  }
}

export {
  StateGame
}