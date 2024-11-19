import * as THREE from "three";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const textureLoader = new THREE.TextureLoader();
const text = textureLoader.load('./concrete_tiles.webp');


const rgbeLoader = new RGBELoader();
rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr', (texture) => {
    texture.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = texture; 
    scene.background = texture;
});



const floorgeometry = new THREE.PlaneGeometry(10, 10, 30, 30);
const floormaterial = new THREE.MeshBasicMaterial({
  map:text,
  metalness: 0.2,
  roughness: 0.2,
  side: THREE.DoubleSide,
 
});
const floor = new THREE.Mesh(floorgeometry, floormaterial);
floor.rotation.x = -Math.PI / 2 + 0.2;
scene.add(floor);


const metallicgeometry = new THREE.SphereGeometry(1, 64, 64);
const metallicmaterial = new THREE.MeshBasicMaterial({
  metalness: 0,
  roughness: 0,
  transparent:true,
  opacity:0.7,
});
const metallicSphere = new THREE.Mesh(metallicgeometry, metallicmaterial);
metallicSphere.position.set(-3, 1.2, 0);
scene.add(metallicSphere);



const roughMetalMaterial = new THREE.MeshStandardMaterial({
  metalness: 1,
  roughness: 0.5,
});
const roughSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  roughMetalMaterial
);
roughSphere.position.set(0, 1.2, 0);
scene.add(roughSphere);



const glassMaterial = new THREE.MeshPhysicalMaterial({
  metalness: 0,
  roughness: 0,
  transparency: true,
  opacity: 0.6,
  ior: 1.5,
});
const glassSphere = new THREE.Mesh(
  new THREE.SphereGeometry(1, 64, 64),
  glassMaterial
);
glassSphere.position.set(3, 1.2, 0);
scene.add(glassSphere);

camera.position.z = 9;

const canvas = document.querySelector("#canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls( camera, renderer.domElement );
function animate() {
  window.requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}

animate();
