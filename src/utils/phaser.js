window.PIXI = require('phaser-ce/build/custom/pixi.js');
window.p2 = require('phaser-ce/build/custom/p2.js');
window.Phaser = require('phaser-ce/build/custom/phaser-split.js');
import vuePng from '@/assets/logo.png';
import { StateGame } from '@/views/phaser/stateGame.js';
//, preload, create, update
class BasePhaser{
  constructor(view, preload, create, update) {
    if (this.game == null) {
      this.state = {
        preload,
        create,
        update
      }
      this.game = new Phaser.Game('100', '100', Phaser.AUTO, view, this.state)
    }
  }

  allMethods() {
    this.game.add.tween(vueImage).to( { angle: 720 }, 1500, 'Linear', true).onComplete.add(() => {

    })    
  }

  toggleState() {

  }
}

export {
  BasePhaser
}
