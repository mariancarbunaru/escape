import * as THREE from 'resources/threejs/r122/build/three.module.js';
import {degToRad, 
		clearThree, 
		resizeRendererToDisplaySize, 
		setSounds, 
		playSound, 
		dontShowOverlay, 
		showOverlay
	} from 'surse/utils.js';
import { renderer, camera, scene, listener} from 'surse/proiect.js';
//import { playLevel1 } from 'http://localhost:8080/surse/v5/level1.js';
import {player, pathSounds, l0Texture, l0Buttons, l0StartButton, l0StoryButton, l0Picture1, l0Picture2} from 'surse/header.js';

'use strict'

let level0Over = false;
let sters = false;
let click = false;
let tellStory = false;
let running = true;
let clickStart = [];
let clickStory = [];


function playLevel0() {
  camera.position.set(0, 0, 8);

  dontShowOverlay("storyOverlay");
  dontShowOverlay("controlsOverlay");
  
  document.body.addEventListener( 'keydown', onKeyDown, false );
  document.body.appendChild( renderer.domElement );
  document.body.addEventListener('mousedown', onMouseDown, false );

  let resourcesLoaded = false;
  const loadingManager = new THREE.LoadingManager();

  loadingManager.onLoad = function() {
  	resourcesLoaded = true;
  }

  //this is for light
  let color = 0xffffff;
  const intensity = 1;
  let light = new THREE.AmbientLight(color, intensity);
  scene.add(light);

  //click on objects
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  // create a global audio source
  const ambient0sound = new THREE.Audio( listener );
  setSounds(ambient0sound, pathSounds.ambient0);

  const loader = new THREE.TextureLoader(loadingManager);
  scene.background = loader.load(l0Texture);

  const pictureSide = 3;
  const pictureGeometry = new THREE.PlaneGeometry( 1.5*pictureSide, pictureSide );

  const picture1Material = new THREE.MeshPhongMaterial({ map: loader.load(l0Picture1)});
  const p1 = new THREE.Mesh(pictureGeometry, picture1Material);
  p1.position.set(-7, -2, 0.005);
  p1.rotateZ(degToRad(15));
  p1.material.transparent = true;
  p1.material.opacity = 0.5;
  scene.add(p1);

  const picture2Material = new THREE.MeshPhongMaterial({ map: loader.load(l0Picture2)});
  const p2 = new THREE.Mesh(pictureGeometry, picture2Material);
  p2.position.set(7, -2, 0.005);
  p2.rotateZ(degToRad(-15));
  p2.material.transparent = true;
  p2.material.opacity = 0.5;
  scene.add(p2);

  const side = 1;
  const pgeometry = new THREE.PlaneGeometry( 2*side, side );
  const buttonMaterial = new THREE.MeshPhongMaterial({ map: loader.load(l0Buttons)});
  const cgeometry = new THREE.CircleGeometry( side/2, 32 );

  const startButton = new THREE.Group();
  startButton.position.y = -2;
  scene.add(startButton);

  const startButtonMaterial = new THREE.MeshPhongMaterial({ map: loader.load(l0StartButton)});
  const plane1 = new THREE.Mesh( pgeometry, startButtonMaterial );
  clickStart.push(plane1);
  startButton.add(plane1);

  const circle1 = new THREE.Mesh(cgeometry, buttonMaterial);
  circle1.position.set(side, 0, -0.005);
  clickStart.push(circle1);
  startButton.add(circle1);

  const circle2 = new THREE.Mesh(cgeometry, buttonMaterial);
  circle2.position.set(-side, 0, -0.005);
  clickStart.push(circle2);
  startButton.add(circle2);

  const storyButton = new THREE.Group();
  storyButton.position.y = -4;
  scene.add(storyButton);

  const storyButtonMaterial = new THREE.MeshPhongMaterial({ map: loader.load(l0StoryButton)});
  const plane2 = new THREE.Mesh( pgeometry, storyButtonMaterial );
  clickStory.push(plane2);
  storyButton.add(plane2);

  const c1 = new THREE.Mesh(cgeometry, buttonMaterial);
  c1.position.set(side, 0, -0.005);
  clickStory.push(c1);
  storyButton.add(c1);

  const c2 = new THREE.Mesh(cgeometry, buttonMaterial);
  c2.position.set(-side, 0, -0.005);
  clickStory.push(c2);
  storyButton.add(c2);

  //createText();
  animate();

  function animate(time) {
    time *= 0.001;  // convert time to seconds

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (resourcesLoaded) {
    	dontShowOverlay("loadingOverlay");
    }

    if (running) {
      renderer.render(scene, camera);
    }

    if (tellStory) {
    	showOverlay("storyOverlay");
    }

    if (click) {
      level0Over = true;
      click = false;
      ambient0sound.stop(); 
      document.body.removeEventListener( 'mousedown', onMouseDown );
      document.body.removeEventListener( 'keydown', onKeyDown, false );
    	alert("Let's go to level 1 now!");
    }

    requestAnimationFrame(animate);

    if (level0Over) {
      clearThree(scene);
      sters = true;
      level0Over = false;
      click = false;
    } 

    if (sters) {
      sters = false;
      scene.background = loader.load(0xffffff);
      running = false;
      camera.position.set(0, 0, 0);
      playLevel1();
    }
  }

  //text
//     function createText() {
//       const loader = new THREE.FontLoader();

//       loader.load( 'http://localhost:8080/resources/threejs/fonts/helvetiker_regular.typeface.json', function ( font ) {
//         const geometry = new THREE.TextGeometry( 'E V A D A R E A', {
//           font: font,
//           size: 1.5,
//           height: 0.02,
//           curveSegments: 25,
//           bevelEnabled: true,
//           bevelThickness: 0.04,
//           bevelSize: 0.1,
//           bevelSegments: 5,
//         } );
//         const material = new THREE.MeshPhongMaterial({color: 0x660000});
//         const mytext = new THREE.Mesh(geometry, material);
//         mytext.position.set(-7, 2, 0.05);
//         mytext.rotateX(degToRad(45));
//         scene.add(mytext);
//       } );
//     }

  function onMouseDown(event) {
    mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
    mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );

    let startIntersects =  [ raycaster.intersectObjects( clickStart )
    ];

    if (startIntersects[0].length > 0) {
      click = true;
    }

    let storyIntersects =  [ raycaster.intersectObjects( clickStory )
    ];

    if (storyIntersects[0].length > 0) {
      tellStory = true;
    }

  }

    function onKeyDown() {
      switch( event.keyCode ) {
        case 27: // esc
        	tellStory = false;
        	dontShowOverlay("storyOverlay");
          	break;
        }
      }
}//end playLevel0

export { playLevel0 , level0Over}
