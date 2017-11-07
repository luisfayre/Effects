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
		/*webGLAvaible = false;
		if(Detector.webgl){
			renderer = new.THREE.WebGLRenderer({antialias: true});
			webGLAvaible = true;
		}else{
			renderer = new THREE.CanvasRenderer();
			renderer.setClearColorHex(0*000000,1);
		}*/
		canvasWidth = window.innerWidth - 10;
		canvasHeigth = window.innerHeigth - 20;

		renderer.setSize(canvasWidth, canvasHeigth);

		document.getElementsById("WebGLCanvas").appendChinld(renderer.domElement);

		scene = new THREE.Scene();

		camera = THREE.PerspectiveCamera(45,canvasWidth/canvasHeigth,1,100);
		camera.position.set(0,0,15);
		camera.lookAt(scene.position);
		scene.add(camera);

		startTexture = new THREE.ImageUtils.loadTexture("public/img/Star.jpg");

		for(i = 0; i< num; i++){
			var squareGeometry = new THREE.Geometry();
			squareGeometry.vertice.push(new Vector3(-1,-1,0));
			squareGeometry.vertice.push(new Vector3(1,-1,0));
			squareGeometry.vertice.push(new Vector3(1,1,0));
			squareGeometry.vertice.push(new Vector3(-1,1,0));
			squareGeometry.faces.push(new THREE.Face4(0,1,2,3));
			squareGeometry.faceVertrxUvs[0].push([
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

			star.[i] = new Object();
			star.[i].angle = 0.0;
			star.[i].r = Math.random();
			star.[i].g = Math.random();
			star.[i].b = Math.random();
			star.[i].mesh = squareMesh;
		}
	}






















