var menuState = function() {
    Phaser.State.call(this);
};

menuState.prototype = Object.create(Phaser.State.prototype);
menuState.prototype.constructor = menuState;

menuState.prototype.init = function (level_data) {
    this.level_data = level_data;
};

menuState.prototype.preload = function() {
    var assets, asset_loader, asset_key, asset;
    assets = this.level_data.assets;
    for (asset_key in assets) {
        if (assets.hasOwnProperty(asset_key)) {
            asset = assets[asset_key];
            switch(asset.type) {
            case "image":
                this.load.image(asset_key, asset.source);
                break;
            case "spritesheet":
                this.load.spritesheet(asset_key, asset.source,
                    asset.frame_width, asset.frame_height, asset.frames,
                    asset.margin, asset.spacing);
                break;
            case "tilemap":
                this.load.tilemap(asset_key, asset.source, null, Phaser.Tilemap.TILED_JSON);
                break;
            }
        }
    }
    this.load.tilemap('level1', 'assets/level2.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('vein-tile', 'assets/vein-tile.png');
    var menuLabel = game.add.text(80, 150, "Vinny's Veincation",
        {font: '30px Courier', fill: 0x000000 });
};

menuState.prototype.create = function () {
    this.game.world.setBounds(0, 0, 9999999, 600);
    this.game.stage.backgroundColor = 0xffffff;

    var startInstruction = this.game.add.text(80, this.game.world.height - 200,
        "Press enter to start", 
        { font: '25p Arial', fill: 0x000000 });

    var enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterKey.onDown.addOnce(this.start, this);
}

menuState.prototype.start = function () {
    this.game.state.start("platform", true, false, this.level_data);
}