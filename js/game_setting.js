export default class GameSetting extends Phaser.Scene {
  constructor() {
    // super("game_setting");
    super({ key: "game_setting", active: false });
    this.size = "4x8";
    this.mode = "timeLimit";
    this.schoolYear = "1年生";

    this.sizeButtons = {};
    this.modeButtons = {};
    this.schoolYearButtons = {};
  }

  preload() {
    // メニュー画面に出てくる画像のロード
    this.load.image("sound", "../img/sound.png");
  }

  create() {
    // --- ボタン---

    // --- ✖ボタン・イベント ---
    const crossButton = this.add.text(967, 36, "✖", {
      fontSize: "24px",
      fill: "#ffffff",
    });

    crossButton.setInteractive().on(
      "pointerdown",
      () => {
        this.scene.start("game_menu");
      },
      this
    );
    crossButton.depth = 1;

    // 見出し

    // タイトル
    this.add
      .text(330, 64, "羊の中に犬が一匹", {
        fontSize: 48,
        padding: 3,
      })
      .setPadding(4);

    // サイズ
    this.add
      .text(467, 160, "サイズ", {
        fontSize: 32,
        padding: 3,
      })
      .setPadding(4);

    // プレイモード
    this.add
      .text(430, 320, "プレイモード", {
        fontSize: 32,
        padding: 3,
      })
      .setPadding(4);

    // 出てくる漢字
    this.add
      .text(430, 481, "出てくる漢字", {
        fontSize: 32,
        padding: 3,
      })
      .setPadding(4);

    // 音声アイコン枠描画
    const soundCircle = this.add.graphics();
    soundCircle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
    soundCircle.depth = 0;

    // 音声アイコン
    const soundIcon = this.add.sprite(70, 700, "sound");

    soundIcon.depth = 1;
    soundIcon.setInteractive();

    this.sizeButtons["2x4"] = this.add.text(330, 227, "2×4");

    this.sizeButtons["3x6"] = this.add.text(488, 227, "3×6");

    this.sizeButtons["4x8"] = this.add.text(639, 227, "4×8");

    Object.values(this.sizeButtons).forEach((value) => {
      value.setStyle({
        fontSize: 24,
      });
      value.setInteractive().on("pointerdown", () => {
        this.size = value.text;
        this.select();
      });
    });

    this.modeButtons.timeLimit = this.add.text(10, 400, "時間制限");
    this.modeButtons.timeAttack = this.add.text(120, 400, "タイムアタック");
    this.modeButtons.suddenDeath = this.add.text(300, 400, "サドンデス");
    Object.keys(this.modeButtons).forEach((key) => {
      const value = this.modeButtons[key];
      value.setStyle({
        fontSize: "24px",
        fontFamily: "Arial",
      });
      value.setInteractive().on("pointerdown", () => {
        this.mode = key;
        this.select();
      });
    });

    this.schoolYearButtons["1年生"] = this.add.text(10, 550, "1年生");
    this.schoolYearButtons["2年生"] = this.add.text(90, 550, "2年生");
    this.schoolYearButtons["3年生"] = this.add.text(170, 550, "3年生");
    this.schoolYearButtons["4年生"] = this.add.text(260, 550, "4年生");
    this.schoolYearButtons["5年生"] = this.add.text(350, 550, "5年生");
    this.schoolYearButtons["6年生"] = this.add.text(440, 550, "6年生");
    Object.keys(this.schoolYearButtons).forEach((key) => {
      const value = this.schoolYearButtons[key];
      value.setStyle({
        fontSize: "24px",
        fontFamily: "Arial",
      });
      value.setInteractive().on("pointerdown", () => {
        this.schoolYear = key;
        this.select();
      });
    });

    this.select();

    // 羊の中に～ボタン/テキスト
    const startButton = this.add.graphics();

    startButton
      .lineStyle(5, 0x645246)
      .fillStyle(0x32b65e, 1)
      .fillRoundedRect(360, 642, 368, 80, 40)
      .strokePath().depth = 0;

    const gameStartText = this.add.text(437, 666, "ゲームスタート", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    gameStartText
      .setPadding(4)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.scene.start("hituji_game", {
            size: this.size,
            mode: this.mode,
            schoolYear: this.schoolYear,
          });
        },
        this
      ).depth = 1;
  }

  select() {
    Object.values(this.sizeButtons).forEach((value) => {
      value.setStyle({
        color: "#fff",
      });
    });
    this.sizeButtons[this.size].setStyle({
      color: "aqua",
    });

    Object.values(this.modeButtons).forEach((value) => {
      value.setStyle({
        color: "#fff",
      });
    });
    this.modeButtons[this.mode].setStyle({
      color: "aqua",
    });

    Object.values(this.schoolYearButtons).forEach((value) => {
      value.setStyle({
        color: "#fff",
      });
    });
    this.schoolYearButtons[this.schoolYear].setStyle({
      color: "aqua",
    });
  }
}
