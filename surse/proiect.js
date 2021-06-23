import * as THREE from 'resources/threejs/r122/build/three.module.js';
import { playLevel0, level0Over } from 'surse/level0.js';
// import { playLevel1, level1Over } from 'http://localhost:8080/surse/v5/level1.js';
// import { playLevel2, level2Over} from 'http://localhost:8080/surse/v5/level2.js';
// import { playLevel3, level3Over} from 'http://localhost:8080/surse/v5/level3.js';


'use strict';

const canvas = document.querySelector('#glCanvas');
const renderer = new THREE.WebGLRenderer({canvas});
const scene = new THREE.Scene();

const fov = 75;
const aspect = 2; //canvas default 
const near = 0.01;
const far = 400;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
scene.add(camera);

// create an AudioListener and add it to the camera
const listener = new THREE.AudioListener();
camera.add( listener );

main();

function main() {
   if (!level0Over[0]) {
     playLevel0();
   }
}

export { canvas, camera, scene, renderer, listener }
