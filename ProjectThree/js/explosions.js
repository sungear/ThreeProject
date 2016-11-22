function init() {
	var movementSpeed = 0.1;
	var totalObjects = 200;
	var objectSize = 0.2;
	var sizeRandomness = 0;
	var colors = [0xFF0FFF, 0xCCFF00, 0xFF000F, 0x996600, 0xFFFFFF];
	var dirs = [];
	var parts = [];
	var particles;
	var canExplode = false;
	
	var stratTime = new Date().getTime();
	var nowTime;

	var scene = new THREE.Scene();

	var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(-30, 40, 30);
	camera.lookAt(scene);
	scene.add(camera);

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.getElementById("WebGL-output").appendChild(renderer.domElement);

	
	render();	
	
	
	parts.push(new ExplodeAnimation(0, 0));
	
	function render() {
		requestAnimationFrame(render);	
//		parts.push(new ExplodeAnimation(0, 0));
		for (var i = 0; i < parts.length; i++) {
			update(parts[i]);
			scene.traverse(function (obj) {
				if (obj === particles) {
					if (particles.material.size > 0.01){						
						particles.material.size -= 0.01;						
					}
				}
			});
		}
		
		renderer.render(scene, camera);
	}

	function ExplodeAnimation(x, y) {
		var geometry = new THREE.Geometry();

		for (i = 0; i < totalObjects; i++) {
			var vertex = new THREE.Vector3();
			vertex.x = x;
			vertex.y = y;
			vertex.z = 0;

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

//		this.update = function () {
//			if (this.status == true) {
//				for (var i = 0; i < totalObjects; i++) {
//					var particle = this.object.geometry.vertices[i]
//					particle.y += dirs[i].y;
//					particle.x += dirs[i].x;
//					particle.z += dirs[i].z;
//				}
//				this.object.geometry.verticesNeedUpdate = true;
//			}
//		}
		
		canExplode = false;
	}
	
	function update(part) {
		if (part.status == true) {
			for (var i = 0; i < totalObjects; i++) {
					var particle = part.object.geometry.vertices[i]
					particle.y += dirs[i].y;
					particle.x += dirs[i].x;
					particle.z += dirs[i].z;
				}
				part.object.geometry.verticesNeedUpdate = true;
		}
	}
};
window.onload = init;