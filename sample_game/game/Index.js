export default class Index extends Phaser.Scene {

    constructor() {
      super({key: "index",active: false});
    }
  
    preload(){

      // メニュー画面に出てくる画像のロード
      
      // 音声アイコン
      this.load.image('sound', '../img/sound.png');

      //  背景
      this.load.image('bg', '../img/bg.png');
      
      //  雲
      this.load.image('cloud', '../img/game_cloud.png');

      // もぐら
      // this.load.image('top_mogura', '../img/mogura.png');

      // ねそべりもぐら
      // this.load.image('goron_mogura', '../img/lay.png');

      // 吹き出し
      this.load.image('speach', '../img/speach.png');

      // 木
      this.load.image('tree', '../img/tree.png');

      // bgm
      this.load.audio('top_bgm', '../audio/top.mp3');

    };

    create() {

     
        
       // 実行
       this.cameras.main.fadeIn(3000);
       
  
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
        // const mogura = this.add.image(750, 480, 'top_mogura');
        // mogura.depth = 1;
        
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
        sound_icon.depth = 4;
        
        let bgm = this.sound.add('top_bgm');
        // bgm.setLoop(loop)
        bgm.play();

        // let sound_cnt = 1;
        // click(sound_cnt){
        //   if (sound_cnt == 1){
        //     bgm.pause();
        //     sound_cnt = 0;
        //   } else{
        //     bgm.resume();
        //     sound_cnt = 1;    
        //   }
        // }
      
        

        
        // -------------------------------------------------------------

        // -------------------------------------------------------------
        // ゲームボタン描画

        // 羊の中に～ボタン
        let fnd_diff_btn = this.add.graphics();
        fnd_diff_btn.lineStyle(5, 0x645246);
        fnd_diff_btn.fillStyle(0xffffff, 1);
        fnd_diff_btn.fillRect(30, 100, 350, 90, 45);
        fnd_diff_btn.strokeRect(30, 100, 350, 90, 45);
        fnd_diff_btn.depth = 1;
        fnd_diff_btn.setInteractive();

        // 羊の中に～テキスト
        let fnd_diff_text = this.add.text(70,130, "羊の中に犬が一匹", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        fnd_diff_text.depth = 2

        fnd_diff_text.on('pointerdown',()=>{
          this.scene.start('hitsuji-setting');
        },this);
      

        // 多言語文字ボタン
        let mny_lng_btn = this.add.graphics();
        mny_lng_btn.lineStyle(5, 0x645246);
        mny_lng_btn.fillStyle(0xffffff, 1);
        mny_lng_btn.fillRect(30, 230, 350, 90, 45);
        mny_lng_btn.strokeRect(30, 230, 350, 90, 45);
        mny_lng_btn.depth = 1;

        // 多言語文字～テキスト
        let mny_lng_text = this.add.text(120,260, "多言語文字", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        mny_lng_text.depth = 2

        // 神経衰弱ボタン
        let memory_gm_btn = this.add.graphics();
        memory_gm_btn.lineStyle(5, 0x645246);
        memory_gm_btn.fillStyle(0xffffff, 1);
        memory_gm_btn.fillRect(30, 360, 350, 90, 45);
        memory_gm_btn.strokeRect(30, 360, 350, 90, 45);
        memory_gm_btn.depth = 1;

        // 神経衰弱テキスト
        let memory_text = this.add.text(140,390, "神経衰弱", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        memory_text.depth = 2

        // 仲間で集まれボタン
        let tgther_frnd_btn = this.add.graphics();
        tgther_frnd_btn.lineStyle(5, 0x645246);
        tgther_frnd_btn.fillStyle(0xffffff, 1);
        tgther_frnd_btn.fillRect(30, 490, 350, 90, 45);
        tgther_frnd_btn.strokeRect(30, 490, 350, 90, 45);
        tgther_frnd_btn.depth = 1;

        // 仲間で集まれ～テキスト
        let tgther_text = this.add.text(100,520, "仲間で集まれ", { fontSize: '32px', fill: '#333333'}).setInteractive().setPadding(4);;
        tgther_text.depth = 2

       

        // game.createbubble(500,260,300,60);

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
    // ★----------------------------------

    setTimeout(() => {
      // 多言語文字ボタン
      let not_create_btn = this.add.graphics();

      not_create_btn.lineStyle(5, 0x645246);
      not_create_btn.fillStyle(0x32b65e, 1);
      not_create_btn.fillRect(30, 230, 350, 90, 45);
      not_create_btn.strokeRect(30, 230, 350, 90, 45);
      not_create_btn.depth = 5;

      // let lay_mogura = this.add.image(120,260,'goron_mogura');
      // lay_mogura.depth = 7;

      // 多言語文字～テキスト
      let not_create_text = this.add.text(160,260, "作成中", { fontSize: '32px', fill: '#ffffff'}).setInteractive().setPadding(4);;
      not_create_text.depth = 6;

      // 神経衰弱ボタン
      not_create_btn.lineStyle(5, 0x645246);
      not_create_btn.fillStyle(0x32b65e, 1);
      not_create_btn.fillRect(30, 360, 350, 90, 45);
      not_create_btn.strokeRect(30, 360, 350, 90, 45);

      // 神経衰弱テキスト
      not_create_text = this.add.text(160,390, "作成中", { fontSize: '32px', fill: '#ffffff'}).setInteractive().setPadding(4);;
      not_create_text.depth = 6

      // 仲間で集まれボタン

      not_create_btn.lineStyle(5, 0x645246);
      not_create_btn.fillStyle(0x32b65e, 1);
      not_create_btn.fillRect(30, 490, 350, 90, 45);
      not_create_btn.strokeRect(30, 490, 350, 90, 45);

     
      // 仲間で集まれ～テキスト
      not_create_text = this.add.text(160,520, "作成中", { fontSize: '32px', fill: '#ffffff'}).setInteractive().setPadding(4);;
      not_create_text.depth = 6
    }, 4000)



  }
}