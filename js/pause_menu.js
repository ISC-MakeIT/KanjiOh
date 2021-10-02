export default class PauseMenu extends Phaser.Scene {
  constructor() {
    super("pause_menu");
    // this.events = new Phaser.Events.EventEmitter();
  }

  create() {
    const halfOfSceneWidth = this.sys.canvas.width / 2;

    const background = this.add.graphics();
    background.fillStyle(0x000000, 1).fillRect(0, 0, 1024, 768);

    const textStyle = {
      color: "#ffffff",
      fontFamily: "Arial",
      fontSize: 32,
    };
    /*
    const hitsujiGame = this.game.scene.getScene("hituji_game");
    console.log(hitsujiGame);
    hitsujiGame.events = new Phaser.Events.EventEmitter();
    hitsujiGame.events.on("resume", (scene, data) => {
      console.log(data.status);
      switch (data.status) {
        case "restart":
          hitsujiGame.scene.stop();
          this.scene.start("hituji_game", {
            size: `${this.sizeY}x${this.sizeX}`,
            mode: this.mode,
            schoolYear: this.schoolYear,
          });
          break;
        case "return-to-top":
          hitsujiGame.scene.stop();
          this.scene.start("game_menu");
          break;
        case "finish-game":
          hitsujiGame.scene.stop();
          this.scene.start("game_menu");
          break;
        default:
      }
      this.scene.stop();
    });
*/
    this.add
      .text(halfOfSceneWidth, 200, "再開する", textStyle)
      .setOrigin(0.5, 0)
      .setInteractive()
      .once(
        "pointerdown",
        () => {
          this.scene.resume("hituji_game", { status: "continue" });
          this.scene.stop();
        },
        this
      );

    this.add
      .text(halfOfSceneWidth, 312, "やり直す", textStyle)
      .setOrigin(0.5, 0)
      .setInteractive()
      .once(
        "pointerdown",
        () => {
          this.scene.resume("hituji_game", {
            status: "restart",
          });
          this.scene.stop();
        },
        this
      );

    this.add
      .text(halfOfSceneWidth, 424, "トップへ戻る", textStyle)
      .setOrigin(0.5, 0)
      .setInteractive()
      .once(
        "pointerdown",
        () => {
          this.scene.resume("hituji_game", { status: "return-to-top" });
          this.scene.stop();
        },
        this
      );

    this.add
      .text(halfOfSceneWidth, 536, "ゲームを終了する", textStyle)
      .setOrigin(0.5, 0)
      .setInteractive()
      .once(
        "pointerdown",
        () => {
          this.scene.resume("hituji_game", { status: "finish-game" });
          this.scene.stop();
        },
        this
      );
  }
}
