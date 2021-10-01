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
    let soundStatus = 1;
    soundIcon.depth = 4;
    soundIcon.setInteractive();

    // 音楽
    const fx = this.sound.add("top_bgm");
    fx.allowMultiple = false;
    fx.play();

    soundIcon.on(
      "pointerdown",
      () => {
        if (soundStatus === 0) {
          fx.play();
          soundStatus = 1;
        } else if (soundStatus === 1) {
          fx.stop();
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
      .strokePath().depth = 1;

    const fndDiffText = this.add.text(70, 130, "羊の中に犬が一匹", {
      fontSize: "32px",
      fill: "#333333",
    });

    fndDiffText
      .setInteractive()
      .setPadding(4)
      .on(
        "pointerdown",
        () => {
          fx.stop();
          this.scene.start("game_setting");
        },
        this);
    
    fndDiffText.depth = 2;
        
    // 作成中にする

      // 多言語
      const mnyLngButton = this.add.graphics();
      mnyLngButton
        .lineStyle(5, 0x645246)
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(30, 230, 350, 90, 45)
        .strokePath();
      mnyLngButton.depth = 1;
   
      const mnyLngText = this.add
        .text(150, 260, "作成中", {
          fontSize: "32px",
          fill: "#ffffff",
        })
        .setPadding(4);
      mnyLngText.depth = 2;

      // 神経衰弱
      const memoryGmButton = this.add.graphics();
      memoryGmButton
        .lineStyle(5, 0x645246)
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(30, 360, 350, 90, 45)
        .strokePath();
      memoryGmButton.depth = 1;

      const memoryText = this.add
        .text(150, 390, "作成中", {
          fontSize: "32px",
          fill: "#ffffff",
        })
        .setPadding(4);
      memoryText.depth = 2;

      // 仲間で集まれ
      const tgtherFriendButton = this.add.graphics();
      tgtherFriendButton
          .lineStyle(5, 0x645246)
          .fillStyle(0x32b65e, 1)
          .fillRoundedRect(30, 490, 350, 90, 45)
          .strokePath();
      tgtherFriendButton.depth = 1;
  
      const tgtherText = this.add
        .text(150, 520, "作成中", {
            fontSize: "32px",
            fill: "#ffffff",
        })
        .setPadding(4)
      
      tgtherText.depth = 2;
  }
}
