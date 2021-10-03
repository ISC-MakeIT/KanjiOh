import GameMenu from "./game_menu.js";
import GameSetting from "./game_setting.js";
import HitsujiGame from "./hituji_game.js";
import GameResult from "./game_result.js";
import WindowSetting from "./window_setting.js";
import OpenLogo from "./open_logo.js";
import HowToPlay from "./how_to_play.js";

const config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
};

const game = new Phaser.Game(config);

game.scene.add("game_menu", GameMenu);
game.scene.add("window", WindowSetting);
game.scene.add("logo", OpenLogo);
game.scene.add("game_setting", GameSetting);
game.scene.add("hituji_game", HitsujiGame);
game.scene.add("game_result", GameResult);
game.scene.add("how_to_play", HowToPlay);
