import staticRes from './static-resource.json';
import _ from 'lodash';
window.PIXI = require('phaser-ce/build/custom/pixi.js');
window.p2 = require('phaser-ce/build/custom/p2.js');
window.Phaser = require('phaser-ce/build/custom/phaser-split.js');

class AnswerContent extends Phaser.Group {
  constructor(game, page, classSprite) {
    super(game)
    this.page = page;
    //this.style = style;
    this.game = game;
    this.classSprite = classSprite;
    debugger
    this.createUI()
  }

  createUI() {
    this.boardBg = this.game.game.createSprite(170, -744, "img_bg");
    this.addChild(this.boardBg)
    let scoreBoard = this.game.game.createSprite(10, 135, "scoreBoard")
    scoreBoard.anchor.set(0.5);
    let score = this.game.add.text(0, 10, this.classSprite.number, {
      font: 'Century Gothic',
      fontSize: '28px',
      fill: '#f1a90b',
      fontWeight: "bold"
    })
    score.anchor.set(0.5);
    scoreBoard.addChild(score);
    this.boardBg.addChild(scoreBoard);

    this.createOptions();
    this.scrollDown();
  }

  getOptionPositonArr() {
    return staticRes.localPosition.boardOption.filter(item => {
      return item.length === this.page.option.length
    })
  }

  createOptions() {
    let optionPositonArr = this.getOptionPositonArr()[0];
    this.optionSpriteArr = [];
    debugger
    optionPositonArr.forEach((position, index) => {
      let optionSprite = this.game.game.createSprite(position.x, position.y, "boardOption");
      optionSprite.disable = this.game.game.createSprite(0, 0, "boardOption_disable");
      optionSprite.light = this.game.game.createSprite(0, 0, "boardOption_light");
      optionSprite.addChild(optionSprite.disable)
      optionSprite.addChild(optionSprite.light)
      optionSprite.light.visible = false;
      optionSprite.disable.visible = false;
      this.optionSpriteArr.push(optionSprite);
      this.boardBg.addChild(optionSprite);
    });
    return this.optionSpriteArr;
  }

  scrollDown() {
    this.game.add.tween(this.boardBg).to({y: 0}, 500, 'Linear', true );
  }
}

export { AnswerContent };