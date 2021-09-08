class Top extends Phaser.Scene {
       
  constructor(){
    //自動実行をonに
    super({ key: 'Top', active: true });
  };

  preload(){};
  
  create(){
    // 画面サイズ取得
    const { width, height } = this.game.canvas;
    
    // 画面幅取得
    const zone = this.add.zone(width/2, height/2, width, height);

    // Zoneをクリックできるように設定
    zone.setInteractive({
      useHandCursor: false  // マウスオーバーでカーソルが指マークになる
    });
    
    // 画面どこかクリックしたらトップに遷移
    zone.on('pointerdown', () => {
      this.scene.start("ScreenChoice");
    });
  };
}
      // -------------------------------------------------------------

      // 最初のウインドウ画面

class ScreenChoice extends Phaser.Scene {
     
     constructor() {
       //自動実行をオフに
       super({ key: 'ScreenChoice', active: true });
     };
 
     preload(){
       this.load.image('sound', '../img/sound.png');
     };
     
     create(){
 
     // 音声アイコン枠描画
     let sound_circle = this.add.graphics();
     sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
     this.depth = sound_circle.y;
 
     // 音声アイコン
     let soud_icon = this.add.image(70,700,'sound');
 
     // 外枠ウインドウ描画
     let graphics = this.add.graphics();
     graphics.fillStyle(0xFFFFFF, 1).fillRoundedRect(352, 302, 320,160, 5, 5);
     graphics.depth = graphics.y;
     
     // ✖ボタン
     let cross_button = this.add.text(652,310, "✖", { fontSize: '16px', fill: '#707070'}).setInteractive();
     cross_button.depth = cross_button.y;
 
     // ✖ボタンイベント
     cross_button.on('pointerdown',()=>{
       this.scene.start('SceneTop');
     },this);
     
     // フルスクリーンテキスト
     let screen_text = this.add.text(388,328, "フルスクリーン表示しますか？", { fontSize: '18px',fontFamily: 'nomal', fill: '#3c3c3c'}).setPadding(4);
     screen_text.depth = screen_text.y;
 
     // いいえボタン枠描画
     let cancel_graphics = this.add.graphics();
     cancel_graphics.fillStyle(0x707070, 1).fillRoundedRect(373, 363, 137, 40, 5);
     cancel_graphics.depth = cancel_graphics.y;
     
 
     // ★-----------------------------------------------------★
     // 枠組み押したときのシーン切り替えは保留
     // cancel_graphics.inputEnabled = true;
     // cancel_graphics.input.useHandCursor = false;
     // cancel_graphics.events.onInputDown.add(changeScean, this);
     // ★-----------------------------------------------------★
    
 
     // はいボタン枠描画
     let dicision_graphics = this.add.graphics();
     dicision_graphics.fillStyle(0x32b65e, 1).fillRoundedRect(515, 363, 137, 40, 5).setInteractive();
     dicision_graphics.depth = dicision_graphics.y;
 
     // 「いいえ」テキスト
     let cancel_text = this.add.text(422,375, "いいえ", { fontSize: '16px', fill: '#ffffff'}).setInteractive();
     cancel_text.on('pointerdown',()=>{
       this.scene.start('Top');
     },this);
     cancel_text.depth = cancel_text.y;
 
     // 「はい」テキスト
     let decision_text = this.add.text(571,375, "はい", { fontSize: '16px', fill: '#ffffff'}).setInteractive();
     decision_text.depth = decision_text.y;
     
     // 「はい」ボタンクリックイベント 
     decision_text.on('pointerdown',()=>{
       decision_text.removeInteractive();
       this.cameras.main.fadeOut(500);
 
       // クリックイベントはfunctionいらない
       this.cameras.main.once('camerafadeoutcomplete', ()=> {
         this.scene.start('Start');
       });
     },this);
     
 
     // ※注意テキスト
     let alert_text = this.add.text(388,421, "※フルスクリーン表示にしないとゲームが開始されません", { fontSize: '10px', fill: '#3c3c3c'}).setPadding(4);
     alert_text.depth = screen_text.y;
 
     // メモ
     // コードの順番を「描画」「表示」「処理」の順で書いた方綺麗かも
 
     
   }
 }
      // -------------------------------------------------------------
      
      
    // -------------------------------------------------------------
    
    // -------------------------------------------------------------
    
    // 地球学校のロゴをfadeInOutで表示するだけのScene
    class Start extends Phaser.Scene {

      constructor() {
        
        //自動実行をオフに
        super({ key: 'Start', active: false });
      };

      preload(){

        // 音声アイコン
        this.load.image('sound', '../img/sound.png');

        // ロゴマーク
        this.load.image('logo', '../img/logo_tikyu.png');
      };

      create(){

        // 音声アイコン枠描画
        let sound_circle = this.add.graphics();
        sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
        this.depth = sound_circle.y;

        // 音声アイコン
        let soud_icon = this.add.image(70,700,'sound');
        
        // logo画像
        const logo_image = this.add.image(500, 400, 'logo');

        // fadeIn,fadeOut設定
        this.tweens.add({
            targets: logo_image,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });

        // 実行
        this.cameras.main.fadeIn(2000);

        // fadeIn終わったらfadeOut自動で実行
        this.cameras.main.once('camerafadeincomplete', function (camera) {  
          camera.fadeOut(2000);
        });    
        
        // fadeInOut終わったらScene移動
        this.cameras.main.once('camerafadeoutcomplete', ()=> {
          this.scene.start('GameMenu');
        });
        
      };
    }
      
    // -------------------------------------------------------------


    // -------------------------------------------------------------

    // ゲームメニュー
    class GameMenu extends Phaser.Scene {
      constructor() {      
        //自動実行をオフに
        super({ key: 'GameMenu', active: false });
      };

      preload(){

        // メニュー画面に出てくる画像のロード
        
        // 音声アイコン
        this.load.image('sound', '../img/sound.png');

        //  背景
        this.load.image('bg', '../img/bg.png');
        
        //  雲
        this.load.image('cloud', '../img/game_cloud.png');

        // もぐら
        this.load.image('top_mogura', '../img/mogura.png');

        // 吹き出し
        this.load.image('speach', '../img/speach.png');

        // 木
        this.load.image('tree', '../img/tree.png');

        // bgm
        this.load.audio('top_bgm', '../audio/top.mp3');

      };


      create(){

        // 白背景をfedeINしてゲームメニュー表示

        // 白背景描画
        let bg_wh_graphics = this.add.graphics();
        bg_wh_graphics.fillStyle(0xffffff, 1).fillRect(0,0,1024, 768);
    
        // fadeInOut設定
        this.tweens.add({
          targets: bg_wh_graphics,
          ease: 'Sine.easeInOut',
          yoyo: true,
          repeat: -1,
          duration: 3000
        });
        
        // 実行
        this.cameras.main.fadeIn(3000);
        
        // fadeIn終わったら自動でfadeOut
        this.cameras.main.once('camerafadeoutcomplete', function (camera) {  
          camera.fadeOut(2000);
        });
        // -------------------------------------------------------------

        // -------------------------------------------------------------
        // それぞれ画像出力
        
        
        // 雲３つ
        const cloud_1 = this.add.image(100, 100, 'cloud');
        cloud_1.depth = 1;
        
        const cloud_2 = this.add.image(600, 150, 'cloud');
        cloud_2.depth = 1;
        
        const cloud_3 = this.add.image(900, 120, 'cloud');
        cloud_3.depth = 1;  
        
        // 木
        this.depth = 0;
        const tree = this.add.image(900, 470, 'tree');
        tree.depth = 1;
        
        // モグラ
        const mogura = this.add.image(750, 480, 'top_mogura');
        mogura.depth = 1;
        
        // 地面
        const bg_image = this.add.image(510, 682, 'bg');
        bg_image.depth = bg_image.y;
        bg_image.depth = 2;
        
        // 吹き出し
        // const speach = this.add.image(600, 320, 'speach');
        // speach.depth = 1;
        
        // 背景描画
        let bg_game_menu = this.add.graphics();
        bg_game_menu.fillStyle(0xebfdff, 1).fillRect(0,0,1024, 768);
        
        // 音声アイコン枠描画
        let sound_circle = this.add.graphics();
        sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
        sound_circle.depth = 3;
        
        // 音声アイコン
        let sound_icon = this.add.image(70,700,'sound');
        sound_icon.depth = 3;
        
  

        
        // -------------------------------------------------------------

        // -------------------------------------------------------------
        // ゲームボタン描画

        // 羊の中に～ボタン
        let fnd_diff_btn = this.add.graphics();
        fnd_diff_btn.lineStyle(5, 0x645246);
        fnd_diff_btn.fillStyle(0xffffff, 1);
        fnd_diff_btn.fillRoundedRect(30, 100, 350, 90, 45);
        fnd_diff_btn.strokePath();
        fnd_diff_btn.depth = 1;
        fnd_diff_btn.setInteractive();

        // 羊の中に～テキスト
        let fnd_diff_text = this.add.text(70,130, "羊の中に犬が一匹", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        fnd_diff_text.depth = 2

        // 多言語文字ボタン
        let mny_lng_btn = this.add.graphics();
        mny_lng_btn.lineStyle(5, 0x645246);
        mny_lng_btn.fillStyle(0xffffff, 1);
        mny_lng_btn.fillRoundedRect(30, 230, 350, 90, 45);
        mny_lng_btn.strokePath();
        mny_lng_btn.depth = 1;

        // 多言語文字～テキスト
        let mny_lng_text = this.add.text(120,260, "多言語文字", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        mny_lng_text.depth = 2

        // 神経衰弱ボタン
        let memory_gm_btn = this.add.graphics();
        memory_gm_btn.lineStyle(5, 0x645246);
        memory_gm_btn.fillStyle(0xffffff, 1);
        memory_gm_btn.fillRoundedRect(30, 360, 350, 90, 45);
        memory_gm_btn.strokePath();
        memory_gm_btn.depth = 1;

        // 神経衰弱テキスト
        let memory_text = this.add.text(140,390, "神経衰弱", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        memory_text.depth = 2

        // 仲間で集まれボタン
        let tgther_frnd_btn = this.add.graphics();
        tgther_frnd_btn.lineStyle(5, 0x645246);
        tgther_frnd_btn.fillStyle(0xffffff, 1);
        tgther_frnd_btn.fillRoundedRect(30, 490, 350, 90, 45);
        tgther_frnd_btn.strokeRoundedRect(30, 490, 350, 90, 45);
        tgther_frnd_btn.depth = 1;

        // 仲間で集まれ～テキスト
        let tgther_text = this.add.text(100,520, "仲間で集まれ", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        tgther_text.depth = 2

        game.createbubble(500,260,300,60);

        // function createbubble(x,y,width,height){
  
        //   let bubbleWidth = width;
        //   let bubbleHeight = height;

        //   let speach_bable = this.add.graphics({x:x,y:y});

        //   speach_bable.lineStyle(5, 0x000000);
        //   speach_bable.fillStyle(0xffffff, 1);
        //   speach_bable.fillRoundedRect(0,0,bubbleWidth,bubbleHeight,30);
        //   // speach_bable.fillTriangle(45,160,90,160,45,200);

        //   speach_bable.strokeRoundedRect(0,0,bubbleWidth,bubbleHeight,30);
        //   speach_bable.fillTriangle(680,315,730,315,714,380);
        //   speach_bable.depth = 1;
        // };
        // 吹き出し描画
        // let speach_bable = this.add.graphics();
        // speach_bable.lineStyle(5, 0x000000);
        // speach_bable.fillStyle(0xffffff, 1);
        // speach_bable.fillRoundedRect(500, 260, 300, 60, 30);
        // speach_bable.fillTriangle(45,160,90,160,45,200);

        // speach_bable.fillTriangle(680,315,730,315,714,380);
        // speach_bable.strokePath();
        // speach_bable.depth = 1;

        // -------------------------------------------------------------

        // ★-------------------------------------------------------------★
        // ゲームボタン達をグループ化してそのグループをfadeInさせる
        
        // fadeIn,fadeOut設定
        // this.tweens.add({
        //     targets: logo_image,
        //     ease: 'Sine.easeInOut',
        //     yoyo: true,
        //     repeat: -1,
        //     duration: 3000
        // });

        // 実行
        // this.cameras.main.fadeIn(2000);

        // fadeIn終わったらfadeOut自動で実行
        // this.cameras.main.once('camerafadeincomplete', function (camera) {  
        //   camera.fadeOut(2000);
        // });    
        
        // fadeInOut終わったらScene移動
        // this.cameras.main.once('camerafadeoutcomplete', ()=> {
        //   this.scene.start('GameMenu');
        // });
        // ★-------------------------------------------------------------★

    // ★------------------------------------------------------★
    // 画像Gifやアニメーションは後から！

    // let stars = this.add.group({
      //   key: 'cloud',
      //   repeat: 1,
      //   setXY: { x: 12, y: 0, stepX: 30 }
    // });
    // // 個々でバウンド率を変える
    // stars.children.iterate = (() => {
    // //  Give each star a slightly different bounce
    // this.setBounceY(Phaser.Math.FloatBetween(0.6, 0.9));
    // });
    // ★------------------------------------------------------★

      };

      
      update(){ 
      }
      
      
    }
    // メモ：
    // 画像のdepthをそれぞれに優先順位を数値でつけたほういいかも
    // -------------------------------------------------------------

    let config = {
      type: Phaser.AUTO,
      width: 1024,
      height: 768,
      scene: [Top,ScreenChoice,Start,GameMenu]
    } 
        
      
    
    
    //ゲームオブジェクトの生成
    window.onload = () => {
      var game = new Phaser.Game(config);
    }
