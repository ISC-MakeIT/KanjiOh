export default class HowPlay extends Phaser.Scene {
  constructor() {
    super({ key: "how_play", active: false });
  }

  preload() {
    // もぐらんボタン
    this.load.image("mogura", "../img/min_mogura.png");
    // サウンドアイコン
    this.load.image("sound", "../img/sound.png");
    // ミニゲーム中bgm
    this.load.audio("top_bgm", "../audio/top.mp3");
  }

  create() {
    // 画面描画（大）
    const bigframeGraphics = this.add.graphics();

    bigframeGraphics
      .fillStyle(0xffffff, 1)
      .fillRect(121, 37, 788, 694, 5, 5).depth = 0;

    // 画面描画（大）
    const smallframeGraphics = this.add.graphics();

    smallframeGraphics
      .fillStyle(0xeaeaea, 1)
      .fillRect(231, 82, 561, 419, 5, 5).depth = 1;

    const explainText = this.add.text(
      270,
      548,
      `ひとつだけ違う漢字を選んでね！`,
      {
        fontSize: "32px",
        fill: 0x333333,
        fontFamily: "Arial",
      }
    );

    explainText.setPadding(4).depth = 2;

    // 「わかった」ボタン
    const completeButton = this.add.graphics();
    completeButton
      .lineStyle(5, 0x645246)
      .fillStyle(0x32b65e, 1)
      .fillRoundedRect(331, 615, 368, 80, 40)
      .strokePath()
      .setInteractive(
        new Phaser.Geom.Rectangle(331, 615, 368, 80),
        Phaser.Geom.Rectangle.Contains
      ).depth = 1;

    const completeText = this.add.text(453, 635, "わかった！", {
      fontSize: "32px",
      fill: "#FFFFFF",
      fontFamily: "Arial",
    });
    completeText.depth = 2;

    completeButton.setInteractive().on(
      "pointerdown",
      () => {
        this.gameMusic.stop();
        this.scene.start("game_setting");
      },
      this
    );

    // もぐら
    const moguraIcon = this.add.sprite(385, 650, "mogura");
    moguraIcon.depth = 2;

    // 音楽
    // ゲームBGM
    this.gameMusic = this.sound.add("top_bgm");
    this.gameMusic.allowMultiple = false;
    this.gameMusic.setLoop(true);
    this.gameMusic.play();
    let soundStatus = 1;

    // 音声アイコン枠描画
    const soundCircle = this.add.graphics();
    soundCircle
      .fillStyle(0x939393, 1)
      .fillCircle(300, 460, 30)
      .setInteractive(
        new Phaser.Geom.Circle(300, 460, 30),
        Phaser.Geom.Circle.Contains
      ).depth = 3;

    // 音声アイコン
    const soundIcon = this.add.sprite(300, 460, "sound");
    soundIcon.depth = 4;

    soundCircle.on(
      "pointerdown",
      () => {
        if (soundStatus === 0) {
          this.gameMusic.play();
          soundStatus = 1;
        } else if (soundStatus === 1) {
          this.gameMusic.stop();
          soundStatus = 0;
        }
      },
      this
    );

    // 一時停止ボタン
    // ボタン描画
    const pauseButton = this.add.graphics();
    pauseButton
      .lineStyle(3, 0x333333)
      .fillStyle(0xeaeaea, 1)
      .fillRoundedRect(640, 440, 104, 35, 18)
      .strokePath()
      .setInteractive(
        new Phaser.Geom.Rectangle(640, 440, 104, 35),
        Phaser.Geom.Rectangle.Contains
      ).depth = 1;

    // 一時停止テキスト
    const pauseText = this.add.text(657, 448, "一時停止", {
      fontSize: "16px",
      fill: "#333333",
      fontFamily: "Arial",
    });
    pauseText.depth = 3;

    pauseButton.on(
      "pointerdown",
      () => {
        this.scene.start("");
      },
      this
    );
  }
}
