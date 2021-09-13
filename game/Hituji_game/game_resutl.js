export default class Game_result extends Phaser.Scene {  
    constructor() {
        super({key: "game_result", active: false});
    }
    preload(){
        // メニュー画面に出てくる画像のロード
        
        this.load.image('sound', '../../img/sound.png');
        this.load.image('bg', '../../img/bg.png');
        this.load.image('cloud', '../../img/game_cloud.png');  
        this.load.image('tree', '../../img/tree.png');  
        this.load.image('top_mogura', '../../img/mogura.png');
        // bgm
        this.load.audio('top_bgm', '../../audio/top.mp3');
    };

    init(data) {
        this.timer = data.time;
        this.answers = data.answers;
    }

    create(){
        this.cameras.main.fadeIn(2000);


    //画像表示

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

        // 地面
        const bg_image = this.add.image(510, 682, 'bg');
        bg_image.depth = bg_image.y;
        bg_image.depth = 2;

        // もぐら(仮)
        const mogura = this.add.image(750, 530, 'top_mogura');
        mogura.depth = 1;

        // 背景描画
        let bg_game_menu = this.add.graphics();
        bg_game_menu.fillStyle(0xebfdff, 1).fillRect(0,0,1024, 768);
        
        // 音声アイコン枠描画
        let sound_circle = this.add.graphics();
        sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
        sound_circle.depth = 3;
   
        // 音声アイコン

        let sound_icon = this.add.sprite(70,700,'sound');
        // let sound_status = 1;
        sound_icon.depth = 4;
        sound_icon.setInteractive();


    // リザルト表示
    
        // 正解数/タイム
            this.add.text(512, 160, `正解数:${this.answers}`, {
                fontFamily: "Arial",
                fontSize: 50
            }).setOrigin(0.5, 0);
            this.add.text(512, 240, `タイム:${this.timer}`, {
                fontFamily: "Arial",
                fontSize: 50
            }).setOrigin(0.5, 0);
        



    // 終了後ゲームメニュー

        let fnd_diff_btn = this.add.graphics();
        
        fnd_diff_btn    
            .lineStyle(5, 0x645246)
            .fillStyle(0xffffff, 1)
            .fillRoundedRect(338, 184, 350, 90, 45)
            .strokePath()
            .depth = 1;

        let fnd_diff_text = this.add.text(385,130, "羊の中に犬が一匹", { 
            fontSize: '32px',
            fill: '#333333'
        })

        fnd_diff_text
            .setInteractive()
            .setPadding(4)
            .on('pointerdown',()=>{
                fx.stop();
                this.scene.start('game_setting');
                console.log("hoge");
            },this);
            fnd_diff_text.depth = 2;




    }

}