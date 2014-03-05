function Player(name, modelpath, scene) {
	this.MOVESPEED = 1;
	this.FALLSPEED = 1;
	
	this.playerModel = new Model(modelpath, scene);
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.rotation = 0;
};

Player.prototype.getCamera = function(camera) {
	this.playerCamera = camera;
	this.controls = new THREE.OrbitControls(this.playerCamera);
}

Player.prototype.tick = function() {
	
	this.gravityTick(1);
	
	// Update model
	if (this.playerModel.modelLoaded == true) {
		this.playerModel.modelObj.add(this.playerCamera);
	}
	this.playerModel.x = this.x;
	this.playerModel.y = this.y;
	this.playerModel.z = this.z;
	this.playerModel.rotation = this.rotation;
	this.playerModel.updateModel();
	
	this.controls.target.x = this.x;
	this.controls.target.y = this.y;
	this.controls.target.z = this.z;
}

Player.prototype.gravityTick = function(floorLevel) {
	if (this.y > floorLevel) {
		this.y -= this.FALLSPEED;
	}	else {
		this.y = floorLevel;
	}
}

Player.prototype.move = function(dir) {
	
	var cameraPos = this.controls.object;
	var pos = this.playerModel.modelObj;
	
	switch(dir)
	{
		case "FORWARD":
			pos.translateZ(this.MOVESPEED);
			break;
		case "BACKWARD":
			pos.translateZ(-this.MOVESPEED);
			break;
		case "STEPLEFT":
			pos.translateX(this.MOVESPEED);
			break;
		case "STEPRIGHT":
			pos.translateX(-this.MOVESPEED);
			break;
	}
}

Player.prototype.rotate = function(angle) {
	this.rotation += angle;
}
