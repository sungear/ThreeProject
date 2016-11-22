function init(){	
	var scene = new THREE.Scene();
        
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(-30, 40, 30);
	camera.lookAt(scene.position);
	scene.add(camera);

	var planeGeometry = new THREE.PlaneGeometry(30, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x3ad4d4});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.set(0, 0, 0);
	scene.add(plane);
	
	//Create and add cube to scene
	var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xffff00});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	plane.position.set(0, 0, 0);
    scene.add(cube);
	
	var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    scene.add(spotLight);

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	
	//Create var and add it to interface
	this.planeRotationSpeedZ = 0;
	plane.position.set(0, 0, 0);
	var gui = new dat.GUI();
	gui.add(this, 'planeRotationSpeedZ', -0.1, 0.1);
	gui.add(this, 'cubePositionX', -15, 15);
	gui.add(this, 'cubePositionY', -15, 15);
	gui.add(this, 'cubePositionZ', -15, 15);
	
	function render() {	
		//set cube position to interface var
		cube.position.x = cubePositionX;
		cube.position.y = cubePositionY;
		cube.position.z = cubePositionZ;
		plane.rotation.z = planeRotationSpeedZ;
		requestAnimationFrame(render);
		renderer.render(scene, camera)
	}
	
	render();
			
};
window.onload = init;