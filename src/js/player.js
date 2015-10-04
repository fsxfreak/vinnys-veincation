var Player = function(game_state, position, properties) {
	'use strict';
	Prefab.call(this, game_state, position, properties);

	this.walking_speed = +properties.walking_speed;
	this.jumping_speed = +properties.jumping_speed;
	this.bouncing = +properties.bouncing;
	this.gravity = +properties.gravity;

	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;

	this.scale = new PIXI.Point(0.5, 0.5);

	this.animations.add('left', [0, 1], 10, true);
    this.animations.add('right', [2, 3], 10, true);

	this.frame = 0;

	this.wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D)
    };

    this.cursors = this.game.input.keyboard.createCursorKeys();	
}

Player.prototype = Object.create(Prefab.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	//this.game.physics.arcade.collide(this, this.game.layers.collision);
	this.game.physics.arcade.collide(this, 'blocked');

    // this.game.camera.x = cat.x - 200; TODO CHANGE CAMERA MOVING TO SOMEWHERE ELSE
    // this.game.camera.y = cat.y;
    if (this.wasd.left.isDown || this.cursors.left.isDown)
    {
        this.body.velocity.x = -this.walking_speed;
        this.animations.play('left');
    }
    else if (this.wasd.right.isDown || this.cursors.right.isDown)
    {
        this.body.velocity.x = this.walking_speed;
        this.animations.play('right');
    }
    else
    {
    	this.body.velocity.x = 0;
        this.animations.stop();
        this.frame = 0;
    }

    if ((this.wasd.up.isDown || this.cursors.up.isDown) && this.body.blocked.down)
    {
        this.body.velocity.y = -this.jumping_speed;
    }
}