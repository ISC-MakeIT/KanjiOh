export default class Window_setting extends Phaser.Scene {
 
  constructor() {
    super({key: "window", active: true});
      this.sizeButtons = {};
    }
    
    create(){
      
      // 外枠ウインドウ描画
      // var graphics = this.add.graphics();
      this.sizeButtons = this.add.graphics();
      // this.sizeButtons.fillRoundedRect(352, 302, 320,160, 5, 10);
    }
  }
  
  const game = new Phaser.Game(config);
  var config = {
　  type: Phaser.AUTO,
　  width: 1024,
　  height: 768,
  };