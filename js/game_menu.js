export default class GameMenu extends Phaser.Scene {
  constructor() {
    super({ key: "game_menu", active: false });
  }

  preload() {
    // メニュー画面に出てくる画像のロード
    this.load.image("sound", "../img/sound.png");
    this.load.image("bg", "../img/bg.png");
    this.load.image("cloud", "../img/game_cloud.png");
    this.load.image("tree", "../img/tree.png");
    this.load.image("top_mogura", "../img/mogura.png");
    this.load.image("mogura", "../img/min_mogura.png");

    // bgm
    this.load.audio("top_bgm", "../audio/top.mp3");
  }

  create() {
    this.cameras.main.fadeIn(2000);

    // 画像表示

    // 雲３つ
    const cloud1 = this.add.image(100, 100, "cloud");
    cloud1.depth = 1;

    const cloud2 = this.add.image(600, 150, "cloud");
    cloud2.depth = 1;

    const cloud3 = this.add.image(900, 120, "cloud");
    cloud3.depth = 1;

    // 木
    const tree = this.add.image(900, 470, "tree");
    tree.depth = 1;

    // 地面
    const bgImage = this.add.image(510, 682, "bg");
    bgImage.depth = 2;

    // もぐら(仮)
    const mogura = this.add.image(750, 530, "top_mogura");
    mogura.depth = 1;

    const miniMogura1 = this.add.sprite(90, 280, "mogura");
    miniMogura1.depth = 3;

    const miniMogura2 = this.add.sprite(90, 410, "mogura");
    miniMogura2.depth = 3;

    const miniMogura3 = this.add.sprite(90, 540, "mogura");
    miniMogura3.depth = 3;

    // 背景描画
    const bgGameMenu = this.add.graphics();
    bgGameMenu.fillStyle(0xebfdff, 1).fillRect(0, 0, 1024, 768);

    // 音声アイコン枠描画
    const soundCircle = this.add.graphics();
    soundCircle
      .fillStyle(0x333333, 1)
      .fillCircle(70, 700, 40)
      .setInteractive(
        new Phaser.Geom.Circle(70, 700, 40),
        Phaser.Geom.Circle.Contains)
      .depth = 3;

    // 音声アイコン
    const soundIcon = this.add.sprite(70, 700, "sound");
    let soundStatus = 1;
    soundIcon.depth = 4;

    // 音楽
    const gameBgm = this.sound.add("top_bgm");
    gameBgm.allowMultiple = false;
    gameBgm.play();

    soundCircle.on(
      "pointerdown",
      () => {
        if (soundStatus === 0) {
          gameBgm.play();
          soundStatus = 1;
        } else if (soundStatus === 1) {
          gameBgm.stop();
          soundStatus = 0;
        }
      },
      this
    );

    // ゲームメニューボタン

    // 羊の中に～ボタン/テキスト
    const fndDiffButton = this.add.graphics();

    fndDiffButton
      .lineStyle(5, 0x645246)
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(30, 100, 350, 90, 45)
      .strokePath()
      .setInteractive(new Phaser.Geom.Rectangle(30, 100, 350, 90), Phaser.Geom.Rectangle.Contains)
      .depth = 2;

    fndDiffButton
      .on(
        "pointerdown",
        () => {
          gameBgm.stop();
          this.scene.start("game_setting");
        },
        this
        )

    const fndDiffText = this.add
      .text(70, 130, "羊の中に犬が一匹", {
        fontSize: "32px",
        fill: "#333333",
      });

    fndDiffText
      .setPadding(4)
      .depth = 3;
      
  // 作成中にする
    // 多言語
    const mnyLngButton = this.add.graphics();
    mnyLngButton
      .lineStyle(5, 0x645246)
      .fillStyle(0x32b65e, 1)
      .fillRoundedRect(30, 230, 350, 90, 45)
      .setInteractive(new Phaser.Geom.Rectangle(30, 230, 350, 90), Phaser.Geom.Rectangle.Contains)
      .strokePath()
      .depth = 2;
 
    const mnyLngText = this.add
      .text(150, 260, "作成中", {
        fontSize: "32px",
        fill: "#ffffff",
      });

    mnyLngText
      .setPadding(4)
      .depth = 3;

    // 神経衰弱
    const memoryGmButton = this.add.graphics();
    memoryGmButton
      .lineStyle(5, 0x645246)
      .fillStyle(0x32b65e, 1)
      .fillRoundedRect(30, 360, 350, 90, 45)
      .setInteractive(new Phaser.Geom.Rectangle(30, 360, 350, 90), Phaser.Geom.Rectangle.Contains)
      .strokePath()
      .depth = 2;

    const memoryText = this.add
      .text(150, 390, "作成中", {
        fontSize: "32px",
        fill: "#ffffff",
      });

    memoryText
      .setPadding(4)
      .depth = 3;

    // 仲間で集まれ
    const tgtherFriendButton = this.add.graphics();
    tgtherFriendButton
      .lineStyle(5, 0x645246)
      .fillStyle(0x32b65e, 1)
      .fillRoundedRect(30, 490, 350, 90, 45)
      .setInteractive(new Phaser.Geom.Rectangle(30, 490, 350, 90), Phaser.Geom.Rectangle.Contains)
      .strokePath()
      .depth = 2;

    const tgtherText = this.add
      .text(150, 520, "作成中", {
        fontSize: "32px",
        fill: "#ffffff",
      });

    tgtherText
      .setPadding(4)
      .depth = 3;
  }
}
