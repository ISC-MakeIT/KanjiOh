import StartScene from "./StartScene.js";
import StartGame from "./StartGame.js";
import Index from "./Index.js";
// import Boot from "./main-game.js";
import GameHitsuji from "./hituji-game.js";
import HitsujiSetting from "./game-setting.js";
import GameResult from "./game-result.js";
// import Boot from "./game-select.js";

var game = new Phaser.Game(config);

export default class Top extends Phaser.Scene {
  
  constructor() {
    super({key: "top",active: true});
  }
  
  create(){
    
  }
}

setTimeout(() => {
  game.scene.start('startScene');
  // game.scene.start('startGame');
}, 2000)
game.scene.add("startScene", StartScene);
game.scene.add("index", Index);
game.scene.add("startGame", StartGame);
// game.scene.add("boot", Boot);
// game.scene.add("game-select", GameSelect);
game.scene.add("histuji-setting", HitsujiSetting);
game.scene.add("game-hituji", GameHitsuji);
game.scene.add("game-result", GameResult);



var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    // scene: [StartScene,StartGame,Index]
};

