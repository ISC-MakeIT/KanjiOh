export default class Game_menu extends Phaser.Scene {
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
    const cloud_1 = this.add.image(100, 100, "cloud");
    cloud_1.depth = 1;

    const cloud_2 = this.add.image(600, 150, "cloud");
    cloud_2.depth = 1;

    const cloud_3 = this.add.image(900, 120, "cloud");
    cloud_3.depth = 1;

    // 木
    this.depth = 0;
    const tree = this.add.image(900, 470, "tree");
    tree.depth = 1;

    // 地面
    const bg_image = this.add.image(510, 682, "bg");
    bg_image.depth = bg_image.y;
    bg_image.depth = 2;

    // もぐら(仮)
    const mogura = this.add.image(750, 530, "top_mogura");
    mogura.depth = 1;

    // 背景描画
    const bg_game_menu = this.add.graphics();
    bg_game_menu.fillStyle(0xebfdff, 1).fillRect(0, 0, 1024, 768);

    // 音声アイコン枠描画
    const sound_circle = this.add.graphics();
    sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
    sound_circle.depth = 3;

    // 音声アイコン

    const sound_icon = this.add.sprite(70, 700, "sound");
    let sound_status = 1;
    sound_icon.depth = 4;
    sound_icon.setInteractive();

    // 音楽
    const fx = this.sound.add("top_bgm");
    fx.allowMultiple = false;
    fx.play();
    // console.log(sound_status);

    sound_icon.on(
      "pointerdown",
      () => {
        if (sound_status === 0) {
          fx.play();
          sound_status = 1;
          // console.log(sound_status);
        } else if (sound_status === 1) {
          fx.stop();
          sound_status = 0;
          // console.log(sound_status);
        }
      },
      this
    );

    // ゲームメニューボタン

    // 羊の中に～ボタン/テキスト
    const fnd_diff_btn = this.add.graphics();

    fnd_diff_btn
      .lineStyle(5, 0x645246)
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(30, 100, 350, 90, 45)
      .strokePath().depth = 1;

    const fnd_diff_text = this.add.text(70, 130, "羊の中に犬が一匹", {
      fontSize: "32px",
      fill: "#333333",
    });

    fnd_diff_text
      .setInteractive()
      .setPadding(4)
      .on(
        "pointerdown",
        () => {
          fx.stop();
          this.scene.start("game_setting");
        },
        this
      );
    fnd_diff_text.depth = 2;

    // 多言語文字ボタン/テキスト
    const mny_lng_btn = this.add.graphics();
    mny_lng_btn
      .lineStyle(5, 0x645246)
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(30, 230, 350, 90, 45)
      .strokePath().depth = 1;

    let mny_lng_text = this.add.text(120, 260, "多言語文字", {
      fontSize: "32px",
      fill: "#333333",
    });

    mny_lng_text.setPadding(4).depth = 2;

    // 神経衰弱ボタン/テキスト
    const memory_gm_btn = this.add.graphics();
    memory_gm_btn
      .lineStyle(5, 0x645246)
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(30, 360, 350, 90, 45)
      .strokePath();
    memory_gm_btn.depth = 1;

    let memory_text = this.add.text(140, 390, "神経衰弱", {
      fontSize: "32px",
      fill: "#333333",
    });

    memory_text.setPadding(4).depth = 2;

    // 仲間で集まれボタン/テキスト
    const tgther_frnd_btn = this.add.graphics();
    tgther_frnd_btn
      .lineStyle(5, 0x645246)
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(30, 490, 350, 90, 45)
      .strokePath();
    tgther_frnd_btn.depth = 1;

    // 仲間で集まれ～テキスト
    let tgther_text = this.add.text(100, 520, "仲間で集まれ", {
      fontSize: "32px",
      fill: "#333333",
    });

    tgther_text.setPadding(4).depth = 2;

    setTimeout(() => {
      // 作成中に変更

      // 多言語
      mny_lng_btn
        .lineStyle(5, 0x645246)
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(30, 230, 350, 90, 45)
        .strokePath();
      // mny_lng_btn.depth = 1;

      mny_lng_text.destroy();
      mny_lng_text = this.add
        .text(150, 260, "作成中", {
          fontSize: "32px",
          fill: "#ffffff",
        })
        .setPadding(4);
      mny_lng_text.depth = 2;

      // 真剣衰弱
      memory_gm_btn
        .lineStyle(5, 0x645246)
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(30, 360, 350, 90, 45)
        .strokePath();

      // memory_gm_btn.depth = 1;

      memory_text.destroy();
      memory_text = this.add
        .text(150, 390, "作成中", {
          fontSize: "32px",
          fill: "#ffffff",
        })
        .setPadding(4);
      memory_text.depth = 2;

      // 仲間で集まれ
      tgther_frnd_btn
        .lineStyle(5, 0x645246)
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(30, 490, 350, 90, 45)
        .strokePath();

      // tgther_frnd_btn.depth = 1;

      tgther_text.destroy();
      tgther_text = this.add
        .text(150, 520, "作成中", {
          fontSize: "32px",
          fill: "#ffffff",
        })
        .setPadding(4);
      tgther_text.depth = 2;
    }, 3000);
  }

  update() {}
}
