	var scene;
	var camera;
	var startTexture;
	var cubeMesh;
	var num = 32;
	var star = new Array(num);
	var spin = 0;

	initializeScene();

	animeteScene();

	function initializeScene() {
		webGLAvaible = false;
		
			renderer = new THREE.WebGLRenderer({antialias: true});
			webGLAvaible = true;
		
			renderer = new THREE.CanvasRenderer();
			renderer.setClearColorHex(0x000000, 1);
	
		canvasWidth = window.innerWidth - 10;
		canvasHeigth = window.innerHeigth - 20;

		renderer.setSize(canvasWidth, canvasHeigth);

		document.getElementById("WebGLCanvas").appendChild(renderer.domElement);

		scene = new THREE.Scene();

		camera = new THREE.PerspectiveCamera(45,canvasWidth/canvasHeigth,1,100);
		camera.position.set(0,0,15);
		camera.lookAt(scene.position);
		scene.add(camera);

		startTexture = new THREE.ImageUtils.loadTexture("public/Star.jpg");

		for(i = 0; i< num; i++){
			var squareGeometry = new THREE.Geometry();
			squareGeometry.vertices.push(new THREE.Vector3(-1,-1,0));
			squareGeometry.vertices.push(new THREE.Vector3(1,-1,0));
			squareGeometry.vertices.push(new THREE.Vector3(1,1,0));
			squareGeometry.vertices.push(new THREE.Vector3(-1,1,0));
			squareGeometry.faces.push(new THREE.Face4(0,1,2,3));
			squareGeometry.faceVertexUvs[0].push([
				new THREE.UV(0,0,0.0),
				new THREE.UV(1,0,0.0),
				new THREE.UV(0,0,1.0),
				new THREE.UV(0,0,1.0)
				]);

			var squareMaterial = new THREE.MeshBasicMateria({
				map: startTexture,
				transparent: true,
				combine: THREE.MixOperation,
				blending: THREE.AdditiveBlending,
				color: 0xFFFFF
			});

			var squareMesh = THREE.Mesh(squareGeometry, squareMaterial);
			squareMesh.position.set(0.0,0.0,0.0);

			scene.add(squareMesh);

			star[i] = new Object();
			star[i].angle = 0.0;
			star[i].r = Math.random();
			star[i].g = Math.random();
			star[i].b = Math.random();
			star[i].mesh = squareMesh;
		}

		function animeteScene(){
			requestAnimationFrame(animeteScene);
			for(i=0; i<num; i++){
				spin += Math.PI * 2 /num;

				if(spin >(Math.PI*2)){
					spin = 0;
					star[i].angle += i/num;
					star[i].dist -=0.01;

					if(star[i].dist < 0.0){
						star[i].dist +=0.5;
						star[i].r = Math.random();
						star[i].g = Math.random();
						star[i].b = Math.random();
						
					}
				}
				star[i].mesh.matrix.setPosition(new THREE.Vector3(star[i].dist,0,0));
				var mr = THREE.Matrix4();
				mr.makeRotationZ(spin);
				star[i].mesh.applyMatrix(mx);

				star[i].mesh.material.color.setRGB(star[i].r, star[i].g,star[i].b);
			}
			rendererScene();
		}

		function rendererScene(){
			animeteScene();
		}
	}






















