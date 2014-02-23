
function mkGame() {
	this.gameStartedTime = (new Date()).getTime();
	
	this.mkRenderer = new Renderer();
	this.mkKeyboard = new Keyboard();
	this.mkStats = new Stats();
	
	this.activePlayers = [];
};

mkGame.prototype.initGame = function(gameElement) {
		this.gameElement = gameElement;
		console.log("Initializing game");
		this.mkRenderer.init(gameElement);
		this.mkRenderer.prepareWorld();

		this.gameElement.appendChild(this.mkStats.domElement);
		
		this.start();
}

mkGame.prototype.start = function() {
		requestAnimationFrame(this.start.bind(this));
		this.mkKeyboard.listenForKeyboard();
		this.handleKeyboard();

		this.mkRenderer.render();
		this.mkStats.update();
}

mkGame.prototype.handleKeyboard = function() {
	var kb = this.mkKeyboard.returnKeyboardEvents();
	if (kb.length > 0) {
		for (var i = 0; i < kb.length; i++) {
			switch (kb[i]) {
				case "LEFT":
					this.mkRenderer.camera.rotation.y += 0.1;
					break;
				case "RIGHT":
					this.mkRenderer.camera.rotation.y += -0.1;
					break;
				case "UP":
					this.mkRenderer.camera.translateZ(-1);
					break;
				case "DOWN":
					this.mkRenderer.camera.translateZ(1);
					break;
				default: break;					
			}
		}
	}
	// Reset the keyboard queue
	this.mkKeyboard.resetKeyboardEvents();

}

mkGame.prototype.addPlayerToWorld = function (x, y, playerID) {
	
}
