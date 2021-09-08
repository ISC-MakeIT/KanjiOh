export default class StartScene extends Phaser.Scene {
  
  constructor() {
    super({key: "startScene",active: false});
  }

    preload(){
      this.load.image('sound', '../img/sound.png');
    };

    create(){

    // 音声アイコン枠描画
    let sound_circle = this.add.graphics();
    sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
    this.depth = sound_circle.y;

    // 音声アイコン
    let sound_icon = this.add.image(70,700,'sound');
    sound_icon.depth = 1;

    // 外枠ウインドウ描画
    let graphics = this.add.graphics();
    graphics.fillStyle(0xFFFFFF, 1).fillRect(352, 302, 320,160, 5, 10);
    graphics.depth = graphics.y;

    // ✖ボタン
    let cross_button = this.add.text(652,310, "✖", { fontSize: '16px', fill: '#707070'}).setInteractive();
    cross_button.depth = cross_button.y;

    // ✖ボタンイベント
    cross_button.on('pointerdown',()=>{
    this.scene.start('top');
    },this);

    // フルスクリーンテキスト
    let screen_text = this.add.text(388,328, "フルスクリーン表示しますか？", { fontSize: '18px',fontFamily: 'nomal', fill: '#3c3c3c'}).setPadding(4);
    screen_text.depth = screen_text.y;

    // いいえボタン枠描画
    let cancel_graphics = this.add.graphics();
    cancel_graphics.fillStyle(0x707070, 1).fillRect(373, 363, 137, 40, 5);
    cancel_graphics.depth = cancel_graphics.y;


    // ★-----------------------------------------------------★
    // 枠組み押したときのシーン切り替えは保留
    // cancel_graphics.inputEnabled = true;
    // cancel_graphics.input.useHandCursor = false;
    // cancel_graphics.events.onInputDown.add(changeScean, this);
    // ★-----------------------------------------------------★


    // はいボタン枠描画
    let dicision_graphics = this.add.graphics();
    dicision_graphics.fillStyle(0x32b65e, 1).fillRect(515, 363, 137, 40, 5).setInteractive();
    dicision_graphics.depth = dicision_graphics.y;

    // 「いいえ」テキスト
    let cancel_text = this.add.text(422,375, "いいえ", { fontSize: '16px', fill: '#ffffff'}).setInteractive();
    cancel_text.on('pointerdown',()=>{
      this.scene.start('top');
    },this);
    cancel_text.depth = cancel_text.y;

    // 「はい」テキスト
    let decision_text = this.add.text(571,375, "はい", { fontSize: '16px', fill: '#ffffff'}).setInteractive();
    decision_text.depth = decision_text.y;

    // 「はい」ボタンクリックイベント 
    decision_text.on('pointerdown',()=>{
    
    this.cameras.main.fadeOut(500);

    // クリックイベントはfunctionいらない
    this.cameras.main.once('camerafadeoutcomplete', ()=> {
      this.scene.start('startGame');
    });
    },this);

    // ※注意テキスト
    let alert_text = this.add.text(388,421, "※フルスクリーン表示にしないとゲームが開始されません", { fontSize: '10px', fill: '#3c3c3c'}).setPadding(4);
    alert_text.depth = screen_text.y;

    
  }  
}