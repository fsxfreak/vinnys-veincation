var menuState = {
    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.world.setBounds(0, 0, 9999999, 600);
        game.stage.backgroundColor = 0xffffff;

        var startInstruction = game.add.text(80, game.world.height - 200,
            "Press enter to start", 
            { font: '25p Arial', fill: 0x000000 });

        var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        enterKey.onDown.addOnce(this.start, this);
    },
    preload: function() {
        var menuLabel = game.add.text(80, 150, "Vinny's Veincation",
            {font: '30px Courier', fill: 0x000000 });
        game.load.tilemap('level1', 'assets/tiledmap-test.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('vein-tile', 'assets/vein-tile.png');
        game.load.spritesheet('cat', 'assets/home-cat.png', 64, 175);
        game.load.image('platform', 'assets/platform.png');
        game.load.image('bg', 'assets/bg.png');
    },
    start: function() {
        game.state.start('platform');
    }
};