export default class GameResult extends Phaser.Scene {
    constructor() {
        super('game-result');
    }

    init(data) {
        this.timer = data.time;
        this.answers = data.answers;
    }

    create() {
        this.add.text(512, 160, `正解数:${this.answers}`, {
            fontFamily: "Arial",
            fontSize: 50
        }).setOrigin(0.5, 0);
        this.add.text(512, 240, `タイム:${this.timer}`, {
            fontFamily: "Arial",
            fontSize: 50
        }).setOrigin(0.5, 0);
    }
}