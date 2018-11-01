import vuePng from '@/assets/logo.png';
import bg from '@/assets/spin-the-wheel/bg.png';
import img_base from '@/assets/spin-the-wheel/img_base.png';
import img_wheel from '@/assets/spin-the-wheel/img_wheel.png';
import img_team_normal from '@/assets/spin-the-wheel/img_team_normal.png';
import img_team_selected from '@/assets/spin-the-wheel/img_team_selected.png';
import { BasePhaser } from '@/utils/phaser'
import data from './static-resource.json'

class SpinTheWheel { 
  constructor(game) {
    this.game = game;
    this.data = data;
  }

  preload() {
    this.game.load.image('bg', bg)
    this.game.load.image('img_base', img_base)
    this.game.load.image('img_wheel', img_wheel)
    this.game.load.image('img_team_normal', img_team_normal)
    this.game.load.image('img_team_selected', img_team_selected)
  }

  create() {
    this.createUI()
  }
  
  createUI() {
    this.bg = this.game.add.sprite(0, 0, 'bg')
    this.img_base = this.game.createSprite(this, 590, 575, 'img_base');
    this.img_base.anchor.set(0.5);
    this.wheel = this.game.createSprite(this, 590, 348, "img_wheel");
    this.wheel.anchor.set(0.5);

    let graphicsCircle = this.game.add.graphics(0, 0);
    graphicsCircle.beginFill(0x000000, 0.4);
    this.circle = graphicsCircle.drawCircle(0, 0, 376);
    this.wheel.addChild(this.circle);

    this.createClass();
  }

  createClass() {
    let style = {
      font: 'Century Gothic',
      fontSize: 18 + 'px',
      fill: '#d49766',
      fontWeight: 800
    }
    this.classGroupArr = [];

    console.log(this.data.localPosition.class)
    this.data.localPosition.class.forEach((item, index) => {
      let classGroup = this.game.createSprite(this, item.x, item.y, "img_team_normal")
      classGroup.anchor.set(0.5);
      classGroup.normal = "img_team_normal"; 
      classGroup.select = "img_team_selected";

      let classTitle = this.game.add.text(0, -50, item.title, style);
      classTitle.anchor.set(0.5)
      classTitle.type = item.type;
      classGroup.addChild(classTitle);
      this.classGroupArr.push(classGroup);

      let numberSprite = this.game.add.text(0, 0, '0', {
        font: 'Century Gothic',
        fontSize: 30 + 'px',
        fill: '#723708',
        fontWeight: 400
      });
      numberSprite.anchor.set(0.5);
      classGroup.numberSprite = numberSprite;
      classGroup.number = 0;
      classGroup.addChild(numberSprite);
      classGroup.inputEnabled = true;
      classGroup.events.onInputUp.add(this.classGroupUpEvent, this)
    })
  }

  classGroupUpEvent(event) {
    //this.playSoundPromiseByObject(this.data.localSound.clickClass.sound);
    // this.stateClassNormal();
    event.loadTexture(event.select);
    // this.classSprite = event;
    // this.stateSpinClick(true);
  }

  update() {

  }
}

export {
  SpinTheWheel
}