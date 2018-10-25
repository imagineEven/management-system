window.PIXI = require('phaser-ce/build/custom/pixi.js');
window.p2 = require('phaser-ce/build/custom/p2.js');
window.Phaser = require('phaser-ce/build/custom/phaser-split.js');
import vuePng from '@/assets/logo.png';
//, preload, create, update
class BasePhaser{
  constructor(view, preload, create, update) {
    if (this.game == null) {
      this.game = new Phaser.Game('100', '100', Phaser.AUTO, view, {
        preload,
        create,
        update
      })
    }
  }
}

export {
  BasePhaser
}
