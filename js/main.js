window.onload= function(){

	var scene = new THREE.Scene();
	var camera =  new THREE.PerspectiveCamera( 65, window.innerWidth/window.innerHeight, 0.1, 10000 );

	var render = new THREE.WebGLRenderer({ antialias:true });
	render.setSize(window.innerWidth, window.innerHeight);
	render.setClearColor(0xFFFFFF);
	document.body.appendChild(render.domElement);

	camera.position.z = 300;

	var light = new THREE.DirectionalLight("rgb(233, 53, 13)",1);
	scene.add(light)


	var amColor="rgb(200, 219, 231)";
	var amLight= new THREE.AmbientLight(amColor);
	scene.add(amLight)




	var manager = new THREE.LoadingManager();
	var loader = new THREE.ImageLoader(manager);

	var textureBody = new THREE.Texture();

	// loader.load('model/')

	var meshes =[];
	var meshes2=[]

	var objLoader = new THREE.OBJLoader();
	objLoader.load('iron_man/IronMan.obj',function(object){
		console.log(object);
		object.traverse( function(child){
			if(child instanceof THREE.Mesh){
				meshes2.push(child);
			}
		});

		meshes2.forEach(function(elem,index){
			if(index<200){
				elem.position.y = -10;
				elem.position.z = -200;
				elem.position.x = 150;
				elem.rotation.y=0;
				// elem.material=new THREE.MeshNormalMaterial();
				elem.material=new THREE.MeshPhongMaterial({
					color:'rgb(255, 51, 51)'
				});
				scene.add(elem);
			}
		})
	});
	objLoader.load('iron_man/IronMan.obj',function(object){
		console.log(object);
		object.traverse( function(child){
			if(child instanceof THREE.Mesh){
				meshes.push(child);
			}
		});
		meshes.forEach(function(elem,index){
			if(index<200){
				elem.position.y = -120;
				elem.rotation.y=1;
				elem.material=new THREE.MeshNormalMaterial();
				// elem.material=new THREE.MeshPhongMaterial({
				// 	color:'rgb(255, 51, 51)'
				// });
				scene.add(elem);
			}
		})
	});
	 function loop(){
		meshes.forEach(function(elem){
			elem.rotation.y+=0.01;

		})
		meshes2.forEach(function(elem){
			elem.rotation.x+=0.01;
		})
	}


	var controls = new THREE.TrackballControls(camera);
	controls.rotateSpeed = 1.0;
	controls.zoomSpeed = 1.2;
	controls.panSpeed = 0.8;

	var rendering= function () {
		requestAnimationFrame(rendering);
		loop();
		controls.update();
		render.render(scene, camera);
	}

	rendering();

}
