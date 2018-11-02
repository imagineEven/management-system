
class BasePhaser{
  constructor(view) {
      this.game = new Phaser.Game(1180, 708, Phaser.CANVAS, view)
      this.game.currentSounds = [];
      this.createAllMethods()
  }
  createAllMethods() {
    this.game.createSprite = this.createSprite;
    this.game.playSoundPromiseByObject = this.playSoundPromiseByObject;
    this.game.setObjectArrayClicked = this.setObjectArrayClicked;
    this.game.waitByPromise = this.waitByPromise;
  }

  waitByPromise(time) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      },time)
    })
  }

  createSprite(x, y, boj) {
    return this.add.sprite(x, y, boj)
  }

  setObjectArrayClicked(objectArr, canClicked, skipIndex) {
    skipIndex = skipIndex === undefined ? -1 : skipIndex;
    objectArr.forEach((e, i) => {
      if (i !== skipIndex) {
        e.inputEnabled = canClicked;
      }
    });
  }

  playSoundPromiseByObject(sound) {
    let music = this.add.audio(sound);
    music.play();
    this.currentSounds.forEach((item, i) => {
      item.onStop.removeAll();
      item.stop();
    })
    let promise = new Promise((resolve) => {
      music.resolve = resolve;
      this.currentSounds.push(music);
      music.onStop.add(() => {
        music.onStop.removeAll();
        this.currentSounds = [];
        resolve();
      });
    });
    return promise;
  }
}

export {
  BasePhaser
}
