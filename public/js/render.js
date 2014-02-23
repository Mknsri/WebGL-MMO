
function Renderer () {
	this.SCREEN_SIZE_W = 640;
	this.SCREEN_SIZE_H = 480;

	this.ARTPATH = 'art/';
	
	console.log('Renderer object created');
};

Renderer.prototype.init = function(elementToRenderIn) {
	// DOM element we do the rendering in
	this.renderElement = elementToRenderIn;
	
	this.scene = new THREE.Scene();
	this.camera = new THREE.PerspectiveCamera(75, this.SCREEN_SIZE_W/this.SCREEN_SIZE_H, 0.1, 1000);
	
	this.glRenderer = new THREE.WebGLRenderer();
	this.glRenderer.setSize(this.SCREEN_SIZE_W, this.SCREEN_SIZE_H);
	
	console.log('Renderer intialized, creating geometry...');
	
	this.geometry = new THREE.CubeGeometry(1,1,1);
	this.material = new THREE.MeshBasicMaterial({color: 0x00ff00, wireframe: true});
	this.cube = new THREE.Mesh(this.geometry, this.material);
	
	// Test model code
	this.testModel = new Model(this.ARTPATH + "testimodeli.js", this.scene);
	
	this.addAmbientLight();
	
	console.log('Geometry created, appending to body...');
	
	document.body.appendChild(this.glRenderer.domElement);
	
	this.scene.add(this.cube);

	this.camera.position.z = 5;
}

Renderer.prototype.render = function () {
	//requestAnimationFrame(this.render.bind(this));

	this.cube.rotation.y += 0.1;
	
	if (this.cube.material.color == 0x0fffff ) {
		this.cube.material.color.setHex(0x010101)
	}	else { 
		this.cube.material.color.setHex(0xff0101);
	}
	this.glRenderer.render(this.scene, this.camera);
}

Renderer.prototype.prepareWorld = function() {
	this.worldGeometry = new THREE.PlaneGeometry(512, 512);
	this.worldTexture = new THREE.ImageUtils.loadTexture ( this.ARTPATH + 'groundtex.jpg');
	this.worldTexture.wrapS = THREE.RepeatWrapping;
	this.worldTexture.wrapT = THREE.RepeatWrapping;
	this.worldTexture.repeat.set (512/128,512/128 );
	
	this.worldMaterial = new THREE.MeshBasicMaterial({map: this.worldTexture});
	this.worldMaterial.side = THREE.DoubleSide;
	this.worldModel = new THREE.Mesh(this.worldGeometry,this.worldMaterial);
	
	// Translate the world plane
	this.worldModel.position.y = -15;
	this.worldModel.rotation.x = 1.57;
	
	this.scene.add(this.worldModel);
}

Renderer.prototype.addAmbientLight = function() {
	this.ambientLight = new THREE.AmbientLight(0xffffff);
	this.scene.add(this.ambientLight);
	this.directionalLight = new THREE.DirectionalLight(0xffffff);
	this.directionalLight.position.set(1, 1, 1).normalize();
	this.scene.add(this.directionalLight);
}