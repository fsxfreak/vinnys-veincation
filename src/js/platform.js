var platformState = {
    create: function() {
        map = game.add.tilemap('level1')
        map.addTilesetImage('tiles', 'vein-tile');

        backgroundLayer = map.createLayer('background');
        blockedLayer = map.createLayer('blocked');
        map.setCollisionBetween(1, 800, true, 'blocked');
        backgroundLayer.resizeWorld();

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.physicalBodyType = Phaser.Physics.ARCADE;

        for (object_layer in map.objects) {
            if (map.objects.hasOwnProperty(object_layer)) {
                map.objects[object_layer].forEach(this.create_object, this);
            }
        }

        vinny = this.game.add.sprite(0, this.game.world.height - 300, 'vinny-tile');
        this.game.physics.arcade.enable(vinny);

        this.goal = this.game.add.sprite(4039, 380, 'goal');
        this.game.physics.arcade.enable(this.goal);
        this.goal.body.gravity.y = 0;

        vinny.body.bounce.y = 0.2;
        vinny.body.gravity.y = 980;
        vinny.body.collideWorldBounds = true;

        vinny.animations.add('walking', [0, 1, 2, 3], 7, true);
        vinny.scale = new PIXI.Point(0.35, 0.35);

        game.physics.setBoundsToWorld();

    },
    update: function() {
        this.game.physics.arcade.collide(vinny, blockedLayer);

        wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
    
        cursors = this.game.input.keyboard.createCursorKeys();  

        vinny.body.velocity.x = 0;
        this.game.camera.x = vinny.x - 200;
        this.game.camera.y = vinny.y;
        if (wasd.left.isDown || cursors.left.isDown)
        {
            vinny.body.velocity.x = -300;
            vinny.animations.play('walking');
        }
        else if (wasd.right.isDown || cursors.right.isDown)
        {
            vinny.body.velocity.x = 300;
            vinny.animations.play('walking');
        }
        else
        {
            vinny.animations.stop();
            vinny.frame = 0;
        }
        if ((wasd.up.isDown || cursors.up.isDown) && vinny.body.blocked.down)
        {
            vinny.body.velocity.y = -600;
        }
        
        this.game.physics.arcade.overlap(this.goal
            , vinny, this.collisionHandler, null, this);
        this.game.physics.arcade.overlap(this.enemies
            , vinny, this.collisionHandlerLose, null, this);
    },
    create_object: function (object) {
        var position;
        position = {'x': object.x + (map.tileHeight / 2), 'y': object.y - (map.tileHeight / 2)};
        switch(object.type) {
        case 'enemy':
            var temp = this.enemies.create(position.x, position.y, 'wbc');
            temp.scale = new PIXI.Point(0.1, 0.1);
            break;
        }
    },
    collisionHandler: function(goal, player) {
        game.state.start('win');
    },
    collisionHandlerLose: function(enemy, player) {
        game.state.start('lose');
    }
};