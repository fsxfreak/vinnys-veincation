var Prefab = function(game_state, position, properties) {
	Phaser.Sprite.call(this, game_state, position.x, position.y, properties.texture);
	this.game = game_state;
	this.game.groups[properties.group].add(this);
}

Prefab.prototype = Object.create(Phaser.Sprite.prototype);
Prefab.prototype.constructor = Prefab;