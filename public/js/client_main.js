
function mkGame() {
    this.gameStartedTime = (new Date()).getTime();
    	
    this.mkRenderer = new Renderer();
	this.ARTPATH = this.mkRenderer.ARTPATH;
	
    this.mkKeyboard = new Keyboard();
    this.mkMouse = new Mouse();
    this.mkStats = new Stats();
    
    this.activePlayers = [];
};

mkGame.prototype.initGame = function(gameElement) {
        this.gameElement = gameElement;
        console.log("Initializing game");
        
        this.mkRenderer.init(gameElement);
        this.mkRenderer.prepareWorld();
        
        this.mkMouse.init(gameElement);

        this.gameElement.appendChild(this.mkStats.domElement);
				
		this.activePlayers[0] = new Player("ebin",this.ARTPATH + "testimodeli.js", this.mkRenderer.scene);
        this.localPlayer = this.activePlayers[0];
		this.localPlayer.getCamera(this.mkRenderer.camera);
		
		this.mkRenderer.camera.add(this.localPlayer);
		
        this.start();
}

mkGame.prototype.start = function() {
        requestAnimationFrame(this.start.bind(this));
        this.mkKeyboard.listenForKeyboard();
        this.handleKeyboard();
        this.mkMouse.tick(this.localPlayer);
        this.mkRenderer.render();
        this.mkStats.update();
		this.localPlayer.tick();
}

mkGame.prototype.handleKeyboard = function() {
    var kb = this.mkKeyboard.returnKeyboardEvents();
    if (kb.length > 0) {
        for (var i = 0; i < kb.length; i++) {
            switch (kb[i]) {
                case "LEFT":
					this.localPlayer.move("STEPLEFT");
                    break;
                case "RIGHT":
					this.localPlayer.move("STEPRIGHT");
                    break;
                case "UP":
					this.localPlayer.move("FORWARD");
                    break;
                case "DOWN":
					this.localPlayer.move("BACKWARD");
                    break;
				case "F":
					this.mkRenderer.requestFullScreen();
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
