var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('startup', new startupState());
game.state.add('menuState', new menuState());
game.state.add('platform', new platformState());
game.state.start("startup", true, false, "assets/levels.json");