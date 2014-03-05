
function Renderer () {
    this.SCREEN_SIZE_W = window.innerWidth;
    this.SCREEN_SIZE_H = window.innerHeight;

    this.ARTPATH = 'art/';
    
    console.log('Renderer object created');
};

Renderer.prototype.init = function(elementToRenderIn) {
    // DOM element we do the rendering in
    this.renderElement = elementToRenderIn;
    
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.SCREEN_SIZE_W/this.SCREEN_SIZE_H, 0.1, 10000);
		
    this.glRenderer = new THREE.WebGLRenderer();
    this.glRenderer.setSize(this.SCREEN_SIZE_W, this.SCREEN_SIZE_H);
	this.glRenderer.shadowMapEnabled = true;
    
    console.log('Renderer intialized, creating geometry...');
    
    this.geometry = new THREE.CubeGeometry(1,1,1);
    this.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
    this.cube = new THREE.Mesh(this.geometry, this.material);
    
       
    console.log('Geometry created, appending to body...');
    
    document.body.appendChild(this.glRenderer.domElement);
    
    renderHandle = this;
	//this.renderElement.addEventListener('click', renderHandle.requestFullScreen);
    
    this.scene.add(this.cube);

    this.camera.position.z = 10;
}

Renderer.prototype.render = function () {

    this.cube.rotation.y += 0.1;
    
    if (this.cube.material.color == 0x0fffff ) {
        this.cube.material.color.setHex(0x010101)
    }    else { 
        this.cube.material.color.setHex(0xff0101);
    }
    this.glRenderer.render(this.scene, this.camera);
}

Renderer.prototype.prepareWorld = function() {
	
	// Sky
	this.skyGeometry = new THREE.CubeGeometry( 10000, 10000, 10000, 1, 1, 1, null, true);
	
	this.skyTexture = new THREE.ImageUtils.loadTexture ( this.ARTPATH + 'sky.jpg');
    this.skyMaterial = new THREE.MeshLambertMaterial({map: this.skyTexture});
    this.skyMaterial.side = THREE.DoubleSide;
	
	
    this.worldSky = new THREE.Mesh(this.skyGeometry,this.skyMaterial);
	
	// Ground
    this.worldGeometry = new THREE.PlaneGeometry(512, 512);
    this.worldTexture = new THREE.ImageUtils.loadTexture ( this.ARTPATH + 'groundtex.jpg');
    this.worldTexture.wrapS = THREE.RepeatWrapping;
    this.worldTexture.wrapT = THREE.RepeatWrapping;
    this.worldTexture.repeat.set (512/128,512/128);
    
    this.worldMaterial = new THREE.MeshLambertMaterial({map: this.worldTexture});
    this.worldMaterial.side = THREE.DoubleSide;
	this.worldModel = new THREE.Mesh(this.worldGeometry, this.worldMaterial);
	
	this.worldModel.receiveShadow = true;
	this.worldModel.castShadow = true;
    
    // Translate the world plane
    this.worldModel.position.y = -15;
    this.worldModel.rotation.x = 1.57;
    
    this.scene.add(this.worldModel);
	this.scene.add(this.worldSky);
    
    //this.addAmbientLight();
	this.addSunSpotlight();
    
}

Renderer.prototype.addAmbientLight = function() {
    this.ambientLight = new THREE.AmbientLight(0xffffff);
    this.scene.add(this.ambientLight);
}

Renderer.prototype.addSunSpotlight = function() {
	this.sunLight = new THREE.DirectionalLight(0xffffff);
	this.sunLight.castShadow = true;
	
	this.sunLight.position.set(0,10,0);
	this.sunLight.target.position.set(0,0,0);
	this.scene.add(this.sunLight);
}

Renderer.prototype.requestFullScreen = function () {
    
    element = renderHandle.renderElement;
    element.requestFullScreen =
	element.requestFullScreen    ||
	element.mozRequestFullScreen ||
	element.webkitRequestFullScreen;
 
    element.requestFullScreen(element.ALLOW_KEYBOARD_INPUT);
}