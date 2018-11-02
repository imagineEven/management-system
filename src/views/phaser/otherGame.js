import vuePng from '@/assets/logo.png';
class OtherGame { 
  constructor() {

  }

  preload() {
    this.load.image('sprite', vuePng)
  }

  create() {
    this.vueImage = this.add.sprite(100, 100, 'sprite')
    this.vueImage.inputEnabled = true
    this.vueImage.input.enableDrag()
    this.vueImage.events.onInputUp.add(() => {
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
      this.add.tween(pahser).to( { angle: ratateAngle }, time, 'Linear', true).onComplete.add(() => {
        resolve();
      })
    })
  }
}

export {
  OtherGame
}