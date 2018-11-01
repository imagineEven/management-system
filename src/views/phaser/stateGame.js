import vuePng from '@/assets/logo.png';
//import correct from '../../../static/correct.mp3';

import { BasePhaser } from '@/utils/phaser'
class StateGame { 
  constructor(game) {
    this.game = game;
  }

  preload() {
    this.game.load.image('sprite', vuePng)
    this.game.load.audio('correct', "http://4006688991.com:8080/media/8a/8acdfe001037861c206b1fac80cdff5b.ogg")
  }

  create() {
    //console.log(correct);
    let correctSound = this.game.add.audio('correct');
    //console.log('correctSound',correctSound)
    this.vueImage = this.game.add.sprite(500, 400, 'sprite')
    this.vueImage.inputEnabled = true
    this.vueImage.input.enableDrag()
    this.vueImage.events.onInputUp.add(() => {
      console.log('图片被点击了')
      correctSound.play();
      this.vueImage.inputEnabled = false
      this.rotateStart();
    })
    this.vueImage.anchor.set(0.5)
  }

  update() {

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