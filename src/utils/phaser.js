window.PIXI = require('phaser-ce/build/custom/pixi.js');
window.p2 = require('phaser-ce/build/custom/p2.js');
window.Phaser = require('phaser-ce/build/custom/phaser-split.js');

// this.game = new Phaser.Game('100', '100', Phaser.AUTO, this.$refs.gameScreen, {
//   preload: rotate.preload,
//   create: rotate.create,
//   update: rotate.update
// })

class BasePhaser extends Phaser.Game {
  constructor(view, preload, create, update) {
    console.log('BasePhaser')
    super('100', '100', Phaser.AUTO, view, {
      preload: preload,
      create: create,
      update: update
    })
  }

  nihao() {

  }
}

export {
  BasePhaser
}