function Model(path, scene) {
	this.modelPath = path;
	this.x = 0;
	this.y = 0;
	this.z = 0;
	this.modelLoaded = false;	
	
	this.loadModel();
	this.scene = scene;
};

Model.prototype.loadModel = function (s, callback) {
    loader = new THREE.JSONLoader();
	that = this;
    loader.load( this.modelPath, that.addModelToScene);
}

Model.prototype.addModelToScene = function(geometry, material) {
	that.modelObj = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
	that.scene.add(that.modelObj);
	console.log(material);
	that.modelObj.position.x = that.x;
	that.modelObj.position.y = that.y;
	that.modelObj.position.z = that.z;
	
	that.modelLoaded = true;
}