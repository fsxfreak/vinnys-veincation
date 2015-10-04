var Goal = function(game_state, position, properties, player) {
	'use strict';
	this.game = game_state;
	console.log(position.x, position.y);
	this.area = game_state.add.sprite(position.x, position.y, 'goal');
	console.log(this.area);
	//this.area.body.enable = true;

}