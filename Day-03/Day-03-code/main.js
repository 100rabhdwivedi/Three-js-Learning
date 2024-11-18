import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//first task Load a brick wall texture into a plane geometry and add lights for realism

 /* function first_task(){
 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);


const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Intensity 2
scene.add(ambientLight);





const textureLoader = new THREE.TextureLoader();
let text = textureLoader.load('./red_brick.webp');
text.colorSpace =  THREE.SRGBColorSpace;
text.wrapS = THREE.RepeatWrapping;
text.wrapT = THREE.RepeatWrapping;
text.repeat.set(8,8);


const geometry = new THREE.PlaneGeometry(5,5,20,20)
const material = new THREE.MeshPhysicalMaterial({map:text, side: THREE.DoubleSide,
});
const box = new THREE.Mesh(geometry,material);



scene.add(box)

camera.position.z = 5;

const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({canvas,antialias: true})
renderer.setSize(window.innerWidth,window.innerHeight)


const controls = new OrbitControls( camera, renderer.domElement );

const clock = new THREE.Clock();


function animate(){
  window.requestAnimationFrame(animate);
  // box.rotation.y = clock.getElapsedTime() * 2;
  controls.update();

  renderer.render(scene,camera);
}

animate();
}

first_task(); */

//second task Create a sphere geometry and apply a moon surface texture on it.

/*function second_task(){
  
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);


const ambientLight = new THREE.AmbientLight(0xffffff, 2); // Intensity 2
scene.add(ambientLight);





const textureLoader = new THREE.TextureLoader();
let text = textureLoader.load('./moon.jpg');
text.colorSpace =  THREE.SRGBColorSpace;



const geometry = new THREE.SphereGeometry(2,32,64)
const material = new THREE.MeshPhysicalMaterial({map:text, side: THREE.DoubleSide,
});
const box = new THREE.Mesh(geometry,material);



scene.add(box)

camera.position.z = 5;

const canvas = document.querySelector("#canvas");

const renderer = new THREE.WebGLRenderer({canvas,antialias: true})
renderer.setSize(window.innerWidth,window.innerHeight)


const controls = new OrbitControls( camera, renderer.domElement );

const clock = new THREE.Clock();


function animate(){
  window.requestAnimationFrame(animate);
  box.rotation.y = clock.getElapsedTime() *0.5;
  controls.update();

  renderer.render(scene,camera);
}

animate();
}

second_task(); */

