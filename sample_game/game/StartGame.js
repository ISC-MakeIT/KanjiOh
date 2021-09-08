export default class StartGame extends Phaser.Scene {

    constructor() {
        super({key: "startGame",active: false});
    }
    
    preload(){
        
         // 音声アイコン
         this.load.image('sound', '../img/sound.png');

         // ロゴマーク
         this.load.image('logo', '../img/logo_touka.png');
    };
    
    create(){

        // 音声アイコン枠描画
        let sound_circle = this.add.graphics();
        sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
        this.depth = sound_circle.y;

        // 音声アイコン
        let sound_icon = this.add.image(70,700,'sound');
        sound_icon.depth = 1;

        // logo画像
        const logo_image = this.add.image(500, 400, 'logo');
        logo_image.depth = 1;

        // 実行
        this.cameras.main.fadeIn(2000);
        
        // fadeIn終わったらfadeOut自動で実行
        this.cameras.main.once('camerafadeincomplete', function (camera) {  
            camera.fadeOut(2000);
        });    
        
        // fadeInOut終わったらScene移動
        this.cameras.main.once('camerafadeoutcomplete', ()=> {
            this.scene.start('index');
        });

        // fadeIn,fadeOut設定
        this.tweens.add({
            targets: logo_image,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });
    }  
}