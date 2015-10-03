var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
game.state.add('menu', menuState);
game.state.add('platform', platformState);
game.state.start('menu');