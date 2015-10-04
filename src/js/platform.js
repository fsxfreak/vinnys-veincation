/*var platformState = {
    message1: null,
    hitEllipse: function() {
        message1.visible = true;
        console.log('ok');
    },
    create: function() {
        map = game.add.tilemap('level1')
        map.addTilesetImage('tiles', 'vein-tile');

        backgroundLayer = map.createLayer('background');
        blockedLayer = map.createLayer('blocked');
        
        map.setCollisionBetween(1, 800, true, 'blocked');

        backgroundLayer.resizeWorld();
        cat = this.game.add.sprite(0, this.game.world.height - 300, 'cat');
        this.game.physics.arcade.enable(cat);

        cat.body.bounce.y = 0.2;
        cat.body.gravity.y = 980;
        cat.body.collideWorldBounds = true;

        cat.scale = new PIXI.Point(0.5, 0.5);

        cat.animations.add('left', [0, 1], 10, true);
        cat.animations.add('right', [2, 3], 10, true);

        game.physics.setBoundsToWorld();

        message1 = game.add.text(200, 200, "goddamn messag ebox"
            , {font: '30px Courier', fill: 0xffffff });
        message1.visible = false;
    },
    update: function() {
        
    }
};*/

var platformState = function() {
    Phaser.State.call(this);
}

platformState.prototype = Object.create(Phaser.State.prototype);
platformState.prototype.constructor = platformState;

platformState.prototype.init = function(level_data) {
    this.level_data = level_data;

    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 981;

    this.map = this.game.add.tilemap(level_data.map.key);
    this.map.addTilesetImage(this.map.tilesets[0].name, level_data.map.tileset);
};

platformState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;

    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) {
            collision_tiles = [];
            layer.data.forEach(function (data_row) {
                data_row.forEach(function(tile) {
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);

    // this.map = this.game.add.tilemap('level1');
    // this.map.addTilesetImage('tiles', 'vein-tile');

    // this.backgroundLayer = this.map.createLayer('background');
    // this.blockedLayer = this.map.createLayer('blocked');

    // this.backgroundLayer.resizeWorld();

    // this.map.setCollisionBetween(1, 800, true, 'blocked');
    //this.layers[this.map.layer.name].resizeWorld();

    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    //this.game.groups = this.groups;

    this.prefabs = {};

    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
    console.log(this.game);
    console.log(this.map);
}

platformState.prototype.create_object = function (object) {
    var position, prefab;
    position = {'x': object.x + (this.map.tileHeight / 2), 'y': object.y - (this.map.tileHeight / 2)};
    switch(object.type) {
    case 'player':
        prefab = new Player(this.game, position, object.properties);
        break;
    //todo add other eneimes
    }
    this.prefabs[object.name] = prefab;
}