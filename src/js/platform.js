var platformState = {
    create: function() {
        bg = game.add.tileSprite(0, 0
            , game.world.bounds.width, game.cache.getImage('bg').height, 'bg');
        bg.scale = new PIXI.Point(3, 12);

        platforms = this.game.add.group();
        platforms.enableBody = true;

        var ground = platforms.create(0, this.game.world.height - 64, 'platform');
        ground.body.immovable = true;
        var ledge = platforms.create(400, 400, 'platform');
        ledge.body.immovable = true;
        platforms.z = 2;

        cat = this.game.add.sprite(0, this.game.world.height - 300, 'cat');
        this.game.physics.arcade.enable(cat);

        cat.body.bounce.y = 0.2;
        cat.body.gravity.y = 980;
        cat.body.collideWorldBounds = true;

        cat.scale = new PIXI.Point(0.5, 0.5);

        cat.animations.add('left', [0, 1], 10, true);
        cat.animations.add('right', [2, 3], 10, true);
    },
    update: function() {
        this.game.physics.arcade.collide(cat, platforms);

        wasd = {
            up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
        };

        cat.body.velocity.x = 0;
        this.game.camera.x = cat.x - 200;
        this.game.camera.y = cat.y;
        bg.tilePosition.x = -150;
        if (wasd.left.isDown)
        {
            cat.body.velocity.x = -300;
            cat.animations.play('left');
        }
        else if (wasd.right.isDown)
        {
            cat.body.velocity.x = 300;
            cat.animations.play('right');
        }
        else
        {
            cat.animations.stop();
            cat.frame = 0;
        }

        if (wasd.up.isDown && cat.body.touching.down)
        {
            cat.body.velocity.y = -600;
        }
    }
};