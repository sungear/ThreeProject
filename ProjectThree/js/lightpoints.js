function init(){
	var scene = new THREE.Scene();
        
	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set( -30, 40, 50 );
	camera.lookAt(scene.position);
	scene.add(camera);

	var planeGeometry = new THREE.PlaneGeometry(30, 20, 1, 1);
	var planeMaterial = new THREE.MeshLambertMaterial({color: 0x3ad4d4});
	var plane = new THREE.Mesh(planeGeometry, planeMaterial);
	plane.rotation.x = -0.5 * Math.PI;
	plane.position.set(0, 0, 0);
	scene.add(plane);
	
	var cubeGeometry = new THREE.BoxGeometry(4,4,4);
    var cubeMaterial = new THREE.MeshLambertMaterial({color:0xffff00});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
	plane.position.set(0, 0, 0);
    scene.add(cube);	
	
	var lights = new Array(10);
	var pointLigths = new Array(10);
	var spheres = new Array(10);
	var moveA = new Array();
	var oriA = getRandomOrientation();
	var multA = getRandomMultplication();
	var moveB = new Array();
	var oriB = getRandomOrientation();
	var multB = getRandomMultplication();
	var moveC = new Array();
	var oriC = getRandomOrientation();
	var multC = getRandomMultplication();
	for (var i = 0; i < lights.length; i++) {		
		var ligthColor = randomColor();
		var light = new THREE.PointLight(ligthColor, 1, 10);
		pointLigths[i] = light;
		var sphereGeometry = new THREE.SphereGeometry( 0.5, 16, 8 );
		var sphereMat = new THREE.MeshPhongMaterial({color: ligthColor, emissive: ligthColor, transparent: true, opacity: 0.5});
		var sphere = new THREE.Mesh(sphereGeometry, sphereMat);	
		spheres[i] = sphere;
		addToList(moveA, moveB, moveC, sphere, i);
		light.add(sphere);
		light.position.set(getRandomInt(-window.innerHeight/30,window.innerHeight/15), 
						   getRandomInt(-window.innerHeight/50,window.innerHeight/25), 
						   getRandomInt(-30,60));
		scene.add(light);
		lights[i] = light;
	}
	
	var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 1, -10);
    scene.add(spotLight);

	var renderer = new THREE.WebGLRenderer();
//	renderer.setClearColor(new THREE.Color(0xffffff, 1.0));
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);	
	
	render();	
	
	
	var startTime = new Date().getTime();
	var ellapsedTime = 0;
	function render() {
		nowTime = new Date().getTime();
		if (nowTime > startTime+ellapsedTime+1000) {
			for(var i = 0; i < lights.length; i++) {
				var newColor = randomColor();
				setColor(spheres[i], newColor);
				setLightColor(pointLigths[i], newColor);
			}
			ellapsedTime += 1000;
		}
		var time = Date.now()*0.001;
		scene.traverse (function(obj) {
			for (var i = 0; i < lights.length; i++) {
				if (obj == moveA[i]){
					lightsMovement(time, obj, oriA, multA);
				}
				if (obj == moveB[i]){
					lightsMovement(time, obj, oriB, multB);
				}
				if (obj == moveC[i]){
					lightsMovement(time, obj, oriC, multC);
				}				
			}
		});
		
		requestAnimationFrame(render);			
		renderer.render(scene, camera)
	}
	
	function setColor(object, color) {
		object.needUpdate = true;		
		object.material = new THREE.MeshPhongMaterial({color: color, emissive: color, transparent: true, opacity: 0.5});
	}
	
	function setLightColor(object, color) {		
		object.needUpdate = true;
		object.color = new THREE.Color(color);
	}
	
	function getRandomOrientation() {
		var orientations = [-1, 1];
		var orientation = orientations[getRandomInt(0, 2)];
		return orientation;
	}
	
	function getRandomMultplication() {		
		var multiplications = [0.5, 1, 1.5, 2, 2.5];
		var multiplication = multiplications[getRandomInt(0, 5)];
		return multiplication;
	}
	
	function addToList(list1, list2, list3, object) {
		var listOfLists = [list1, list2, list3];
		var i = getRandomInt(0, 3);
		var list = listOfLists[i];
		list[list.length] = object;
	}
	
	function lightsMovement(actualTime, obj, orientation, multiplication) {
		obj.position.x = Math.cos(actualTime*0.5)*multiplication*orientation;
		obj.position.y = Math.sin(actualTime * 0.5)*multiplication*orientation;
		obj.position.z = Math.cos(actualTime*0.5)*multiplication*orientation;
	}
	
	function randomColor() {
		var letters = '0123456789ABCDEF';
    	var color = '#';
    	for (var i = 0; i < 6; i++ ) {
    	   	color += letters[Math.floor(Math.random() * 16)];
    	}
    	return color;
	}

	function getRandomInt(min, max) {
		var i = Math.floor((Math.random()*max) + min);
		return i;
	}
			
};
window.onload = init;