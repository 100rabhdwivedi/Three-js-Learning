import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {  TextureLoader } from 'three/webgpu';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const rgbeLoader = new RGBELoader();
    rgbeLoader.load('https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/dry_orchard_meadow_1k.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;

     
    });

    let model;
const loader = new GLTFLoader();
loader.load('./play.glb',(gltf)=>{
    model = gltf.scene;
    model.scale.set(0.3, 0.3, 0.4);
    model.position.y = -4.4;
    model.position.z = -3;
    model.rotation.y = -1.5;
    scene.add(model);   
})

const loader1 = new GLTFLoader();

loader1.load('./sofa_chair.glb',(gltf)=>{
   let model1 = gltf.scene;
    model1.scale.set(1.7, 1.7, 1.7);
    model1.position.y = -4.4;
    model1.position.z = 5;
    model1.position.x = -5;
    model1.rotation.y = 2.5;
    scene.add(model1);   
})

const loader2= new GLTFLoader();

loader2.load('./flower_model.glb',(gltf)=>{
   let model2 = gltf.scene;
    model2.scale.set(1, 1.5, 1);
    model2.position.y = -5;
    model2.position.z = 4;
    model2.position.x = 6;
    scene.add(model2);   
})

const loader4= new GLTFLoader();

loader4.load('./light.glb',(gltf)=>{
   let model4 = gltf.scene;
    model4.scale.set(2, 2, 2);
    model4.position.y = 4.8;
    model4.rotation.y = Math.PI / 2;
    scene.add(model4);   
})


const textureLoader = new TextureLoader();
const textfloor = textureLoader.load('./floor.jpg');
textfloor.colorSpace = THREE.SRGBColorSpace;

const leftwalltext1 = textureLoader.load('https://images.unsplash.com/photo-1568660909946-da33cdc5e39d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
leftwalltext1.colorSpace = THREE.SRGBColorSpace;

const rightwalltext1 = textureLoader.load('./rightwall.png');
rightwalltext1.colorSpace = THREE.SRGBColorSpace;

const backwalltext = textureLoader.load('./backwall.jpg');
backwalltext.colorSpace = THREE.SRGBColorSpace;



const video = document.createElement('video');
video.src = './video.mp4'; // Replace with your video file
video.loop = true;
video.muted = false; // Optional: Mute video





const videoTexture = new THREE.VideoTexture(video);

const floorGeometry = new THREE.PlaneGeometry(15,20,20,20);
const floorMaterial = new THREE.MeshBasicMaterial({map:textfloor,side:THREE.DoubleSide});
const floor = new THREE.Mesh(floorGeometry,floorMaterial);

floor.rotation.x = -Math.PI /2  ;
floor.position.y = -5;
floorGeometry.center();
scene.add(floor);

const roofGeometry = new THREE.PlaneGeometry(15,20,20,20);
const roofMaterial = new THREE.MeshBasicMaterial({color:"#fefae2",side:THREE.DoubleSide});
const roof = new THREE.Mesh(roofGeometry,roofMaterial);

roof.rotation.x = -Math.PI /2  ;
roof.position.y = 5;
roofGeometry.center();
scene.add(roof);

const leftWallGeometry = new THREE.PlaneGeometry(20,10,20,20);
const leftWallMaterial = new THREE.MeshBasicMaterial({map:leftwalltext1,side:THREE.DoubleSide});
const leftWall = new THREE.Mesh(leftWallGeometry,leftWallMaterial);
leftWall.rotation.y = Math.PI /2  ;
leftWall.position.x = -7.5;
leftWallGeometry.center();

scene.add(leftWall);

const rightWallGeometry = new THREE.PlaneGeometry(20,10,20,20);
const rightWallMaterial = new THREE.MeshBasicMaterial({map:rightwalltext1,side:THREE.DoubleSide});
const rightWall = new THREE.Mesh(rightWallGeometry,rightWallMaterial);
rightWall.rotation.y = -Math.PI /2  ;
rightWall.position.x = 7.5;
rightWallGeometry.center();

scene.add(rightWall);

const backWallGeometry = new THREE.PlaneGeometry(15,10,20,20);
const backWallMaterial = new THREE.MeshBasicMaterial({map:backwalltext,side:THREE.DoubleSide});
const backWall = new THREE.Mesh(backWallGeometry,backWallMaterial);
// backWall.rotation.z = -Math.PI /2 + 0.1 ;
backWall.position.z = -10;
scene.add(backWall);

const tvGeometry = new THREE.PlaneGeometry(6.2,3.7,20,20);
const tvMaterial = new THREE.MeshBasicMaterial({map:videoTexture,side:THREE.DoubleSide});
const tv = new THREE.Mesh(tvGeometry,tvMaterial);
// tv.rotation.z = -Math.PI /2 + 0.1 ;
tv.position.z = -9.8;
tv.position.y = -0.65;
tv.position.x = -0.12;

scene.add(tv);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

// Variable to track video play state
let isPlaying = false;

window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  
    raycaster.setFromCamera(mouse, camera);
  
    const intersects = raycaster.intersectObject(tv);
  
    if (intersects.length > 0) {
        if (isPlaying) {
            video.pause();
        } else {
            video.play();
        }
        isPlaying = !isPlaying; 
    }
});
let mouseMove = {
    x:0,
}

window.addEventListener('mousemove',(e)=>{
    mouseMove.x =  (e.clientX / window.innerWidth);
    model.rotation.y = mouseMove.x * Math.PI *4;

})


camera.position.z = 12;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({canvas,antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );


const controls = new OrbitControls( camera, renderer.domElement );

function animate() {
    
    renderer.render( scene, camera );
    controls.update();
}
renderer.setAnimationLoop( animate );