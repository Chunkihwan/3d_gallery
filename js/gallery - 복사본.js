
$(document).ready(function($) {
    is_mobile = isMobile();
    var _body = $("html, body");
    // _body.stop().scrollTop(0);

    // if(!macChk){
        // jQuery.scrollSpeed(100, 200);
    // }
    // console.log(macChk)

    // TweenMax.set( _body , { scrollTo: { y: 0 ,autoKill:false } ,delay : 0 });
    // TweenMax.set( _body , { scrollTo: { y: 0 ,autoKill:false } ,delay : 1 });

    // soundSetting();
    threeJsinit();

    // TweenMax.from($('.firstPage .mainBg'), 2, { scale : 1.2 ,ease: Expo.easeInOut });
    // $(".resultTextWrap" ).hide(0);
    // TweenMax.set( ".resultTextWrap" , { autoAlpha : 0 ,y: 60 });
    // TweenMax.set( ".resultInfo" , { autoAlpha : 0});

    // var _input = $('#numberInput');
    // var searchText = "";

    document.addEventListener("keydown", function(event) {
        if(event.which == 13){ 
            // if(searchText == _input.val()) return false;
            // searchText = _input.val();
            // $('.addBtn').trigger("click");
        }
    })
    
    // $('.addBtn').on("click", function(){
    //     $('body').addClass("view_cont");
    //     $('.label').hide(0);
    //     var num = _input.val();
    //     var realNum = num * 52; // 52주
    //     // console.log("realNum : " + realNum)

    //     if(num == "") {
    //         realNum = 0;
    //         _input.val(0);
    //     }

    //     cylinderGroup.children.forEach(function(child){
    //         var item = child;
    //         if(item.removeChk == "remove") {
    //             cylinderGroup.remove(item);
    //         }
    //     });

    //     addCylinderFunc( Math.min( realNum , 800) , (HEIGHT) , "random", "remove");
        
    //     // console.log(_html)
    //     $('.resultTextWrap').addClass("active");
    //     $(".resultTextWrap" ).show(0);

    //     TweenMax.to( ".mainPage" , 2, {
    //         // css : {"padding" : "200px 0 70px", height : $('.mainPage .contWrap').height() }
    //         css : {height : $('.mainPage .contWrap').height() }
    //         ,ease: Expo.easeInOut
    //     });

    //     $('.resultTextWrap p:eq(0) strong').text( numberWithCommas(realNum) );

    //     if(realNum != 0) {
    //         var empty = changeHangul( String(realNum * 51778544)   );
    //         $('.resultTextWrap p:eq(1) strong').text( empty.substring(0, empty.indexOf("억")+1 ) );

    //         var empty2= changeHangul( String(realNum * 7644965995)   );
    //         $('.resultTextWrap p:eq(2) strong').text( empty2.substring(0, empty2.indexOf("억")+1 ) );
    //     }else{
    //         $('.resultTextWrap p:eq(1) strong').text( 0 );
    //         $('.resultTextWrap p:eq(2) strong').text( 0 );
    //     }

    //     // TweenMax.set( ".resultTextWrap" , { autoAlpha : 0 ,y: 60 });

    //     TweenMax.to( ".resultTextWrap" , 2, {
    //         autoAlpha : 1
    //         ,y: 0
    //         ,ease: Expo.easeInOut
    //     });
    //     TweenMax.to( ".resultInfo" , 2, {
    //         autoAlpha : 1
    //         ,ease: Expo.easeInOut
    //     });
        
    //     vibrateStart([500]);
    //     return false;
    // })
    // $(".arr_down").on("click", function(e){
    //     TweenMax.to( $(window) , 1.5, {
    //         scrollTo: { y: $('.mainPage').offset().top  ,autoKill:false } ,ease: Expo.easeInOut
    //     });
    // });

    // $(".arr_down").on("click", function(e){
    //     e.stopPropagation();
    //     if(!is_mobile) document.getElementById("seaSound").currentTime = 0;
    //     document.getElementById("seaSound").play();
    // });
    // scrollAction();
    // $(window).on('scroll', scrollAction).trigger("scroll");
    stageResize();
    // $('.mainPage').height(HEIGHT);

    // setTimeout(function(){ 
    //     stageResize();
    //     $('.mainPage').height(HEIGHT);
    // }, 800);
});

var audio;

function soundSetting(){
    audio = document.getElementById('seaSound');
    audio.play();
    windowFocused();
    document.addEventListener('visibilitychange', _onChange);
}

function _onChange(){
    if($('#seaSound').hasClass("playing")) {
        windowBlurred();
    }else{
        windowFocused();
    }
}


function windowBlurred()
{
    audio.pause();
    $('#seaSound').removeClass("playing");
}

function windowFocused()
{
    // console.log('focus');
    audio.play();
    $('#seaSound').addClass("playing");
}


    
var is_mobile;
// var currentPage = location.host;
var _apiurl = "./data/"

// if(currentPage == "joongang.joins.com" || currentPage == "news.joins.com" || currentPage == "mnews.joins.com"){
//     _apiurl = "https://apis.joins.com/pagecall/?u=https://joongang.joins.com/special/2018/9999_deepsea/data/";
// }


var renderer, scene, camera, stats;   
var mouseX = 0, mouseY = 0;
var windowHalfX, windowHalfY;
var cylinderGroup = new THREE.Object3D();
var light1;
var clock = new THREE.Clock();

function threeJsinit() 
{
    // var seaColor = 0x0d2061;
    var seaColor = 0x002159;
    renderer = window.WebGLRenderingContext ? new THREE.WebGLRenderer({ antialias: true , alpha : true }) : new THREE.CanvasRenderer(); 
    // renderer = new THREE.WebGLRenderer( { } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( WIDTH, HEIGHT );
    renderer.setClearColor(seaColor, 1);
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
                
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = 0;
    renderer.domElement.style.margin = "0 auto";
    // renderer.shadowMap.enabled = true;
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    var viewport = document.getElementById('canvasWrap');
    viewport.appendChild(renderer.domElement);

    // stats = new Stats();
	// viewport.appendChild( stats.dom );

    camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, .5, WIDTH * 1.5); 
    scene = new THREE.Scene();
    // scene.fog = new THREE.Fog( seaColor, 0.001 , !is_mobile ? HEIGHT : WIDTH );
    // scene.fog = new THREE.Fog( seaColor, 0.005 , !is_mobile ? WIDTH/1.6 : WIDTH );
    // scene.fog = new THREE.FogExp2( seaColor, 5 );

    // var ambient = new THREE.AmbientLight( 0xffffff, .8 );
    // scene.add( ambient );

    // var light = new THREE.DirectionalLight(0xffffff,.5);
    // light.position.set(5,3,5);
    // scene.add(light);

    // //조명2
    // var decay = 4.0;
    // var c1 = 0xffffff;
    // var sphere = new THREE.SphereBufferGeometry( 100, 0, 800 );
    // light1 = new THREE.PointLight( c1, 1  , WIDTH*2 , decay );
    // // light1.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: c1 } ) ) );
    // scene.add( light1 );
    



    // addCylinderFunc( !is_mobile ? WIDTH/1.3 : 500 , WIDTH, "black", "none");

    //카메라
    // controls = new THREE.TrackballControls( camera , renderer.domElement );

    // if(is_mobile){
        // controls = new THREE.OrbitControls( camera , renderer.domElement );
    // // }else{
        controls = new THREE.OrbitControls( camera );
    // // }
    // controls.autoRotate = false;
    // controls.autoRotateSpeed = .5;
    // controls.noZoom = true;
    // controls.noKeys = true;
    
    // controls.zoomSpeed = 1.2;
    // controls.panSpeed = 0.8;

    // controls.update();
    // controls.minPolarAngle = Math.PI / 2.5;
    // controls.maxPolarAngle = Math.PI / 1.9;

    //  horizontally angle control
    // controls.minAzimuthAngle = -Math.PI / 2;
    // controls.maxAzimuthAngle = Math.PI / 2;


    // controls = new THREE.FlyControls( camera );
    // controls.movementSpeed = 100;
    // controls.rollSpeed = Math.PI / 40;

    var axes = new THREE.AxesHelper(1000);
    scene.add(axes)

    var gridHelper = new THREE.GridHelper( 1000, 20 );
    scene.add( gridHelper );


    // if(is_mobile){
    //     cameraZ_first = cameraZ_first/3;
    //     cameraZ = cameraZ/3;
    // }

    // camera.position.x = 100;
    // camera.position.y = -100;
    // camera.position.z = cameraZ_first;
    // camera.zoom = 100;
    // cameraMoveSpeed
    // TweenMax.to(camera.position, 0, { 
    //     x: 0
    //     ,y: 0
    //     // ,z: 800
    //     ,ease: Expo.easeInOut
    //     // ,delay : cameraMoveDelay
    // });
    render();
}

// var colorArr = [0x085e3f, 0xff4d00, 0x902b37, 0x861999, 0x005179, 0x7c604e, 0xac143a, 0x000000, 0xffffff, 0xecdc2d, 0x2f84b5, 0xc1392f, 0x309a3f];
// var colorArr = [0x1b6021,0xac143a, 0x227538];

// function addCylinderFunc(num, yNum, color, removeChk)
// {
//     var geometry = new THREE.CylinderGeometry(1,1, 125 ,10,15, true);
//     var forNum = !is_mobile ? num : num/2;
//     // if(yNum == undefined){
//     //     yNum = WIDTH;
//     // }

//     for ( var i = 0; i < forNum; i ++ ) {
//         // var _color = new THREE.Color( Math.random()*1, Math.random()*1, Math.random()*1 );
//         var _color = (color == "random") ? new THREE.Color( Math.random()*1, Math.random()*1, Math.random()*1 ) : color;
//         // var _color =  (color == "random") ? colorArr[Math.ceil(Math.random()* (colorArr.length-1)   )] : color;
//         // var objectMaterial = new THREE.MeshStandardMaterial( { color: _color, roughness: 0.5, metalness: 1.0 } );
//         var objectMaterial = new THREE.MeshToonMaterial( { 
//             color: _color
//             ,side:THREE.DoubleSide
//             ,transparent: true
//             ,opacity: .8
//             // ,roughness: 0.5
//             // ,metalness: 1.0 
//         } ); //toon 스타일로 
//         var cylinder = new THREE.Mesh( geometry, objectMaterial );
//         cylinder.moveVal = !is_mobile ? Math.random() * .3 + .2 : Math.random() * .2 + .2 ;

//         // var firstYnum = (removeChk == "remove") ? Math.round(Math.random() * HEIGHT + HEIGHT) : Math.round(Math.random() * yNum )
//         var firstYnum = Math.round(Math.random() * yNum) ;
//         cylinder.firstYnum = firstYnum;
//         cylinder.removeChk = removeChk;
//         // cylinder.position.x = 0;
//         // cylinder.position.y = -1000;
//         // cylinder.position.z = 10000;
//         cylinder.position.x = Math.round(Math.random() * WIDTH*1.5 - WIDTH/1.5);
//         // cylinder.position.y = (removeChk == "remove" ? firstYnum : firstYnum + 500);
//         if(removeChk != "remove"){
//             cylinder.position.y = firstYnum;
//         }else{
//             cylinder.position.y = firstYnum;
//             TweenMax.from( cylinder.position , Math.random()*2+5 , {
//                 y : HEIGHT 
//                 ,delay : Math.random() * 2
//                 ,ease: Expo.easeOut
//             });
//             // console.log(cylinder.material[0])
//             TweenMax.from( cylinder.material  , 1 , {
//                 opacity : 0
//                 ,delay : Math.random() * 2
//             });
//         }
//         cylinder.position.z = Math.round(Math.random() * WIDTH*1.5 - WIDTH/1.5);
//         cylinder.rotation.set(Math.round(Math.random()*360), Math.round(Math.random()*360), Math.round(Math.random()*360));
//         // cylinder.name = "item_"+ scene.children.length;
//         // cylinder.name = "item_"+ i;

//         if(is_mobile) {
//             cylinder.scale.set(.3,.3,.3);
//         }
//         // cylinder.matrixAutoUpdate = false;
//         // cylinder.updateMatrix();
//         // cylinderGroup.push(cylinder);
//         cylinderGroup.add(cylinder);
//         // scene.add( cylinder );
//     }
//     scene.add( cylinderGroup );
// }

// function removeObjFunc(object){
//     scene.remove(object);
// }

// var lFollowX, lFollowY;

// document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// function onDocumentMouseMove ( event ) {
//     mouseX = (event.clientX - windowHalfX );
//     mouseY = (event.clientY - windowHalfY );

//     // lFollowX = mouseX; 
//     // lFollowY = mouseY ;
// }

function render() {

    // stats.update();
    // scene.position.x += ((mouseX ) - camera.position.x) * .002;
    // scene.position.y -= ((mouseY ) - camera.position.y) * .003;

    // cylinderGroup.rotation.x -= ((mouseX ) - cylinderGroup.rotation.x) * .00002;
    // cylinderGroup.rotation.y -= ((mouseY ) - cylinderGroup.rotation.y) * .00002;
    // var time = Date.now() * 0.000005;

    // var hNum = !is_mobile ? HEIGHT*2 : HEIGHT;

    // cylinderGroup.children.forEach(function(child){
    //     var item = child;
    //     if(item.position.y <= -hNum){
    //         if(item.removeChk == "remove") {
    //             cylinderGroup.remove(item);
    //         }else{
    //             item.position.y = hNum;
    //             // console.log(item.position.y)
    //         }
    //         // item.position.y = item.firstYnum + HEIGHT;
    //     }else{

    //         item.position.y -= item.moveVal;
    //         item.rotation.x += .001;
    //         item.rotation.y += .002;
    //     }
    // });

    // console.log(clock.getDelta())
    // camera.lookAt( scene.position );
    // console.log(cylinderGroup.length)
    // controls.update( clock.getDelta() );
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
    requestAnimationFrame( render );
}

var firstBool = true;

function scrollAction() {
    scrollTop = $(window).scrollTop();
    // setTopBtn();

    // if(scrollTop > 300 && firstBool) {
    //     firstBool = false;
    //     threeJsinit();
    // }
	// if(scrollTop < HEIGHT) {
    //     var tNum0 = (scrollTop * .2);
    //     var tNum1 = 1-(scrollTop * .002);
    //     var tNum2 = (scrollTop * .3);
    //     // console.log(tNum2 )

    //     if(!is_mobile){
    //         TweenMax.set($('.firstPage .mainBg'), { 
    //             z: tNum2
    //             ,autoAlpha: tNum1
    //         });
    //         TweenMax.set($('.firstPage '), { 
    //             autoAlpha: tNum1
    //         });
    //     }else {
    //         TweenMax.set($('.firstPage .mainBg'), { 
    //             y: -tNum2
    //             ,autoAlpha: tNum1
    //         });
    //         TweenMax.set($('.firstPage '), { 
    //             autoAlpha: tNum1 * 1.2
    //         });
    //     }
    // }else{
    //     TweenMax.set($('.firstPage .mainBg'), { 
    //         z: 0
    //         ,autoAlpha: 0
    //     });
    //     TweenMax.set($('.firstPage '), { 
    //         autoAlpha: 0
    //     }); 
    // }
    // // console.log(tNum1)
    // var tNumC = (scrollTop * .2);
    // camera.position.z = Math.max(( !is_mobile ? (HEIGHT - tNumC) : (WIDTH - scrollTop * .08)), 0);
    // console.log(camera.position.z)

}

// function setTopBtn() {
// 	// 탑 버튼 Show/Hide
// 	var $btnTop = $(".btn_top"),
// 			_offset = -150;
// 	if($btnTop.hasClass("active") && scrollTop < $(".mainPage").offset().top + _offset) {
// 			$btnTop.removeClass("active");
// 	} else if(!$btnTop.hasClass("active") && scrollTop >= $(".mainPage").offset().top + _offset) {
// 			$btnTop.addClass("active");
// 	}

// 	if(!$btnTop.hasClass("fixed") && scrollTop < $("#bottom").offset().top - $(window).height() + 50) {
// 			$btnTop.addClass("fixed");
// 	} else if($btnTop.hasClass("fixed") && scrollTop >= $("#bottom").offset().top - $(window).height() + 50 ) {
// 			$btnTop.removeClass("fixed");
// 	}

// 	$btnTop.on("click", function(){
//         // $("html, body").stop().animate({scrollTop : 0}, 1500, "easeInOutCubic");
//         TweenMax.to( $(window) , 2, {
//             scrollTo: { y: 0 ,autoKill:false } ,ease: Expo.easeInOut
//         });
// 	});
// }

var scrollTop;
var WIDTH , HEIGHT;

function stageResize() {
    WIDTH = window.innerWidth;
    HEIGHT = window.innerHeight;
    //console.log(WIDTH)
    
    windowHalfX = WIDTH /2;
    windowHalfY = HEIGHT /2;
    
    // var calcW = WIDTH * (9 / 16);
    
    // if(!is_mobile){
    //     $('.firstPage').height(HEIGHT * 1.07);
    //     calcW = 700 * (9 / 16);
    //     // $('.mainPage').height(HEIGHT);
    // }else{
    //     $('.firstPage').height(HEIGHT*1.2); //배경 이미지 때문에
    //     $("iframe").css("width", WIDTH);
    // }
    
    // // $('.mainPage').height(HEIGHT);
    // $("iframe").css("height", calcW);

    if(renderer != undefined){
        camera.updateProjectionMatrix();
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
    }
    // scrollAction();
}
    
if (window.attachEvent) {
    window.attachEvent("onresize", function () {
        stageResize();
    });
} else {
    window.addEventListener("resize", function () {
        stageResize();
    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

var vibrateStart = function(arr){
    if ("vibrate" in navigator) {
        navigator.vibrate(arr)
    }
}




function isMobile() {
    var mobileKeyWords = new Array('Android', 'iPhone', 'iPod', 'BlackBerry', 'Windows CE', 'SAMSUNG', 'LG', 'MOT', 'SonyEricsson');
    for (var info in mobileKeyWords) {
        if (navigator.userAgent.match(mobileKeyWords[info]) != null) {
            return true;
        }
    }
    return false;
}


function changeHangul(obj) {
    // var hanA = new Array("","일","이","삼","사","오","육","칠","팔","구","십");
    // var danA = new Array("","십","백","천","","십","백","천","","십","백","천");
    var num = obj;
    var result = "";
    // if(isNaN(num)) {
        for(i=0; i<num.length; i++) {
            str = "";
            var n = num.charAt(num.length-(i+1));
            // console.log(num.charAt(n))
            // han = hanA[num.charAt(num.length-(i+1))];

            // if(han != "") str = han+danA[i];
            // if(n != "") str = n+danA[i];
            str = n;
            if(i == 4) str += "만 ";
            if(i == 8) str += "억 ";
            if(i == 12) str += "조 ";
            result = str + result;
        }
        // console.log(result)
    // }
    return result;
}

function maxLengthCheck(object){
    if (object.value.length > object.maxLength){
        object.value = object.value.slice(0, object.maxLength);
    }    
}