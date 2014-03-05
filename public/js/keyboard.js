function Keyboard () {
    this.keyboard = new THREEx.KeyboardState();
    this.keyboardEvents = [];
    console.log('Keyboard created');
};

Keyboard.prototype.listenForKeyboard = function() {
    if (this.keyboard.pressed("left"))  { this.keyboardEvents.push("LEFT");}
    if (this.keyboard.pressed("right")) { this.keyboardEvents.push("RIGHT");}
    if (this.keyboard.pressed("up"))    { this.keyboardEvents.push("UP");}
    if (this.keyboard.pressed("down"))  { this.keyboardEvents.push("DOWN");}   
    if (this.keyboard.pressed("a"))  { this.keyboardEvents.push("LEFT");}
    if (this.keyboard.pressed("d")) { this.keyboardEvents.push("RIGHT");}
    if (this.keyboard.pressed("w"))    { this.keyboardEvents.push("UP");}
    if (this.keyboard.pressed("s"))  { this.keyboardEvents.push("DOWN");}  
    if (this.keyboard.pressed("f"))  { this.keyboardEvents.push("F");}  
}

Keyboard.prototype.returnKeyboardEvents = function() {
    return this.keyboardEvents;
}

Keyboard.prototype.resetKeyboardEvents = function() {
    this.keyboardEvents.length = 0;
}