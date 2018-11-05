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
    this.createUI()
  }

  createUI() {
    this.boardBg = this.game.game.createSprite(170, -744, "img_bg");
    this.addChild(this.boardBg)
    
    this.createTitle()

    this.lalala2 = this.game.game.createSprite(0, 284, "fanzao")
    this.boardBg.addChild(this.lalala2);

    this.lalala = this.game.game.createSprite(-170, 0, "img_delete_bg")
    this.boardBg.addChild(this.lalala);
    this.lalala.alpha = 0;

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
    this.createOptionsText()
    this.scrollDown();
  }

  getOptionPositonArr() {
    return staticRes.localPosition.boardOption.filter(item => {
      return item.length === this.page.option.length
    })
  }

  createTitle() {
    let question = this.game.game.createSprite(80, 134,"img_question")
    //question.anchor.set(0.5);
    this.boardBg.addChild(question);

    this.text = this.game.add.text(0, 0, this.page.title, {
      boundsAlignV: "middle"
    });
    this.text.setTextBounds(20, 0, 680, 150);
    question.addChild(this.text);
    if (this.text.height > 150) {
      this.text.y = (this.text.height - 150)/2
      this.text.inputEnabled = true;
      this.text.input.enableDrag();
      this.text.input.allowHorizontalDrag = false;
    }
  }

  createOptions() {
    let optionPositonArr = this.getOptionPositonArr()[0];
    this.optionSpriteArr = [];
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

  createOptionsText() {
    let style = {
      font: 'Century Gothic',
      fontSize: 26 + 'px',
      fill: '#000000',
      fontWeight: 400
    }
    let newOptionSpriteArr = _.shuffle(this.optionSpriteArr)
    this.page.option.forEach((item, index) => {
      let text = this.game.add.text(64, 15, item.text, style);
      newOptionSpriteArr[index].addChild(text);
      newOptionSpriteArr[index].oldIndex = text.oldIndex = index;
      newOptionSpriteArr[index].inputEnabled = true;
      newOptionSpriteArr[index].events.onInputUp.add(this.OptionUpEvent, this)
    })
  }

  OptionUpEvent(event) {
    this.game.game.setObjectArrayClicked(this.optionSpriteArr, false);
    if (event.oldIndex === 0) {
      this.answerRight(event)
    } else {
      this.answerErr(event)
    }
  }

  answerRight(event) {
    event.light.visible = true
    this.game.game.playSoundPromiseByObject('selectCorrect').then(() => {
      this.scrollUp(1)
    })
    
  }

  answerErr(event) {
    event.disable.visible = true;
    this.game.game.playSoundPromiseByObject("selectErr").then(() => {
      this.scrollUp(0)
    })
  }

  scrollUp(power) {
    this.lalala.alpha = 0;
    this.game.add.tween(this.boardBg).to({y: -744}, 500, 'Linear', true ).onComplete.add(() => {
      if (power) {
        this.game.answerRight()
      } else {
        this.game.answerErr()
      }
    })
  }

  scrollDown() {
    this.game.add.tween(this.boardBg).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true ).onComplete.add(() => {
      this.lalala.alpha = 1;
    })
  }
}

export { AnswerContent };