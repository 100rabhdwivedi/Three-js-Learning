import * as THREE from 'three';
import gsap from "gsap";
//Scene setup
const scene = new THREE.Scene();

//camera setup
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
const camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Textures
const textureLoader =new  THREE.TextureLoader();
const gradientTexture = textureLoader.load("/textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

//Material
const material = new THREE.MeshToonMaterial({color:"#ffeded",
	gradientMap:gradientTexture
})


//meshes
const objectDistance = 4;
const mesh1 = new THREE.Mesh(
	new THREE.TorusGeometry(1,0.4,16,60),
	material
)

const mesh2 = new THREE.Mesh(
	new THREE.ConeGeometry(1,2,32),
	material
)

const mesh3 = new THREE.Mesh(
	new THREE.TorusKnotGeometry(0.8,0.35,100,16),
	material
)

mesh1.position.y = -objectDistance * 0;
mesh2.position.y =- objectDistance * 1;
mesh3.position.y =- objectDistance * 2;

mesh1.position.x = 2;
mesh2.position.x = -2;
mesh3.position.x = 2;

scene.add(mesh1,mesh2,mesh3);

//Array that contains all the Meshes
const sectionMeshes = [mesh1,mesh2,mesh3];

//Light to see the object properly
const directionalLight = new THREE.DirectionalLight( '#ffffff', 1 );
directionalLight.position.set(1,1,0);
scene.add( directionalLight );

camera.position.z = 6;
cameraGroup.add(camera);

//Renderer the object
const canvas = document.querySelector("canvas")
const renderer = new THREE.WebGLRenderer({canvas,alpha:true,antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );

//Resize the scene
window.addEventListener("resize",()=>{
	camera.aspect = window.innerWidth/window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth,window.innerHeight);
})

//Scroll Event
let scrollY = window.scrollY;
let currentSection = 0;
window.addEventListener("scroll",()=>{
	scrollY = window.scrollY;
	const newSection = Math.round(scrollY/window.innerHeight);
	
	if(currentSection !=newSection){
		currentSection = newSection;

		gsap.to(
			sectionMeshes[currentSection].rotation,{
				duration:1.5,
				ease:"power2.inOut",
				x:'+=6',
				y:'+=3',
				z:'+=1.5'
			}
		)
	}
})

//Mousemove Event for parallax 
let cursor = new THREE.Vector2();
window.addEventListener("mousemove",(e)=>{
	cursor.x = (e.clientX / window.innerHeight) - 0.5;
	cursor.y = (e.clientY / window.innerWidth) - 0.5;
	
})


//Clock fo Time
const clock = new THREE.Clock();
let previousTime = 0;
//Animate function
function animate() {
	const elapsedTime = clock.getElapsedTime();
	const deltaTime = elapsedTime - previousTime;
	previousTime = elapsedTime;
	//Animate Camera 
	camera.position.y = - (scrollY / window.innerHeight) * objectDistance;

	let parallaxX = cursor.x * 0.5;
	let parallaxY = - cursor.y * 0.5;

	cameraGroup.position.x += (parallaxX - cameraGroup.position.x)*5* deltaTime;
	cameraGroup.position.y += (parallaxY - cameraGroup.position.y)*5* deltaTime;



	//Animate meshes
	for(const mesh of sectionMeshes){
		mesh.rotation.x += deltaTime * 0.1;
		mesh.rotation.y += deltaTime * 0.12;

	}

	window.requestAnimationFrame(animate);
	renderer.render( scene, camera );
	
}

animate();