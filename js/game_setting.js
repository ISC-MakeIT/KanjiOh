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

  create() {

  // 音楽・音声アイコン枠描画
  const soundCircle = this.add.graphics();
  soundCircle
    .fillStyle(0x333333, 1)
    .fillCircle(70, 700, 40).depth = 0;

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
      },this
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
    gameMenuBox
      .fillStyle(0x333333, 1)
      .fillRect(120, 154, 787, 446)
      .depth = 1;
    
    const gameMenuLine = this.add.graphics();
    gameMenuLine
      .fillStyle(0x535353, 1)
      .fillRect(396, 154, 2, 446)
      .depth = 2;

  // ゲームサイズ
  const gameSizeButton = this.add
    .text(210, 236, "漢字の数", {
      fontSize: 32,
      padding: 3,
    })

  // プレイモード
  const playModeButton = this.add
    .text(162, 350, "ゲームモード", {
      fontSize: 32,
      padding: 3,
    })

  playModeButton
    .setInteractive()
    .setPadding(4)
    .on('pointerdown',()=>{
      playModeButton.setStyle({
        color: "#00bfff"
      });
    })
    .depth = 2;

// 出てくる漢字
  const kanjiButton = this.add
    .text(163, 463, "出てくる漢字", {
      fontSize: 32,
      padding: 3,
    })
  kanjiButton
    .setInteractive()
    .setPadding(4)
    .on('pointerdown',()=>{
      kanjiButton.setStyle({
        color: "#00bfff"
      });
    })
    .depth = 2;

// 2x4(easy)ボタン
  const easyButton = this.add.graphics();
  easyButton 
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(585, 224, 134, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(585, 224, 134, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
    
    this.sizeButtons["2x4"] = this.add.text(615, 240, "少ない");
    const easyButtonText = this.sizeButtons["2x4"];
    easyButtonText
      .setStyle({
        fontSize: 24,
        color: "#333333"
      })
      .setPadding(4)
      .depth = 3;
    
    easyButton
      .on("pointerdown", () => {
        easyButton
          .fillStyle(0x32b65e, 1)
          .fillRoundedRect(585, 224, 134, 56, 30);
          this.size = "2x4"
        easyButtonText
          .setStyle({
            color: "#ffffff"
          });
      })

  // (4x8)ふつうボタン
    const nomalButton = this.add.graphics();
    nomalButton 
      .lineStyle(4, 0x645246)
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(585, 338, 134, 56, 30)
      .setInteractive(
        new Phaser.Geom.Rectangle(585, 338, 134, 56),
        Phaser.Geom.Rectangle.Contains
      )
      .strokePath()
      .depth = 2;


    this.sizeButtons["3x6"] = this.add.text(615, 355, "ふつう");
    const nomalButtonText = this.sizeButtons["3x6"];
    nomalButtonText
      .setStyle({
        fontSize: 24,
        color: "#333333"
      })
      .setPadding(4)
      .depth = 3;
    
    nomalButton
      .on("pointerdown", () => {
        nomalButton
          .fillStyle(0x32b65e, 1)
          .fillRoundedRect(585, 338, 134, 56, 30);
          this.size = "3x6"
        nomalButtonText
          .setStyle({
            color: "#ffffff"
          });
      })

  // (むずかしい)4x8ボタン
    const hardButton = this.add.graphics();
    hardButton 
      .lineStyle(4, 0x645246)
      .fillStyle(0xffffff, 1)
      .fillRoundedRect(585, 451, 134, 56, 30)
      .setInteractive(
        new Phaser.Geom.Rectangle(585, 451, 134, 56),
        Phaser.Geom.Rectangle.Contains
      )
      .strokePath()
      .depth = 2;
    
    this.sizeButtons["4x8"] = this.add.text(625, 467, "多い");
    const hardButtonText = this.sizeButtons["4x8"];
    hardButtonText
      .setStyle({
        fontSize: 24,
        color: "#333333"
      })
      .setPadding(4)
      .depth = 3;
    
    hardButton
      .on("pointerdown", () => {
        hardButton
          .fillStyle(0x32b65e, 1)
          .fillRoundedRect(585, 451, 134, 56, 30);
          this.size = "4x8"
        hardButtonText
          .setStyle({
            color: "#ffffff"
          });
      })

  const gamesizeGroup = this.add.group();  

  // ゲームサイズグループ
  
  gamesizeGroup
    .addMultiple([
      easyButton,easyButtonText,
      nomalButton,nomalButtonText,
      hardButton,hardButtonText
    ])
    .toggleVisible(true);

  gameSizeButton
    .setInteractive()
    .setPadding(4)
    .on('pointerdown',()=>{
      // if(gamemodeGroup.toggleVisible(false) || kanjiButton.toggleVisible(false))
      // playModeButton.toggleVisible(true);
      // kanjiButton.toggleVisible(true);

      gameSizeButton
        .setStyle({
          color: "#00bfff"
        })
      gamesizeGroup.toggleVisible(false);
    })
    .depth = 2;

  // 時間制限
  const timeLimitButton = this.add.graphics();
  timeLimitButton 
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(585, 224, 160, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(585, 224, 160, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
    
  this.modeButtons.timeLimit = this.add.text(615, 238, "時間制限");
  const timeLimitButtonText = this.modeButtons.timeLimit
  timeLimitButtonText
    .setStyle({
      fontSize: 24,
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  timeLimitButton
    .on("pointerdown", () => {
      timeLimitButton
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(585, 224, 160, 56, 30);
        this.mode = "timeLimit"
      timeLimitButtonText
        .setStyle({
          color: "#ffffff",
        });
    })

  // タイムアタック  
  const timeAttackButton = this.add.graphics();
  timeAttackButton 
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(551, 338, 229, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(551, 338, 229, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
    

  this.modeButtons.timeAttack = this.add.text(583, 350, "タイムアタック");
  const timeAttackButtonText = this.modeButtons.timeAttack
  timeAttackButtonText
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  timeAttackButton
    .on("pointerdown", () => {
      timeAttackButton
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(551, 338, 229, 56, 30);
        this.mode = "timeAttack"
      timeAttackButtonText
        .setStyle({
          color: "#ffffff",
        });
    })


  // サドンデス  
  const suddenDeathButton = this.add.graphics();
  suddenDeathButton
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(573, 452, 184, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(573, 452, 184, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;

  this.modeButtons.suddenDeath = this.add.text(600, 465, "サドンデス");
  const suddenDeathButtonText = this.modeButtons.suddenDeath
  suddenDeathButtonText
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  suddenDeathButton
    .on("pointerdown", () => {
      suddenDeathButton
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(573, 452, 184, 56, 30);
        this.mode = "suddenDeath"
      suddenDeathButtonText
        .setStyle({
          color: "#ffffff",
        });
    })

    // ゲームモードグループ
    const gamemodeGroup = this.add.group();
    gamemodeGroup
      .addMultiple([
        timeLimitButton,timeLimitButtonText,
        timeAttackButton,timeAttackButtonText,
        suddenDeathButton,suddenDeathButtonText
      ])
      .toggleVisible(true);

    playModeButton
      .setInteractive()
      .setPadding(4)
      .on('pointerdown',()=>{
        playModeButton
          .setStyle({
            color: "#00bfff"
          })
        gamemodeGroup.toggleVisible(false);
      })

// ----------------------------------------------------------------------------
  // １年生 
  const schoolYearButton1 = this.add.graphics();
  schoolYearButton1
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(430, 236, 134, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(430, 236, 134, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
    
  this.schoolYearButtons["1年生"] = this.add.text(460, 248, "1年生");
  const schoolYearButton1Text = this.schoolYearButtons["1年生"]
  schoolYearButton1Text
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  schoolYearButton1
    .on("pointerdown", () => {
      schoolYearButton1
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(430, 236, 134, 56, 30);
        this.schoolYear = "1年生"
      schoolYearButton1Text
        .setStyle({
          color: "#ffffff",
        });
    })

// ----------------------------------------------------------------------------
  // 2年生 
  const schoolYearButton2 = this.add.graphics();
  schoolYearButton2
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(584, 236, 134, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(584, 236, 134, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
    
  this.schoolYearButtons["2年生"] = this.add.text(620, 248, "2年生");
  const schoolYearButton2Text = this.schoolYearButtons["2年生"]
  schoolYearButton2Text
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  schoolYearButton2
    .on("pointerdown", () => {
      schoolYearButton2
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(584, 236, 134, 56, 30);
        this.schoolYear = "2年生"
      schoolYearButton2Text
        .setStyle({
          color: "#ffffff",
        });
    })
// ----------------------------------------------------------------------------
  // 3年生 
  const schoolYearButton3 = this.add.graphics();
  schoolYearButton3
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(738, 236, 134, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(738, 236, 134, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
    
  this.schoolYearButtons["3年生"] = this.add.text(774, 248, "3年生");
  const schoolYearButton3Text = this.schoolYearButtons["3年生"]
  schoolYearButton3Text
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  schoolYearButton3
    .on("pointerdown", () => {
      schoolYearButton3
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(738, 236, 134, 56, 30);
        this.schoolYear = "3年生"
      schoolYearButton3Text
        .setStyle({
          color: "#ffffff",
        });
    })
// ----------------------------------------------------------------------------
  // 4年生 
  const schoolYearButton4 = this.add.graphics();
  schoolYearButton4
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(430, 350, 134, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(430, 350, 134, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
  
  this.schoolYearButtons["4年生"] = this.add.text(460, 363, "4年生");
  const schoolYearButton4Text = this.schoolYearButtons["4年生"]
  schoolYearButton4Text
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  schoolYearButton4
    .on("pointerdown", () => {
      schoolYearButton4
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(430, 350, 134, 56, 30);
        this.schoolYear = "4年生"
      schoolYearButton4Text
        .setStyle({
          color: "#ffffff",
        });
    })
  // ----------------------------------------------------------------------------
  // 5年生 
  const schoolYearButton5 = this.add.graphics();
  schoolYearButton5
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(584, 350, 134, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(584, 350, 134, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
  
  this.schoolYearButtons["5年生"] = this.add.text(620, 363, "5年生");
  const schoolYearButton5Text = this.schoolYearButtons["5年生"]
  schoolYearButton5Text
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  schoolYearButton5
    .on("pointerdown", () => {
      schoolYearButton5
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(584, 350, 134, 56, 30);
        this.schoolYear = "5年生"
      schoolYearButton5Text
        .setStyle({
          color: "#ffffff",
        });
    })
// ----------------------------------------------------------------------------
 // 6年生 
  const schoolYearButton6 = this.add.graphics();
  schoolYearButton6
    .lineStyle(4, 0x645246)
    .fillStyle(0xffffff, 1)
    .fillRoundedRect(738, 350, 134, 56, 30)
    .setInteractive(
      new Phaser.Geom.Rectangle(738, 350, 134, 56),
      Phaser.Geom.Rectangle.Contains
    )
    .strokePath()
    .depth = 2;
  
  this.schoolYearButtons["6年生"] = this.add.text(774, 363, "6年生");
  const schoolYearButton6Text = this.schoolYearButtons["6年生"]
  schoolYearButton6Text
    .setStyle({
      fontSize: 24,
      fontFamily: "Arial",
      color: "#333333"
    })
    .setPadding(4)
    .depth = 3;

  schoolYearButton6
    .on("pointerdown", () => {
      schoolYearButton6
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(738, 350, 134, 56, 30);
        this.schoolYear = "6年生"
      schoolYearButton6Text
        .setStyle({
          color: "#ffffff",
        });
    })

    // 出てくる漢字グループ
    const kanjiGroup = this.add.group();
    kanjiGroup
      .addMultiple([
        schoolYearButton1,schoolYearButton1Text,
        schoolYearButton2,schoolYearButton2Text,
        schoolYearButton3,schoolYearButton3Text,
        schoolYearButton4,schoolYearButton5Text,
        schoolYearButton5,schoolYearButton5Text,
        schoolYearButton6,schoolYearButton6Text,
      ])
      .toggleVisible(true);

    kanjiButton
      .setInteractive()
      .setPadding(4)
      .on('pointerdown',()=>{
        kanjiButton
          .setStyle({
            color: "#00bfff"
          })
        kanjiGroup.toggleVisible(false);
      })

  // ゲームスタートボタン・テキスト
    const startButton = this.add.graphics();
    startButton
      .lineStyle(5, 0x645246)
      .fillStyle(0x32b65e, 1)
      .fillRoundedRect(340, 642, 368, 80, 40)
      .strokePath().depth = 0;

    const gameStartText = this.add.text(417, 666, "ゲームスタート", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    gameStartText
      .setPadding(4)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          gameBgm.stop();
          this.scene.start("hitsuji_game", {
            size: this.size,
            mode: this.mode,
            schoolYear: this.schoolYear,
          });
        },
        this
      ).depth = 1;

  // 遊び方ボタン  
    const howToPlayButton = this.add.graphics();
    howToPlayButton
      .lineStyle(1.5, 0xffffff)
      .fillStyle(0x000000, 1)
      .fillRoundedRect(787, 645, 189, 75, 35)
      .setInteractive(
        new Phaser.Geom.Rectangle(787, 645, 189, 75),
        Phaser.Geom.Rectangle.Contains
      )
      .strokePath().depth = 2;
    
    const howToPlay = this.add.text(830, 665, "遊び方", {
      fontSize: "32px",
      fill: "#ffffff",
    });

    howToPlay
      .setInteractive()
      .setPadding(4)
      .on(
      "pointerdown",
      () => {
        this.gameBgm.stop();
        this.scene.start("how_to_play");
      },
      this
    ).depth = 3;
  }

  
}
