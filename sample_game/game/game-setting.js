export default class HitsujiSetting extends Phaser.Scene {
    constructor() {
        super("hitsuji-setting");
        this.size = "4x8";
        this.mode = "timeLimit";
        this.schoolYear = "1年生";

        this.sizeButtons = {};
        this.modeButtons = {};
        this.schoolYearButtons = {};
    }

    create() {
        this.add.text(10, 30, "羊の中に犬が一匹", {
            fontSize: 40,
            padding: 3
        });

        this.sizeButtons["2x4"] = this.add.text(10, 90, "2x4");
        this.sizeButtons["3x6"] = this.add.text(90, 90, "3x6");
        this.sizeButtons["4x8"] = this.add.text(170, 90, "4x8");
        Object.values(this.sizeButtons).forEach((value) => {
            value.setStyle({
                fontSize: 24
            });
            value.setInteractive().on("pointerdown", () => {
                this.size = value.text;
                this.select();
            });
        });

        this.modeButtons["timeLimit"] = this.add.text(10, 160, "時間制限");
        this.modeButtons["timeAttack"] = this.add.text(120, 160, "タイムアタック");
        this.modeButtons["suddenDeath"] = this.add.text(300, 160, "サドンデス");
        Object.keys(this.modeButtons).forEach((key) => {
            const value = this.modeButtons[key];
            value.setStyle({
                fontSize: "24px",
                fontFamily: 'Arial',
            });
            value.setInteractive().on("pointerdown", () => {
                this.mode = key;
                this.select();
            });
        });

        this.schoolYearButtons["1年生"] = this.add.text(10, 220, "1年生");
        this.schoolYearButtons["2年生"] = this.add.text(90, 220, "2年生");
        this.schoolYearButtons["3年生"] = this.add.text(170, 220, "3年生");
        this.schoolYearButtons["4年生"] = this.add.text(260, 220, "4年生");
        this.schoolYearButtons["5年生"] = this.add.text(350, 220, "5年生");
        this.schoolYearButtons["6年生"] = this.add.text(440, 220, "6年生");
        Object.keys(this.schoolYearButtons).forEach((key) => {
            const value = this.schoolYearButtons[key];
            value.setStyle({
                fontSize: "24px",
                fontFamily: 'Arial',
            });
            value.setInteractive().on("pointerdown", () => {
                this.schoolYear = key;
                this.select();
            });
        });

        this.select();

        this.add.text(10, 350, "GameStart", { fontSize: 100 }).setInteractive().on("pointerdown", () => {
            this.scene.start(
                "game-hitsuji",
                {
                    size: this.size,
                    mode: this.mode,
                    schoolYear: this.schoolYear,
                }
            )
        })
    }

    select() {
        Object.values(this.sizeButtons).forEach((value) => {
            value.setStyle({
                color: '#fff'
            });
        });
        this.sizeButtons[this.size].setStyle({
            color: "aqua"
        });

        Object.values(this.modeButtons).forEach((value) => {
            value.setStyle({
                color: '#fff'
            });
        });
        this.modeButtons[this.mode].setStyle({
            color: "aqua"
        });

        Object.values(this.schoolYearButtons).forEach((value) => {
            value.setStyle({
                color: '#fff'
            });
        });
        this.schoolYearButtons[this.schoolYear].setStyle({
            color: "aqua"
        });
    }
}