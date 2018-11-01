import vuePng from '@/assets/logo.png';
import bg from '@/assets/spin-the-wheel/bg.png';
import correct from '../../../static/sound/correct.mp3';
import { BasePhaser } from '@/utils/phaser'

class SpinTheWheel { 
  constructor(game) {
    this.game = game;
  }

  preload() {
    this.game.load.image('bg', bg)
  }

  create() {
    this.bg = this.game.add.sprite(0, 0, 'bg')
  }

  update() {

  }
}

export {
  SpinTheWheel
}