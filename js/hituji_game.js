import { kanjiList } from "./kanjilist.js";

export default class HitsujiGame extends Phaser.Scene {
  constructor() {
    super({ key: "hituji_game", active: false });
    this.kanjiIndex = 0;
    this.kanjiComponents = [];
    this.timer = 0;
    this.answerCounter = 0;
    this.wrongFlag = false;
  }

  preload() {
    // bgm
    this.load.audio("game_bgm", "../audio/timer.mp3");
    this.load.audio("correct_se", "../audio/correct.mp3");
    this.load.audio("but_se", "../audio/but_se.mp3");
  }

  init(data) {
    this.mode = data.mode;
    this.schoolYear = data.schoolYear;
    this.sizeY = data.size[0] - 0;
    this.sizeX = data.size[2] - 0;
    this.kanjiList = kanjiList[data.schoolYear];
  }

  create() {
    // 背景
    const BgGameMenu = this.add.graphics();
    BgGameMenu.fillStyle(0xeaeaea, 1).fillRect(0, 0, 1024, 768);
    BgGameMenu.depth = 0;

    // 音声アイコン枠描画
    const SoundCircle = this.add.graphics();
    SoundCircle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
    SoundCircle.depth = 3;

    // 音声アイコン
    const SoundIcon = this.add.sprite(70, 700, "sound");
    let SoundStatus = 1;
    SoundIcon.depth = 4;
    SoundIcon.setInteractive();

    // 音楽
    // ゲームBGM
    const fx = this.sound.add("game_bgm");
    fx.allowMultiple = false;
    fx.setLoop(true);

    SoundIcon.on(
      "pointerdown",
      () => {
        if (SoundStatus === 0) {
          fx.play();
          SoundStatus = 1;
        } else if (SoundStatus === 1) {
          fx.stop();
          SoundStatus = 0;
        }
      },
      this
    );

    for (let y = 0; y < this.sizeY; y+=1 ) {
      for (let x = 0; x < this.sizeX; x+=1) {
        this.kanjiComponents.push([]);
        this.kanjiComponents[y].push(
          this.add
            .text(100 + x * 100, 200 + y * 100, "　", {
              fill: 0x333333,
              fontSize: 60,
              fontFamily: "Arial",
            })
            .setInteractive()
        );
      }
    }

    this.updateKanji();

    if (this.mode === "timeLimit") {
      this.timerComponent = this.add.text(
        310,
        54,
        `残り時間：${60 - this.timer}秒`,
        {
          fill: 0x333333,
          fontSize: 50,
          fontFamily: "Arial",
        }
      );
    } else if (this.mode === "timeAttack") {
      this.timerComponent = this.add.text(10, 10, `残り時間：${this.timer}秒`, {
        fontSize: 50,
        fontFamily: "Arial",
      });
    }

    this.answerComponent = this.add
      .text(360, 671, `正解数:${this.answerCounter}問`, {
        fill: 0x333333,
        fontSize: 50,
        fontFamily: "Arial",
      })
      .setOrigin(1, 0);

    this.time.addEvent({
      delay: 1000,
      repeat: Infinity,
      callback: this.countTime,
      callbackScope: this,
    });
  }

  countTime() {
    this.timer+=1;
    this.check();

    if (this.mode === "timeLimit") {
      this.timerComponent.setText(`残り時間：${60 - this.timer}秒`);
    } else if (this.mode === "timeAttack") {
      this.timerComponent.setText(`${this.timer}秒`);
    }
  }

  check() {
    const fx = this.sound.add("game_bgm");
    if (
      (this.mode === "timeLimit" && this.timer >= 60) ||
      (this.mode === "timeAttack" && this.answerCounter >= 10) ||
      (this.mode === "suddenDeath" && this.wrongFlag)
    ) {
      fx.stop();
      this.scene.start("game_result", {
        time: this.timer,
        answers: this.answerCounter,
      });
    }
  }

  shuffleKanjiList() {
    let i = this.kanjiList.length;
    while (i > 1) {
      i-=1;
      const j = Math.floor(Math.random() * i);
      [this.kanjiList[i], this.kanjiList[j]] = [
        this.kanjiList[j],
        this.kanjiList[i],
      ];
    }
  }

  updateKanji() {
    const answerY = Math.floor(Math.random() * this.sizeY);
    const answerX = Math.floor(Math.random() * this.sizeX);
    const i = this.kanjiIndex;

    // 正解/不正解SE
    const correct = this.sound.add("correct_se");
    const but = this.sound.add("but_se");

    for (let y = 0; y < this.sizeY; y+=1) {
      for (let x = 0; x < this.sizeX; x+=1) {
        this.kanjiComponents[y][x].off("pointerdown");

        if (y === answerY && x === answerX) {
          this.kanjiComponents[y][x].setText(this.kanjiList[i][1]);
          this.kanjiComponents[y][x].once("pointerdown", () => {
            correct.play();

            this.answerCounter+=1;
            this.answerComponent.setText(`正解数:${this.answerCounter}問`);
            this.check();
            this.updateKanji();
          });
        } else {
          this.kanjiComponents[y][x].setText(this.kanjiList[i][0]);
          this.kanjiComponents[y][x].once("pointerdown", () => {
            but.play();
            this.wrongFlag = true;
            this.check();
            this.updateKanji();
          });
        }
      }
    }

    this.kanjiIndex = (this.kanjiIndex + 1) % this.kanjiList.length;
  }
}
