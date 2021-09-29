export default class GameResult extends Phaser.Scene {
  constructor() {
    super({ key: "game_result", actisve: false });
  }

  preload() {
    // メニュー画面に出てくる画像のロード

    this.load.image("sound", "../img/sound.png");
    this.load.image("bg", "../img/bg.png");
    this.load.image("cloud", "../img/game_cloud.png");
    this.load.image("tree", "../img/tree.png");
    this.load.image("top_mogura", "../img/mogura.png");
    // bgm
    this.load.audio("ending", "../audio/ending.mp3");
  }

  init(data) {
    this.timer = data.time;
    this.answers = data.answers;
  }

  create() {
    this.cameras.main.fadeIn(2000);

    // 画像表示

    // 雲３つ
    const cloud1 = this.add.image(100, 100, "cloud");
    cloud1.depth = 1;

    const cloud3 = this.add.image(900, 120, "cloud");
    cloud3.depth = 1;

    // 木
    this.depth = 0;
    const tree = this.add.image(900, 470, "tree");
    tree.depth = 1;

    // 地面
    const bgImage = this.add.image(510, 682, "bg");
    bgImage.depth = bgImage.y;
    bgImage.depth = 2;

    // もぐら(仮)
    const mogura = this.add.image(750, 530, "top_mogura");
    mogura.depth = 1;

    // 背景描画
    const bgGameMenu = this.add.graphics();
    bgGameMenu.fillStyle(0xebfdff, 1).fillRect(0, 0, 1024, 768);

    // 音声アイコン枠描画
    const soundCircle = this.add.graphics();
    soundCircle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
    soundCircle.depth = 3;

    // 音声アイコン

    const soundIcon = this.add.sprite(70, 700, "sound");
    soundIcon.depth = 4;
    soundIcon.setInteractive();

    // リザルト表示

    // bgm
    const fx = this.sound.add("ending");
    fx.allowMultiple = false;
    fx.play();

    // 正解数/タイム
    this.add
      .text(512, 100, `正解数:${this.answers}`, {
        fill: 0x333333,
        fontFamily: "Arial",
        fontSize: 50,
      })
      .setOrigin(0.5, 0);
    this.add
      .text(512, 200, `タイム:${this.timer}`, {
        fill: 0x333333,
        fontFamily: "Arial",
        fontSize: 50,
      })
      .setOrigin(0.5, 0);

    // 終了後ゲームメニュー

    // トップへ戻るボタン
    // eslint-disable-next-line no-unused-vars
    const topLinkBtn = this.add.graphics();

    const topLinkText = this.add.text(512, 200, "トップへ戻る", {
      fontSize: "32px",
      fill: "#333333",
    });

    topLinkText
      .setInteractive()
      .setPadding(4)
      .on(
        "pointerdown",
        () => {
          fx.stop();
          this.scene.start("game_menu");
        },
        this
      ).depth = 2;
  }
}
