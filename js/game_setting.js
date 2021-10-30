import SettingButton from "./setting_button.js";

export default class GameSetting extends Phaser.Scene {
  constructor() {
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

    // bgm
    this.load.audio("top_bgm", "../audio/top.mp3");
  }

  init() {
    this.size = "多い";
    this.mode = "制限時間";
    this.schoolYear = "1年生";
    this.selectedSettingCategory = "漢字の数";
    this.sizeButtons = [];
    this.modeButtons = [];
    this.schoolYearButtons = [];
    this.settingGroup = {};
    this.settingSelectinButtons = [];
  }

  create() {
    // 音楽・音声アイコン枠描画
    const soundCircle = this.add.graphics();
    soundCircle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);

    // 音声アイコン
    let soundStatus = 1;
    const soundIcon = this.add.sprite(70, 700, "sound");
    soundIcon.setInteractive().depth = 1;

    // 音楽
    const gameBgm = this.sound.add("top_bgm");
    gameBgm.allowMultiple = false;
    gameBgm.play();

    soundIcon.on(
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

    // --- ボタン---

    // --- ✖ボタン・イベント ---
    const crossButton = this.add.text(967, 36, "✖", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    crossButton.setInteractive().on(
      "pointerdown",
      () => {
        gameBgm.stop();
        this.scene.start("game_menu");
      },
      this
    ).depth = 1;

    // タイトル
    this.add
      .text(330, 64, "羊の中に犬が一匹", {
        fontSize: 48,
        padding: 3,
      })
      .setPadding(4);

    // ゲームメニュー
    const gameMenuBox = this.add.graphics();
    gameMenuBox.fillStyle(0x333333, 1).fillRect(120, 154, 787, 446);

    const gameMenuLine = this.add.graphics();
    gameMenuLine.fillStyle(0x535353, 1).fillRect(396, 154, 2, 446);

    // ゲームサイズ
    const gameSizeButton = this.add.text(210, 236, "漢字の数", {
      fontSize: 32,
      padding: 3,
    }).setData("value", "size");

    // プレイモード
    const playModeButton = this.add.text(162, 350, "ゲームモード", {
      fontSize: 32,
      padding: 3,
    }).setData("value", "mode");

    playModeButton
      .setInteractive()
      .setPadding(4)
      .on("pointerdown", () => {
        playModeButton.setStyle({
          color: "#00bfff",
        });
      });

    // 出てくる漢字
    const kanjiButton = this.add.text(163, 463, "出てくる漢字", {
      fontSize: 32,
      padding: 3,
    }).setData("value", "schoolYear");
    kanjiButton
      .setInteractive()
      .setPadding(4)
      .on("pointerdown", () => {
        kanjiButton.setStyle({
          color: "#00bfff",
        });
      });

    this.sizeButtons = [
      new SettingButton(this, 585, 224, 134, 56, "少ない", 24).setData("category", "size"),
      new SettingButton(this, 585, 338, 134, 56, "ふつう", 24).setData("category", "size"),
      new SettingButton(this, 585, 451, 134, 56, "多い", 24).setData("category", "size")
    ];

    this.modeButtons = [
      new SettingButton(this, 585, 224, 160, 56, "時間制限", 24),
      new SettingButton(this, 551, 338, 229, 56, "タイムアタック", 24),
      new SettingButton(this, 573, 452, 184, 56, "サドンデス", 24),
    ];
    this.modeButtons.forEach((e) => e.setData("category", "mode"));

    this.schoolYearButtons = [
      new SettingButton(this, 430, 236, 134, 56, "1年生", 24),
      new SettingButton(this, 584, 236, 134, 56, "2年生", 24),
      new SettingButton(this, 738, 236, 134, 56, "3年生", 24),
      new SettingButton(this, 430, 350, 134, 56, "4年生", 24),
      new SettingButton(this, 584, 350, 134, 56, "5年生", 24),
      new SettingButton(this, 736, 350, 134, 56, "6年生", 24),
    ];
    this.schoolYearButtons.forEach((e) => e.setData("category", "schoolYear"));
  }
  // updateView() {

  // }
}
