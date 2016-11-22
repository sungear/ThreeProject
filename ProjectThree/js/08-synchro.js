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
	plane.receiveShadow = true;
	plane.position.set(0, 0, 0);
	scene.add(plane);
	
	for(var i = 0; i < 5; i++) {
		var cubeGeometry = new THREE.BoxGeometry(4,4,4);
		var cubeColor = getRandomColor();
    	var cubeMaterial = new THREE.MeshLambertMaterial({color:cubeColor});
		var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
		cube.castShadow = true;
		cube.position.set(getRandomInt(), getRandomInt(), getRandomInt());
		scene.add(cube);
	}
	
	var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, -10);
	spotLight.castShadow = true;
    scene.add(spotLight);

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMapEnabled = true;
	document.getElementById("WebGL-output").appendChild(renderer.domElement);	
	
	this.planeRotationSpeedZ = 0;
	var gui = new dat.GUI();
	gui.add(this, 'planeRotationSpeedZ', -0.1, 0.1);
	
	function getRandomColor() {
    	var letters = '0123456789ABCDEF';
    	var color = '#';
    	for (var i = 0; i < 6; i++ ) {
        	color += letters[Math.floor(Math.random() * 16)];
    	}
    	return color;
	}
	
	function getRandomInt() {
		var i = Math.floor((Math.random()*20) + 0);
		return i;
	}
	
	function render() {
		scene.traverse (function(obj) {
			if (obj instanceof THREE.Mesh && obj != plane ) {
				obj.rotation.x+=0.01;
				obj.rotation.y+=0.01;
				obj.rotation.z+=0.01;
			}
		});
		plane.rotation.z += planeRotationSpeedZ;
		requestAnimationFrame(render);
		renderer.render(scene, camera)
	}
	
	render();
			
};
window.onload = init;