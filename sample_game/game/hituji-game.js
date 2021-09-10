import { kanjiList } from "./kanjilist.js";

export default class GameHitsuji extends Phaser.Scene {
    constructor() {
        super("game-hitsuji");
        this.kanjiIndex = 0;
        this.kanjiComponents = [];
        this.timer = 0;
        this.answerCounter = 0;
        this.wrongFlag = false;
    }

    init(data) {
        this.mode = data.mode;
        this.schoolYear = data.schoolYear;
        this.sizeY = data.size[0] - 0;
        this.sizeX = data.size[2] - 0;
        this.kanjiList = kanjiList[data.schoolYear];
    }

    create() {
        for (let y = 0; y < this.sizeY; y++) {
            for (let x = 0; x < this.sizeX; x++) {
                this.kanjiComponents.push([]);
                this.kanjiComponents[y].push(
                    this.add.text(80 + x * 80, 200 + y * 80, "　", {
                        fontSize: 60,
                        fontFamily: 'Arial',
                    }).setInteractive()
                )
            }
        }

        this.updateKanji();

        if (this.mode === "timeLimit") {
            this.timerComponent = this.add.text(10, 10, "残り" + (60 - this.timer) + "秒", {
                fontSize: 50,
                fontFamily: 'Arial',
            })
        } else if (this.mode === "timeAttack") {
            this.timerComponent = this.add.text(10, 10, this.timer + "秒", {
                fontSize: 50,
                fontFamily: 'Arial',
            })
        }

        this.answerComponent = this.add.text(1014, 10, "正解数:" + this.answerCounter + "問", {
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
            this.timerComponent.setText(`残り${60 - this.timer}秒`)
        } else if (this.mode === "timeAttack") {
            this.timerComponent.setText(`${this.timer}秒`)
        }
    }

    check() {
        if (this.mode === "timeLimit") {
            console.log("ok");
        }
        if (
            this.mode === "timeLimit" && this.timer >= 60 ||
            this.mode === "timeAttack" && this.answerCounter >= 10 ||
            this.mode === "suddenDeath" && this.wrongFlag
        ) {
            this.scene.start(
                "game-result",
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

        for (let y = 0; y < this.sizeY; y++) {
            for (let x = 0; x < this.sizeX; x++) {
                this.kanjiComponents[y][x].off("pointerdown");

                if (y === answerY && x === answerX) {
                    this.kanjiComponents[y][x].setText(this.kanjiList[i][1]);
                    this.kanjiComponents[y][x].once("pointerdown", () => {
                        this.answerCounter++;
                        this.answerComponent.setText(`正解数:${this.answerCounter}問`);
                        this.check()
                        this.updateKanji();
                    })

                } else {
                    this.kanjiComponents[y][x].setText(this.kanjiList[i][0]);
                    this.kanjiComponents[y][x].once("pointerdown", () => {
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