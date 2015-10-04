var startupState = function () {
	Phaser.State.call(this);
};

startupState.prototype = Object.create(Phaser.State.prototype);
startupState.prototype.constructor = startupState;

startupState.prototype.init = function (level_file) {
	this.level_file = level_file;
};

startupState.prototype.preload = function () {
	this.load.text('levels', this.level_file);
};

startupState.prototype.create = function () {
	var level_text, level_data;
	level_text = this.game.cache.getText('levels');
	level_data = JSON.parse(level_text);
	this.game.state.start("menuState", true, false, level_data);
}