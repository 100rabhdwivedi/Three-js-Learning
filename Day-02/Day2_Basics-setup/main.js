import * as THREE from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);

const geometry = new THREE.BoxGeometry(1,1,1)
const material = new THREE.MeshBasicMaterial({color:"orange",wireframe:true})

const cube = new THREE.Mesh(geometry,material);

scene.add(cube);

camera.position.z = 5;

const canvas = document.querySelector("#canvas")

const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(window.innerWidth,window.innerHeight)

function animate(){
    window.requestAnimationFrame(animate)
    cube.rotation.y += 0.05
    renderer.render(scene,camera)
}

animate()