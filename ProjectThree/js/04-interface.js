function init(){	
	var scene = new THREE.Scene();
        
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	scene.add(camera);

	var planeGeometry = new THREE.PlaneGeometry(30, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x3ad4d4});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;
	scene.add(plane);
	
	var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	//Create a var and a GUI visible on the user's interface
	this.rotationSpeedZ = 0.01;
	this.rotationSpeedX = 0.08;
	this.rotationSpeedY = 0.04;
	var gui = new dat.GUI();
	//add the created var in the GUI slider and give it a min and a max
	gui.add(this, 'rotationSpeedZ', -0.1, 0.1);
	gui.add(this, 'rotationSpeedX', -0.1, 0.1);
	gui.add(this, 'rotationSpeedY', -0.1, 0.1);
	
//	var step = 0;
//	var multiplication = 1;
	function render() {
//		step += 0.1;
//		multiplication += 0.001;
//		plane.rotation.z = (Math.cos(step))*multiplication;
		plane.rotation.z += rotationSpeedZ;
		plane.rotation.x += rotationSpeedX;
		plane.rotation.y += rotationSpeedY;
		requestAnimationFrame(render);
		renderer.render(scene, camera)
	}
	
	render();
			
};
window.onload = init;