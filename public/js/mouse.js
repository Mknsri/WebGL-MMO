function Mouse() {
    
};

Mouse.prototype.init = function (element) {

    mouseHandle = this;
    this.gameElement = element;
    this.pointerLocked = false;
    
    // Lock the mouse after fullscreen is hit
    this.gameElement.addEventListener('fullscreenchange',mouseHandle.lockMouse, false);
    this.gameElement.addEventListener('mozfullscreenchange',mouseHandle.lockMouse, false);
    this.gameElement.addEventListener('webkitfullscreenchange',mouseHandle.lockMouse, false);
    
    console.log("Mouse created");
}

Mouse.prototype.lockMouse = function () {

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

Mouse.prototype.freeMouse = function () {
    console.log("Pointer freed");
}