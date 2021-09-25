class Window_setting extends Phaser.Scene {
  constructor() {
    super({ key: "window", active: true });
  }

  create() {
    setTimeout(() => {
      // --- Window設定 ---
      const graphics = this.add.graphics();

      graphics
        .fillStyle(0xffffff, 1)
        .fillRoundedRect(352, 302, 320, 160, 5, 5).depth = 0;

      // --- テキスト---
      const screen_text = this.add.text(
        388,
        328,
        "フルスクリーン表示しますか？",
        {
          fontSize: "18px",
          fontFamily: "nomal",
          fill: "#3c3c3c",
        }
      );

      screen_text.setPadding(4).depth = 1;

      const alert_text = this.add.text(
        388,
        421,
        "※フルスクリーン表示にしないとゲームが開始されません",
        {
          fontSize: "10px",
          fill: "#3c3c3c",
        }
      );

      alert_text.setPadding(4).depth = 1;

      // --- ボタン---

      // --- ✖ボタン・イベント ---
      const cross_button = this.add.text(652, 310, "✖", {
        fontSize: "16px",
        fill: "#707070",
      });

      cross_button.setInteractive().on(
        "pointerdown",
        () => {
          this.scene.start("window");
        },
        this
      );
      cross_button.depth = 1;

      // ---「いいえ」ボタン/テキスト---
      const cancel_graphics = this.add.graphics();

      cancel_graphics
        .fillStyle(0x707070, 1)
        .fillRoundedRect(373, 363, 137, 40, 5).depth = 1;

      const cancel_text = this.add.text(422, 375, "いいえ", {
        fontSize: "16px",
        fill: "#ffffff",
      });

      cancel_text.depth = 2;
      cancel_text.setInteractive().on(
        "pointerdown",
        () => {
          this.cameras.main.fadeOut(500);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("window");
          });
        },
        this
      );

      // 「はい」ボタン/テキスト
      const dicision_graphics = this.add.graphics();

      dicision_graphics
        .fillStyle(0x32b65e, 1)
        .fillRoundedRect(515, 363, 137, 40, 5).depth = 1;

      const dicision_text = this.add.text(571, 375, "はい", {
        fontSize: "16px",
        fill: "#ffffff",
      });

      dicision_text.depth = 2;
      dicision_text.setInteractive().on(
        "pointerdown",
        () => {
          dicision_text.removeInteractive();
          this.cameras.main.fadeOut(500);
          this.cameras.main.once("camerafadeoutcomplete", () => {
            this.scene.start("logo");
          });
        },
        this
      );
    }, 3000);
  }
}
