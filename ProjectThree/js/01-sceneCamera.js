function init(){
	//Create Scene
	var scene = new THREE.Scene();
    
	//Create and add Camera to scene
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.x = -30;
	camera.position.y = 40;
	camera.position.z = 30;
	camera.lookAt(scene.position);
	scene.add(camera);

	//Create and add Plane to Scene
	var planeGeometry = new THREE.PlaneGeometry(30, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.x = 0;
	plane.position.y = 0;
	plane.position.z = 0;
	scene.add(plane);

	//Create renderer of the object = scene
	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xFFFFFF, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	// add the output of the renderer to the html element
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	renderer.render(scene, camera);
			
};
window.onload = init;