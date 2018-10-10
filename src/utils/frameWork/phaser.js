// import 'pixi'
// import 'p2'
// import Phaser from 'phaser'

class initPhaser {
  constructor(vueInstance) {
    this.game = new Phaser.Game('100', '100', Phaser.AUTO, vueInstance.$refs.gameScreen, {
      preload: function preload () {
        vueInstance.preload(this.game)
      },
      create: function create () {
        vueInstance.create(this.game)
      },
      update: function update () {
        vueInstance.update(this.game)
      }
    })
  }
}

export {
  initPhaser
}