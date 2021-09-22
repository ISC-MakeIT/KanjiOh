import { kanjiList } from "./kanjilist.js";

export default class Hitsuji_game extends Phaser.Scene {
    constructor() {
        super({key: "hituji_game", active: false});
        this.kanjiIndex = 0;
        this.kanjiComponents = [];
        this.timer = 0;
        this.answerCounter = 0;
        this.wrongFlag = false;  
    }

    preload(){
        
        // bgm
        this.load.audio('game_bgm', '../audio/timer.mp3');
        this.load.audio('correct_se', '../audio/correct.mp3');
        this.load.audio('but_se', '../audio/but_se.mp3');

    };

    init(data) {
        console.log(data);
        this.mode = data.mode;
        this.schoolYear = data.schoolYear;
        this.sizeY = data.size[0] - 0;
        this.sizeX = data.size[2] - 0;
        this.kanjiList = kanjiList[data.schoolYear];
    }

    create() {

        // 背景
        let bg_game_menu = this.add.graphics();
        bg_game_menu.fillStyle(0xeaeaea, 1).fillRect(0,0,1024, 768);
        bg_game_menu.depth = 0;
        
        // 音声アイコン枠描画
        let sound_circle = this.add.graphics();
        sound_circle.fillStyle(0x333333, 1).fillCircle(70, 700, 40);
        sound_circle.depth = 3;

        // 音声アイコン
        let sound_icon = this.add.sprite(70,700,'sound');
        let sound_status = 1;
        sound_icon.depth = 4;
        sound_icon.setInteractive();

    // 音楽
        // ゲームBGM
        let fx = this.sound.add('game_bgm');
        fx.allowMultiple = false;
        fx.setLoop(true);
        // fx.play();
        // console.log(sound_status);
    
        sound_icon.on('pointerdown',()=>{
            if(sound_status === 0){
                fx.play();
                sound_status = 1;
                // console.log(sound_status);
            }else if(sound_status === 1){
                fx.stop();
                sound_status = 0;
                // console.log(sound_status);
            }
        },this);

        
        for (let y = 0; y < this.sizeY; y++) {
            for (let x = 0; x < this.sizeX; x++) {
                this.kanjiComponents.push([]);
                this.kanjiComponents[y].push(
                    this.add.text(100 + x * 100, 200 + y * 100, "　", {
                        fill: 0x333333,
                        fontSize: 60,
                        fontFamily: 'Arial',
                    }).setInteractive()
                )
            }
        }

        this.updateKanji();

        if (this.mode === "timeLimit") {
            this.timerComponent = this.add.text(310, 54, "残り時間：" + (60 - this.timer) + "秒", {
                fill: 0x333333,
                fontSize: 50,
                fontFamily: 'Arial',
            })
        } else if (this.mode === "timeAttack") {
            this.timerComponent = this.add.text(10, 10,"残り時間：" +this.timer + "秒", {
                fontSize: 50,
                fontFamily: 'Arial',
            })
        }

        this.answerComponent = this.add.text(360, 671, "正解数:" + this.answerCounter + "問", {
            fill: 0x333333,
            fontSize: 50,
            fontFamily: 'Arial',
        }).setOrigin(1, 0);

        this.time.addEvent({
            delay: 1000,
            repeat: Infinity,
            callback: this.countTime,
            callbackScope: this
        })
    }

    countTime() {
        this.timer++;
        this.check();

        if (this.mode === "timeLimit") {
            this.timerComponent.setText(`残り時間：${60 - this.timer}秒`)
        } else if (this.mode === "timeAttack") {
            this.timerComponent.setText(`${this.timer}秒`)
        }
    }

    check() {
        let fx = this.sound.add('game_bgm');
        if (
            this.mode === "timeLimit" && this.timer >= 60 ||
            this.mode === "timeAttack" && this.answerCounter >= 10 ||
            this.mode === "suddenDeath" && this.wrongFlag
        ) {
            fx.stop();
            this.scene.start(

                "game_result",
                {
                    time: this.timer,
                    answers: this.answerCounter
                }
            )
        }
    }

    shuffleKanjiList() {
        let i = this.kanjiList.length;
        while (i > 1) {
            i--;
            let j = Math.floor(Math.random() * i);
            [this.kanjiList[i], this.kanjiList[j]] = [this.kanjiList[j], this.kanjiList[i]]
        }
    }

    updateKanji() {
        const answerY = Math.floor(Math.random() * this.sizeY);
        const answerX = Math.floor(Math.random() * this.sizeX);
        const i = this.kanjiIndex;
        
        // 正解/不正解SE
        let correct = this.sound.add('correct_se');
        let but = this.sound.add('but_se');

        for (let y = 0; y < this.sizeY; y++) {
            for (let x = 0; x < this.sizeX; x++) {
                this.kanjiComponents[y][x].off("pointerdown");

                if (y === answerY && x === answerX) {
                    this.kanjiComponents[y][x].setText(this.kanjiList[i][1]);
                    this.kanjiComponents[y][x].once("pointerdown", () => {
                        correct.play();

                        this.answerCounter++;
                        this.answerComponent.setText(`正解数:${this.answerCounter}問`);
                        this.check()
                        this.updateKanji();
                    })

                } else {
                    this.kanjiComponents[y][x].setText(this.kanjiList[i][0]);
                    this.kanjiComponents[y][x].once("pointerdown", () => {
                        but.play();
                        this.wrongFlag = true;
                        this.check()
                        this.updateKanji();
                    })
                }

            }
        }

        this.kanjiIndex = (this.kanjiIndex + 1) % this.kanjiList.length;
    }
}