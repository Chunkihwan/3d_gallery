var renderer, scene, camera, controls;
var WIDTH, HEIGHT;
var boxMesh,spotLight;
var boxGroup = new THREE.Object3D();
var imageLoader = new THREE.TextureLoader();	

window.onload = function(){
    stageResize();
    init();
}

function init(){
	renderer = new THREE.WebGLRenderer({ antialias : true });
	renderer.setSize( WIDTH, HEIGHT );
	renderer.setClearColor(0x000000);
	document.getElementById('canvasWrap').appendChild( renderer.domElement );
    
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
                
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.margin = "0 auto";
    
	camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, .1, 1000); 
    camera.position.set(0 , 0, 50);
	
	scene = new THREE.Scene();
	controls = new THREE.OrbitControls(camera, renderer.domElement);

    controls.autoRotate = true;
    controls.autoRotateSpeed = .5;
    controls.enableZoom = true;
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.screenSpacePanning = false;
    controls.minDistance = 8;
    controls.maxDistance = 70;
    controls.update();

	var light = new THREE.HemisphereLight( 0xc0daf5 , 0xc0daf5 , .3 );
	light.position.set( -50, 0, -50 );
	scene.add( light );

	spotLight = new THREE.SpotLight( 0xffffff );
	spotLight.position.set( 60, 60, 60 );
	scene.add( spotLight );

    spotLight2 = new THREE.SpotLight( 0xffffff );
	spotLight2.position.set( -60, 60, -60 );
    scene.add( spotLight2 );
    
    eventSet();
    addCubeFunc();
	render();
}



function eventSet(){
    
    var _prevBtn = document.querySelector('.prev_btn');
    var _nextBtn = document.querySelector('.next_btn');
    
    _prevBtn.addEventListener("click", function(){
        if(pageNum > 0){
            pageNum --;
        }else{
            pageNum = imageArr.length-1;
        }
        addCubeFunc();
    })

    _nextBtn.addEventListener("click", function(){
        if(pageNum < imageArr.length-1){
            pageNum ++;
        }else{
            pageNum = 0;
        }
        addCubeFunc();
    })
}

var firstChk = true;
var pageNum = 0;
var imageArr = ["./image/img0.JPG","./image/img1.JPG","./image/img2.JPG","./image/img3.JPG"];
var forNum = 56;
var xlenght  = 7;
var yNum = 0;
var size = 6;    
var plusNum = 1;
var typeArr= [];
typeArr[0] = [false, false, 85, false];
typeArr[1] = [false, true, 45, true];
typeArr[2] = [false, true, 45, true];
typeArr[3] = [true, false, 65, false];
//회전 , z값, fov, 사이즈

function addCubeFunc(){
    
    boxGroup.position.x = -( (xlenght-1) * (size+2))/2
    boxGroup.position.y = (xlenght * (size+2))/2
    renderer.setClearColor( Math.random() * 0xffffff );
    yNum = 1;
    var _material  = new THREE.MeshPhongMaterial({ color:Math.random() * 0xffffff });
    
    imageLoader.load(imageArr[pageNum], function(data){
        _material = new THREE.MeshPhongMaterial({ map : data })
        for ( var i = 0; i < boxGroup.children.length; i ++ ) {
            boxMesh = boxGroup.children[i];
            boxMesh.material = _material;

            var repeatNum = Math.ceil(Math.random()*3);
            data.repeat.set( repeatNum, repeatNum );
            data.wrapS = THREE.RepeatWrapping;
            data.wrapT = THREE.RepeatWrapping;

            // transformUv 
        }
    })
    var type = typeArr[Math.round(Math.random()*(typeArr.length-1))];

    for ( var i = 0; i < forNum; i ++ ) {
        if(firstChk) {
            var geometry = new THREE.BoxBufferGeometry( size, size, size );
            boxMesh = new THREE.Mesh( geometry, _material );
            boxMesh.castShadow = true;
            boxMesh.receiveShadow = true;
            
            boxGroup.add( boxMesh );
            scene.add( boxGroup );
        }else{
            boxMesh = boxGroup.children[i];
            boxMesh.material = _material;
        }
        boxMesh.rnum = type[0] == true ? (Math.random() * 0.01)+0.005  : 0;
        var sizeNum = type[3] == true ? (Math.random() * 1)  : 1;
        TweenMax.to( boxMesh.scale , Math.random()*plusNum+1 , {
            x : sizeNum
            ,y : sizeNum
            ,z : sizeNum
            ,delay : Math.random() * 1
            ,ease: Power2.easeInOut
        });

        TweenMax.to( boxMesh.rotation , Math.random()*plusNum+1 , {
            x : boxMesh.rnum
            ,y : boxMesh.rnum
            ,z : boxMesh.rnum
            ,delay : Math.random() * 1
            ,ease: Power2.easeInOut
        });

        TweenMax.to( boxMesh.position , firstChk ? 0 : Math.random()*plusNum+.5 , {
            x : (i%xlenght) * (size+plusNum)
            ,y : -(yNum * (size+plusNum))
            ,z : type[1] == true ? Math.round((Math.random() * 50) - 25) : 0
            ,delay : firstChk ? 0 : Math.random() * 1
            ,ease: Power2.easeInOut
        });

        if(i%xlenght == xlenght-1) yNum ++;
    }
    firstChk = false;

    TweenMax.to(camera, 5, { 
        fov:  typeArr[pageNum][2]
        ,ease: Expo.easeOut
        ,onUpdate : function(){
            camera.updateProjectionMatrix();
        }
    });
}


function render() {
    camera.lookAt( scene.position );

    boxGroup.children.forEach(function(child){
        var item = child;
        var rnum = item.rnum;
        item.rotation.y += rnum;
        item.rotation.x += rnum;
        item.rotation.z += rnum;
    });
    
    controls.update();
	camera.updateProjectionMatrix();
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}

window.addEventListener( 'resize', stageResize );

function stageResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
	
    if(renderer != undefined){
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
	    camera.updateProjectionMatrix();
    }
}
