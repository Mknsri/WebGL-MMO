function Model(path, scene) {
    this.modelPath = path;
    this.x = 0;
    this.y = 0;
    this.z = 0;
	this.rotation = 0;
	
    this.modelLoaded = false;
    
    this.loadModel();
    this.scene = scene;
};

Model.prototype.loadModel = function (s, callback) {
    loader = new THREE.JSONLoader();
    modelHandle = this;
    loader.load( this.modelPath, modelHandle.addModelToScene);
}

Model.prototype.addModelToScene = function(geometry, material) {
	geometry.applyMatrix( new THREE.Matrix4().makeTranslation( -0.7, -3, 0));
    modelHandle.modelObj = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(material));
	modelHandle.modelObj.scale.set(1,1,1);
    modelHandle.scene.add(modelHandle.modelObj);
    modelHandle.modelObj.position.x = modelHandle.x;
    modelHandle.modelObj.position.y = modelHandle.y;
    modelHandle.modelObj.position.z = modelHandle.z;
    
	modelHandle.modelObj.castShadow = true;
	
    modelHandle.modelLoaded = true;
}

Model.prototype.updateModel = function() {
	if(modelHandle.modelLoaded) {
		this.x = this.modelObj.position.x;
		this.y = this.modelObj.position.y;
		this.z = this.modelObj.position.z;
		this.modelObj.rotation.y = this.rotation;
	}
}
