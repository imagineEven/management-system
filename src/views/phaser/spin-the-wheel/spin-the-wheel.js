import vuePng from '@/assets/logo.png';
import bg from '@/assets/spin-the-wheel/bg.png';
import img_base from '@/assets/spin-the-wheel/img_base.png';
import img_wheel from '@/assets/spin-the-wheel/img_wheel.png';
import img_team_normal from '@/assets/spin-the-wheel/img_team_normal.png';
import img_team_selected from '@/assets/spin-the-wheel/img_team_selected.png';
import img_spin from '@/assets/spin-the-wheel/img_spin.png';
import img_spin_disable from '@/assets/spin-the-wheel/img_spin_disable.png';
import img_bg from '@/assets/spin-the-wheel/img_bg.png';
import img_delete_bg from '@/assets/spin-the-wheel/img_delete_bg.png';
import img_score from '@/assets/spin-the-wheel/img_score.png';
import img_answer from '@/assets/spin-the-wheel/img_answer.png';
import img_answer_right from '@/assets/spin-the-wheel/img_answer_right.png';
import img_answer_wrong from '@/assets/spin-the-wheel/img_answer_wrong.png';
import img_question from '@/assets/spin-the-wheel/img_question.png';
import fanzao from '@/assets/spin-the-wheel/fanzao.png';

import six_deepYellow_disable from '@/assets/spin-the-wheel/six/six_deepYellow_disable.png';
import six_deepYellow_light from '@/assets/spin-the-wheel/six/six_deepYellow_light.png';
import six_deepYellow from '@/assets/spin-the-wheel/six/six_deepYellow.png';
import six_yellow_disable from '@/assets/spin-the-wheel/six/six_yellow_disable.png';
import six_yellow_light from '@/assets/spin-the-wheel/six/six_yellow_light.png';
import six_yellow from '@/assets/spin-the-wheel/six/six_yellow.png';

import song from '../../../../static/sound/spin-the-wheel/song.ogg'
import rotate_stop from '../../../../static/sound/spin-the-wheel/rotate_stop.mp3'
import rotate from '../../../../static/sound/spin-the-wheel/rotate.mp3'
import selectCorrect from '../../../../static/sound/spin-the-wheel/selectCorrect.mp3'
import selectErr from '../../../../static/sound/spin-the-wheel/selectErr.mp3'
import addScore from '../../../../static/sound/spin-the-wheel/addScore.mp3'

import { BasePhaser } from '@/utils/phaser'
import data from './static-resource.json'
import _ from 'lodash';
import { AnswerContent } from './answer-content';

class SpinTheWheel { 
  constructor(game) {
    this.data = data;
    this.game = game;
  }

  preload() {
    this.load.image('bg', bg)
    this.load.image('img_base', img_base)
    this.load.image('img_wheel', img_wheel)
    this.load.image('img_team_normal', img_team_normal)
    this.load.image('img_team_selected', img_team_selected)
    this.load.image('img_spin', img_spin)
    this.load.image('img_spin_disable', img_spin_disable)
    this.load.image('img_bg', img_bg)
    this.load.image('scoreBoard', img_score)
    this.load.image('boardOption', img_answer)
    this.load.image('boardOption_light', img_answer_right)
    this.load.image('boardOption_disable', img_answer_wrong)
    this.load.image('img_question', img_question)
    this.load.image('img_delete_bg', img_delete_bg)
    this.load.image('fanzao', fanzao)
    
    this.load.image('six_yellow', six_yellow)
    this.load.image('six_yellow_light', six_yellow_light)
    this.load.image('six_yellow_disable', six_yellow_disable)
    this.load.image('six_deepYellow', six_deepYellow)
    this.load.image('six_deepYellow_light', six_deepYellow_light)
    this.load.image('six_deepYellow_disable', six_deepYellow_disable)
    
    this.load.image('img_spin_disable', img_spin_disable)

    this.load.audio('song', song)
    this.load.audio('rotate', rotate)
    this.load.audio('rotate_stop', rotate_stop)
    this.load.audio('selectCorrect', selectCorrect)
    this.load.audio('selectErr', selectErr)
    this.load.audio('addScore', addScore)
  }

  create() {
    this.classSprite = '';
    this.angleSprite = '';
    this.optionSpriteArr = [];
    this.angleArr = [];
    this.newPages = _.shuffle(this.data.pages)
    this.createUI()
  }
  
  createUI() {
    this.bg = this.add.sprite(0, 0, 'bg')
    this.img_base = this.game.createSprite(590, 575, 'img_base');
    this.img_base.anchor.set(0.5);
    this.wheel = this.game.createSprite(590, 348, "img_wheel");
    this.wheel.anchor.set(0.5);

    let graphicsCircle = this.add.graphics(0, 0);
    graphicsCircle.beginFill(0x000000, 0.4);
    this.circle = graphicsCircle.drawCircle(0, 0, 376);
    this.wheel.addChild(this.circle);

    this.createClass();
    this.createSpin();
    this.createOptions();

  }


  createClass() {
    let style = {
      font: 'Century Gothic',
      fontSize: 18 + 'px',
      fill: '#d49766',
      fontWeight: 800
    }
    this.classGroupArr = [];

    this.data.localPosition.class.forEach((item, index) => {
      let classGroup = this.game.createSprite(item.x, item.y, "img_team_normal")
      classGroup.anchor.set(0.5);
      classGroup.normal = "img_team_normal"; 
      classGroup.select = "img_team_selected";

      let classTitle = this.add.text(0, -50, item.title, style);
      classTitle.anchor.set(0.5)
      classTitle.type = item.type;
      classGroup.addChild(classTitle);
      this.classGroupArr.push(classGroup);

      let numberSprite = this.add.text(0, 0, '0', {
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

  createSpin() {
    this.spin_disable = this.game.createSprite(590, 335, 'img_spin_disable');
    this.spin_disable.anchor.set(0.5)
    let spin = this.game.createSprite(0, 0, 'img_spin');
    spin.anchor.set(0.5)
    spin.visible = false;
    this.spin_disable.spin = spin;
    this.spin_disable.addChild(spin);
    this.spin_disable.events.onInputUp.add(this.spinUpEvent, this)
  }

  createOptions() {
    let optionDetail = this.getOptionDetail();
    let optionPositonArr = optionDetail.context;
    this.optionSpriteArr = [];

    optionPositonArr.forEach((position, index) => {
      let optionSprite = '';
      if (index%2 === 0) {
        optionSprite = this.game.createSprite(0, 0, optionDetail.optionA.image);
        optionSprite.disable = this.game.createSprite(0, -94, optionDetail.optionA_disable.image)
        optionSprite.light = this.game.createSprite(0, -98, optionDetail.optionA_light.image)
        optionSprite.light.anchor.set(0.5)
        optionSprite.disable.anchor.set(0.5)
        optionSprite.disable.alpha = 0;
        optionSprite.light.alpha = 0;
        optionSprite.addChild(optionSprite.disable)
        optionSprite.addChild(optionSprite.light)
      } else {
        optionSprite = this.game.createSprite(0, 0, optionDetail.optionB.image);
        optionSprite.disable = this.game.createSprite(0, -94, optionDetail.optionB_disable.image)
        optionSprite.light = this.game.createSprite(0, -98, optionDetail.optionB_light.image)
        optionSprite.light.anchor.set(0.5)
        optionSprite.disable.anchor.set(0.5)
        optionSprite.disable.alpha = 0;
        optionSprite.light.alpha = 0;
        optionSprite.addChild(optionSprite.disable)
        optionSprite.addChild(optionSprite.light)
      }
      optionSprite.anchor.set(0.5, 1)
      optionSprite.angle =  - position.angle;
      optionSprite.rotateAngle = position.angle;
      optionSprite.title =  position.text;
      optionSprite.index = index;
      this.optionSpriteArr.push(optionSprite);
      this.angleArr.push(optionSprite);
      this.circle.addChild(optionSprite);
      optionSprite.text = this.game.add.text(0, -150, position.text, {
        font: 'Century Gothic',
        fontSize: 33 + 'px',
        fill: '#f43f56',
        fontWeight: 400
      });
      optionSprite.text.anchor.set(0.5, 0);
      optionSprite.addChild(optionSprite.text);
    });
    return this.optionSpriteArr;
  }

  getOptionDetail() {
    let optionDetail = '';
    this.data.localImage.wheelOption.forEach(element => {
      if(element.sign === this.data.pages.length) {
        optionDetail = element;
      }
    });
    return optionDetail;
  }

  classGroupUpEvent(event) {
    this.game.playSoundPromiseByObject('song');
    this.stateClassNormal();
    event.loadTexture(event.select);
    this.classSprite = event;
    this.classSprite = event;
    this.stateSpinClick(true);
  }

  stateSpinClick(power) {
    this.spin_disable.spin.visible = power;
    this.spin_disable.inputEnabled = power;
  }

  stateClassNormal() {
    this.classGroupArr.forEach(item => {
      item.loadTexture(item.normal)
    })
  }

  startRandom() {
    let newAngleArr = _.shuffle(this.angleArr);
    return newAngleArr[0];
  }

  spinUpEvent() {
    this.spin_disable.inputEnabled = false;
    this.game.setObjectArrayClicked(this.classGroupArr, false);
    this.angleSprite = this.startRandom()
    this.angleSprite.rotateAngle === 0 ? this.angleSprite.rotateAngle = 360 : undefined;
    this.game.playSoundPromiseByObject('rotate', 0.2)
    this.rotateMethod(this.circle, 360, 1000).then(() => {
      return this.rotateMethod(this.circle, this.angleSprite.rotateAngle, this.angleSprite.rotateAngle*8)
    }).then(() => {
    this.game.playSoundPromiseByObject('rotate_stop')

     this.flasherSprite(this.angleSprite)
      return this.game.waitByPromise(1200)
    }).then(() => {
      this.scrollAnswerContent()
    })
  }

  scrollAnswerContent() {
    let newPage = this.newPages[0]
    this.answerContent = new AnswerContent(this, newPage, this.classSprite);
  }

  flasherSprite(angleSprite) {
    this.circle.setChildIndex(angleSprite, this.circle.children.length - 1);
    angleSprite.light.alpha = 1;

    this.game.waitByPromise(200).then(() => {
      angleSprite.light.alpha = 0;
      return this.game.waitByPromise(200)
    }).then(() => {
      angleSprite.light.alpha = 1;
      return this.game.waitByPromise(200)
    }).then(() => {
      angleSprite.light.alpha = 0;
      return this.game.waitByPromise(200)
    }).then(() => {
      angleSprite.light.alpha = 1;
      return this.game.waitByPromise(200)
    }).then(() => {
      angleSprite.light.alpha = 0;
      return this.game.waitByPromise(200)
    })
  }

  rotateMethod(pahser, ratateAngle, time ) {
    return new Promise((resolve, reject) => {
      this.add.tween(pahser).to( { angle: ratateAngle }, time, 'Linear', true).onComplete.add(() => {
        resolve();
      })
    })
  }

  answerRight() {
    this.remove(this.angleSprite);
    this.newPages.splice(0, 1);
    this.angleSprite.text.alpha = 0.2;
    this.angleSprite.disable.alpha = 1;

    this.stateSpinClick(false);
    this.addScore()
    this.stateClassNormal();
    this.angleSprite = '';
  }

  addScore() {
    let selectScore = this.angleSprite.title
    this.createTipsScore(selectScore)
  }

  createTipsScore(selectScore) {
    let style = {
      font: 'Century Gothic',
      fontSize: '20px',
      fill: '#723708',
      fontWeight: 600
    }
    selectScore === 'x2' ? undefined :  selectScore = '+' + selectScore;
    let tipsScore = this.add.text(20, 0, selectScore, style);
    tipsScore.anchor.set(0.5);
    tipsScore.alpha = 0;
    this.classSprite.addChild(tipsScore);
    this.game.playSoundPromiseByObject("addScore")
    this.game.waitByPromise(800).then(() => {
      this.createNewScore(selectScore);
    })
    this.add.tween(tipsScore).to( { alpha: 1, y: -30 }, 1000, 'Linear', true).onComplete.add(() => {
      tipsScore.destroy();
    })
  }

  createNewScore(selectScore) {
    let style = {
      font: 'Century Gothic',
      fontSize: "30px",
      fill: '#723708',
      fontWeight: 400
    }
    let originScore = this.classSprite.number;
    let realScore = ''
    if (selectScore === 'x2') {
      realScore = Number(originScore)*2 + ''
    } else {
      realScore = Number(originScore) + Number(selectScore) + ''
    }
    this.classSprite.numberSprite.destroy();
    this.classSprite.numberSprite = this.add.text(0, 0, realScore, style);
    this.classSprite.numberSprite.anchor.set(0.5)
    this.classSprite.addChild(this.classSprite.numberSprite);
    this.classSprite.number = realScore;
    if (this.newPages.length > 0) {
      this.game.setObjectArrayClicked(this.classGroupArr, true);
    }
  }

  answerErr() {
    this.stateSpinClick(false);
    this.stateClassNormal();
    this.game.setObjectArrayClicked(this.classGroupArr, true);
    this.angleSprite = '';
    this.classSprite = '';
  }

  remove(value) {
    let index = this.angleArr.indexOf(value);
    if (index > -1) {
      this.angleArr.splice(index, 1);
    }
  }

  update() {
    if (this.answerContent && this.answerContent.text && this.answerContent.text.height > 150) {
      this.answerContent.text.y > (this.answerContent.text.height - 150)/2 ? this.answerContent.text.y = (this.answerContent.text.height - 150)/2 : undefined;
      if (this.answerContent.text.y < 0) {
        Math.abs(this.answerContent.text.y) > (this.answerContent.text.height - 150)/2 ? this.answerContent.text.y = -(this.answerContent.text.height - 150)/2 : undefined;
      }
    }
  }
}

export {
  SpinTheWheel
}