function Mouse() {
    this.mouseX = 0;
    this.mouseY = 0;
	
	this.mouseActivatedY = 0;
	this.mouseActivatedX = 0;
	this.mouseActivated = false;
	
	this.mouseEvent;
};

Mouse.prototype.init = function (element) {
    mouseHandle = this;
    this.gameElement = element;
    this.pointerLocked = false;
    
    // Lock the mouse after fullscreen is hit
    this.gameElement.addEventListener('fullscreenchange',mouseHandle.lockMouse, false);
    this.gameElement.addEventListener('mozfullscreenchange',mouseHandle.lockMouse, false);
    this.gameElement.addEventListener('webkitfullscreenchange',mouseHandle.lockMouse, false);
    
	this.gameElement.addEventListener('mousemove',mouseHandle.getMousePosition, false);
	
    this.gameElement.addEventListener('mousedown',mouseHandle.mouseDown, false);
    this.gameElement.addEventListener('mouseup',mouseHandle.mouseUp, false);
    
    console.log("Mouse created");
}

Mouse.prototype.lockMouse = function() {

    element = mouseHandle.gameElement;
    if (!mouseHandle.pointerLocked) {
        element.requestPointerLock = element.requestPointerLock    ||
                                     element.mozRequestPointerLock ||
                                     element.webkitRequestPointerLock;
                                     
        element.requestPointerLock();
        
        mouseHandle.pointerLocked = true;
        console.log("Pointer locked");
    } else {
        mouseHandle.freeMouse();
    }
}

Mouse.prototype.freeMouse = function() {
    this.pointerLocked = false;
    console.log("Pointer freed");
}

Mouse.prototype.tick = function(player) {
	if (this.mouseActivated == true) {
		// if right click is pressed
		if (this.mouseEvent.button === 2) {
			var distanceStartToEnd = (this.mouseActivatedX - this.mouseX)/10000;
			player.rotate(distanceStartToEnd);
			
		}
	}
}

Mouse.prototype.getMousePosition = function() {
    mouseHandle.mouseX = event.clientX;
    mouseHandle.mouseY = event.clientY;
}

Mouse.prototype.mouseDown = function() {
	mouseHandle.mouseActivated = true;
    mouseHandle.mouseActivatedX = event.clientX;
    mouseHandle.mouseActivatedY = event.clientY;
	mouseHandle.mouseEvent = event;
}

Mouse.prototype.mouseUp = function() {
	mouseHandle.mouseActivated = false;
}