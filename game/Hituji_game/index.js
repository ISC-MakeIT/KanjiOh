import Game_menu from "./game_menu.js";


class Window_setting extends Phaser.Scene {  
    constructor() {
        super({key: "window", active: true});
    }
    
    create(){
        setTimeout(() => {

        //--- Window設定 ---
            let graphics = this.add.graphics();
            
            graphics
                .fillStyle(0xFFFFFF, 1)
                .fillRoundedRect(352, 302, 320,160, 5, 5)
                .depth = 0;
                
                
        //--- テキスト---
            let screen_text = this.add.text(388,328, "フルスクリーン表示しますか？", {
                fontSize: '18px',fontFamily: 'nomal', fill: '#3c3c3c'
            })
            
            screen_text
                .setPadding(4)
                .depth = 1;
                
            let alert_text = this.add.text(388,421, "※フルスクリーン表示にしないとゲームが開始されません", {
                fontSize: '10px', fill: '#3c3c3c'
            })
            
            alert_text
                .setPadding(4)
                .depth = 1;

        //--- ボタン---

            //--- ✖ボタン・イベント ---
            let cross_button = this.add.text(652,310, "✖", {
                fontSize: '16px',fill: '#707070'
            })

            cross_button
                .setInteractive()
                .on('pointerdown',()=>{
                    this.scene.start('window');
                },this);
            cross_button.depth = 1;
            

            //---「いいえ」ボタン/テキスト---
            let cancel_graphics = this.add.graphics();
            
            cancel_graphics
                .fillStyle(0x707070, 1)
                .fillRoundedRect(373, 363, 137, 40, 5)
                .depth = 1; 
            
            let cancel_text = this.add.text(422,375, "いいえ", {
                fontSize: '16px', fill: '#ffffff'
            })

            cancel_text.depth = 2;
            cancel_text
                .setInteractive()
                .on('pointerdown',()=>{
                this.cameras.main.fadeOut(500);
                this.cameras.main.once('camerafadeoutcomplete', ()=> {
                    this.scene.start('window');
                });
            },this);

            // 「はい」ボタン/テキスト
            let dicision_graphics = this.add.graphics();

            dicision_graphics
                .fillStyle(0x32b65e, 1)
                .fillRoundedRect(515, 363, 137, 40, 5)
                .depth = 1;
            
            let dicision_text = this.add.text(571,375, "はい", {
                fontSize: '16px', fill: '#ffffff'
            })
    
            dicision_text.depth = 2;
            dicision_text
                .setInteractive()
                .on('pointerdown',()=>{
                dicision_text.removeInteractive();
                this.cameras.main.fadeOut(500);
                this.cameras.main.once('camerafadeoutcomplete', ()=> {
                    this.scene.start('logo');
                });
            },this);
        }, 3000)
    }
}

class Open_logo extends Phaser.Scene {  
    constructor() {
        super({key: "logo", active: false});
    }

    preload(){
        // ロゴマーク
        this.load.image('logo', '../../img/logo_touka.png');
    };
    
    create(){
    
    // 画像表示

        // logo画像
        const logo_image = this.add.image(500, 400, 'logo');
        logo_image.depth = 1;

    // fadein/out

        this.cameras.main.fadeIn(2000);
        this.cameras.main.once('camerafadeincomplete', function (camera) {  
            camera.fadeOut(2000);
        });    
        
        this.cameras.main.once('camerafadeoutcomplete', ()=> {
            this.scene.start('game_menu');
        });

        this.tweens.add({
            targets: logo_image,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });
    }
}

var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768
}

// window.onload = () => {
//     new Phaser.Game(config);
// }
var game = new Phaser.Game(config);

game.scene.add("game_menu", Game_menu);
game.scene.add("window", Window_setting);
game.scene.add("logo", Open_logo);