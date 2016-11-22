function init() {
	var startTime = new Date().getTime();
	var actualTime;
	var ellapsedTime = 100;
	var colorEllapsedTime = 0;
	var ticOver = false;
	var lights = new Array();
	var spheres = new Array();
	var pointLights = new Array();
	var totalLights = 70;
	var moveA = new Array();
	var moveB = new Array();
	var moveC = new Array();
	var oriA = getRandomOrientation();
	var multA = getRandomMultplication();
	var oriB = getRandomOrientation();
	var multB = getRandomMultplication();
	var oriC = getRandomOrientation();
	var multC = getRandomMultplication();
	var explosingLights = [];
	var explosingLight;
	var state = 0;

	var movementSpeed = 0.1;
	var totalObjects = 200;
	var objectSize = 0.05;
	var sizeRandomness = 0;
	var colors = randomColor();
	var dirs = [];
	var parts = [];
	var particles;

	var cameraDistance = 5;
	var newCameraPosition = 30;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 0, 30);
	scene.add(camera);

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(-40, 1, -10);
	scene.add(spotLight);

	createLight(scene, 140, -90, 0, totalLights - 20);
	createLight(camera, 80, 10, totalLights - 20, totalLights);

	scene.fog = new THREE.FogExp2(0xc4c4c4, 0.012);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);
	renderer.render(scene, camera);

	render();

	console.log(explosingLight);

	var starTic = 27579;
	var finalTic = 51585;

	function render() {		
		actualTime = new Date().getTime();
		if (actualTime > startTime + ellapsedTime) {
			switch (ellapsedTime) {
				case 27500 :					
					ticOver = true;
					state = 1;
					break;
				case 32500:
					ticOver = false;
					state = 0;
					break;
				case 32700:
					state = 2;
					break;
				case 32800:
					ticOver = true;
					state = 1;
					break;				
			}
			ellapsedTime += 100;
		}
		
		switch (state) {
			case 0 :
				break;
			case 1 :
//				if (ticOver) {					
//					if (actualTime > startTime + colorEllapsedTime + 500){
//						lightsChangeColor();
//						colorEllapsedTime += 500;
//					}
//				}
				lightsChangeColor();				
				break;
			case 2 :
				explodeLight(camera);
				break;
		}
		
		if (!ticOver) {
			if (colorEllapsedTime != 0) {
				colorEllapsedTime = 0;
			}
		}

		resizeAndDestroyParticle();
		assignLightsMoves();

		camera.position.z -= 0.02;

		requestAnimationFrame(render);
		renderer.render(scene, camera)
	}

	function createLight(addTo, minZ, maxZ, initial, final) {
		for (var i = initial; i < final; i++) {
			var ligthColor = randomColor();
			var light = new THREE.PointLight(ligthColor, 1, 10);
			pointLights[i] = light;
			var sphereGeometry = new THREE.SphereGeometry(0.5, 16, 8);
			var sphereMat = new THREE.MeshPhongMaterial({
				color: ligthColor,
				emissive: ligthColor,
				transparent: true,
				opacity: 0.5
			});
			var sphere = new THREE.Mesh(sphereGeometry, sphereMat);
			spheres[i] = sphere;
			addToList(moveA, moveB, moveC, sphere, i);
			light.add(sphere);
			var cameraWidth = camera.getFilmWidth();
			var cameraHeight = camera.getFilmHeight();
			light.position.set(
				getRandomInt((-cameraWidth / 2) - (camera.position.z / 6), cameraWidth + (camera.position.z / 3)),
				getRandomInt((-cameraHeight / 2), cameraHeight),
				getRandomInt(camera.position.z - minZ, camera.position.z - maxZ)
			);
			addTo.add(light);
			lights[i] = light;
		}
	}

	function lightsChangeColor() {
		if (ticOver) {					
			if (actualTime > startTime + colorEllapsedTime + 27500){
				for (var i = 0; i < lights.length; i++) {
					var newColor = randomColor();
					setColor(spheres[i], newColor);
					setLightColor(pointLights[i], newColor);
				}
				colorEllapsedTime += 500;
			}
		}
	}

	function assignLightsMoves() {
		var time = Date.now() * 0.001;
		scene.traverse(function (obj) {
			for (var i = 0; i < lights.length; i++) {
				if (obj == moveA[i]) {
					lightsMovement(time, obj, oriA, multA);
				}
				if (obj == moveB[i]) {
					lightsMovement(time, obj, oriB, multB);
				}
				if (obj == moveC[i]) {
					lightsMovement(time, obj, oriC, multC);
				}
			}
		});
	}

	function setColor(object, color) {
		object.needUpdate = true;
		object.material = new THREE.MeshPhongMaterial({
			color: color,
			emissive: color,
			transparent: true,
			opacity: 0.5
		});
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
		obj.position.x = Math.cos(actualTime * 0.5) * multiplication * orientation;
		obj.position.y = Math.sin(actualTime * 0.5) * multiplication * orientation;
		obj.position.z = Math.cos(actualTime * 0.5) * multiplication * orientation;
	}

	function randomColor() {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}

	function getRandomInt(min, max) {
		var i = Math.floor((Math.random() * max) + min);
		return i;
	}

	function explodeLight(actualCamera) {
		for (var i = 0; i < lights.length; i++) {
			if (explosingLights != []) {
				explosingLights != [];
			}
			if (lights[i].position.z <= actualCamera.position.z-20 &&
				lights[i].position.z >= actualCamera.position.z - 40) {
				explosingLights[explosingLights.length] = lights[i];
			}
		}
		explosingLight = explosingLights[getRandomInt(0, explosingLights.length - 1)];
		
		if (explosingLight != null) {
			parts.push(new ExplodeAnimation(explosingLight.position.x, explosingLight.position.y, explosingLight.position.z));
		}
	}

	function ExplodeAnimation(x, y, z) {
		var geometry = new THREE.Geometry();

		for (i = 0; i < totalObjects; i++) {
			var vertex = new THREE.Vector3();
			vertex.x = x;
			vertex.y = y;
			vertex.z = z;

			geometry.vertices.push(vertex);
			dirs.push({
				x: (Math.random() * movementSpeed) - (movementSpeed / 2),
				y: (Math.random() * movementSpeed) - (movementSpeed / 2),
				z: (Math.random() * movementSpeed) - (movementSpeed / 2)
			});
		}
		var material = new THREE.ParticleBasicMaterial({
			size: objectSize,
			color: colors[Math.round(Math.random() * colors.length)]
		});
		particles = new THREE.ParticleSystem(geometry, material);

		this.object = particles;
		this.status = true;

		scene.add(this.object);
	}

	function explosionUpdate(part) {
		if (part.status == true) {
			for (var i = 0; i < totalObjects; i++) {
				var particle = part.object.geometry.vertices[i]
				particle.y += dirs[i].y;
				particle.x += dirs[i].x;
			}
			part.object.geometry.verticesNeedUpdate = true;
		}
	}

	function resizeAndDestroyParticle() {
		for (var i = 0; i < parts.length; i++) {
			explosionUpdate(parts[i]);
			scene.traverse(function (obj) {
				if (obj === particles) {
					if (particles.material.size > 0.01) {
						particles.material.size -= 0.01;
					}
				}
			});
		}
	}

};
window.onload = init;