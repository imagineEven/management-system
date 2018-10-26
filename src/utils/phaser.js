import vuePng from '@/assets/logo.png';
import { StateGame } from '@/views/phaser/stateGame.js';

class BasePhaser{
  constructor(view) {
      this.game = new Phaser.Game('100', '100', Phaser.AUTO, view)
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
