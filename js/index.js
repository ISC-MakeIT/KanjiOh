import Game_menu from "./game_menu";
import Game_setting from "./game_setting";
import Hituji_game from "./hituji_game";
import Game_result from "./game_result";
import Window_setting from "./window_setting";
import Open_logo from "./open_logo";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
};

// window.onload = () => {
//     new Phaser.Game(config);
// }
const game = new Phaser.Game(config);

game.scene.add("game_menu", Game_menu);
game.scene.add("window", Window_setting);
game.scene.add("logo", Open_logo);
game.scene.add("game_setting", Game_setting);
game.scene.add("hituji_game", Hituji_game);
game.scene.add("game_result", Game_result);
