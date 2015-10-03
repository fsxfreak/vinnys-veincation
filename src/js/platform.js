var platformState = {
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
    },
    update: function() {
        this.game.physics.arcade.collide(cat, blockedLayer);

        wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        };
	
	    cursors = this.game.input.keyboard.createCursorKeys();	

        cat.body.velocity.x = 0;
        this.game.camera.x = cat.x - 200;
        this.game.camera.y = cat.y;
        if (wasd.left.isDown || cursors.left.isDown)
        {
            cat.body.velocity.x = -300;
            cat.animations.play('left');
        }
        else if (wasd.right.isDown || cursors.right.isDown)
        {
            cat.body.velocity.x = 300;
            cat.animations.play('right');
        }
        else
        {
            cat.animations.stop();
            cat.frame = 0;
        }

        if ((wasd.up.isDown || cursors.up.isDown) && cat.body.touching.down)
        {
            cat.body.velocity.y = -600;
        }
    }
};
