function init(){
	var scene = new THREE.Scene();
    
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 10, 30);
	camera.lookAt(scene.position);
	scene.add(camera);

	var planeGeometry = new THREE.PlaneGeometry(30, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.set(0, 0, 0);
	scene.add(plane);
	
	var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
    camera.add(spotLight);
	
	scene.fog=new THREE.FogExp2( 0xffffff, 0.022 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	renderer.render(scene, camera);

	function render() {
		camera.position.z -= 0.03;
		requestAnimationFrame(render);
		renderer.render(scene, camera)
	}
	
	render();
			
};
window.onload = init;