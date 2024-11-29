import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./matcap.jpg");

console.log(texture);

const loader = new FontLoader();

loader.load("./xyz.json", function (font) {
  const material = new THREE.MeshMatcapMaterial({ matcap: texture });
  const textLines = [
    "Dream in 3D",
    "Code with Saurabh",
    "Explore Three.js",
  ];
  let lineHeight = 2.5;
  textLines.forEach((line,index)=>{

  const geometry = new TextGeometry(line, {
    font: font,
    size: 1,
    depth: 0.2,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  geometry.center();
  const text = new THREE.Mesh(geometry, material);
  text.position.y = -index * lineHeight;
  text.scale.set(2, 2, 2);
  scene.add(text);
})
  const donutgeometry = new THREE.TorusGeometry(0.8, 0.4, 17, 45);


	console.time("donuts")


  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutgeometry, material);
	
	donut.position.x = (Math.random() - 0.5) * 20;
	donut.position.y = (Math.random() - 0.5) * 20;
	donut.position.z = (Math.random() - 0.5) * 20;
	
	
	donut.rotation.x = Math.random() * Math.PI;
	donut.rotation.y = Math.random() * Math.PI;
	
	const scale = Math.random();

	donut.scale.set(scale,scale,scale);



    scene.add(donut);
  }
	console.timeEnd("donuts")

});



camera.position.z = 15;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {

  
  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
  controls.update();
}

animate();
