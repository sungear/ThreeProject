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
	//renderer.render(scene, camera);
	
	//Create an animation in a function to update it every frame to keep it going
	var step = 0;
	var multiplication = 1;
	function render() {
//		plane.rotation.z += 0.01;
		step += 0.1; //si step != 0, mvt de retour (balle de tennis)
		multiplication += 0.001;//si step = 0, fait tourner dans un sens unique
		plane.rotation.z = (Math.cos(step))*multiplication;
		requestAnimationFrame(render);
		renderer.render(scene, camera)
	}
	
	//Call the function for the animation
	render();
			
};
window.onload = init;