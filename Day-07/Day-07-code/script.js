import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
/**
 * Base
 */


// Scene
const scene = new THREE.Scene()

//fog

const fog = new THREE.Fog("#262837",0,15);
scene.fog = fog;

/*
modelLoade
*/

const Modelloader = new GLTFLoader();
Modelloader.load('./tree.glb',(gltf)=>{
    const model = gltf.scene;
    model.scale.set(0.03,0.04,0.03);
    model.position.set(-3,0,4.5)
    scene.add(model)
})


/**
 * Textures
 */


const textureLoader = new THREE.TextureLoader()
const matcaptexture = textureLoader.load('/matcap.jpg');

const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');



const bricksColorTexture = textureLoader.load('/textures/bricks/color.jpg');
const bricksAmbientOcclusionTexture = textureLoader.load('/textures/bricks/ambientOcclusion.jpg');
const bricksNormalTexture = textureLoader.load('/textures/bricks/normal.jpg');
const bricksRoughnessTexture = textureLoader.load('/textures/bricks/roughness.jpg');

const grassColorTexture = textureLoader.load('/textures/grass/color.jpg');
const grassAmbientOcclusionTexture = textureLoader.load('/textures/grass/ambientOcclusion.jpg');
const grassNormalTexture = textureLoader.load('/textures/grass/normal.jpg');
const grassRoughnessTexture = textureLoader.load('/textures/grass/roughness.jpg');

grassColorTexture.repeat.set(8,8);
grassAmbientOcclusionTexture.repeat.set(8,8);
grassNormalTexture.repeat.set(8,8);
grassRoughnessTexture.repeat.set(8,8);

grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

/*
fontLoader
*/

const loader = new FontLoader();

loader.load( '/font.json', function ( font ) {

	const geometry = new TextGeometry( 'Haunted House', {
		font: font,
		size: 1,
      depth: 0.2,
      curveSegments: 6,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 3,
	} );

    const material = new THREE.MeshMatcapMaterial({matcap:matcaptexture});
    const text = new THREE.Mesh(geometry,material);
    text.position.y = 2.8;
    text.position.x = -1;
    text.position.z = 2;


    text.scale.set(0.3, 0.3, 0.3);

    scene.add(text);
} );



/**
 * 
 * House
 */
const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4,2.5,4),
    new THREE.MeshStandardMaterial({
        map:bricksColorTexture,
        aoMap:bricksAmbientOcclusionTexture,
        normalMap:bricksNormalTexture,
        roughnessMap:bricksRoughnessTexture
    })
)
walls.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array,2)
)
walls.position.y = 1.25;
house.add(walls)


const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5,1,4),
    new THREE.MeshStandardMaterial({color:"#b35f45"})
)
roof.position.y = 3;
roof.rotation.y = Math.PI /4;
house.add(roof)


const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2,2.2,100,100),
    new THREE.MeshStandardMaterial({
        map:doorColorTexture,
        transparent:true,
        alphaMap:doorAlphaTexture,
        aoMap:doorAmbientOcclusionTexture,
        displacementMap:doorHeightTexture,
        displacementScale:0.1,
        normalMap:doorNormalTexture,
        roughnessMap:doorRoughnessTexture,
        metalnessMap:doorMetalnessTexture,
    })
)
door.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array,2)
)
door.position.z = 2+0.01;
door.position.y = 1;

house.add(door)

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ 
        map:grassColorTexture,
        aoMap:grassAmbientOcclusionTexture,
        normalMap:grassNormalTexture,
        roughnessMap:grassRoughnessTexture
    })
)
floor.geometry.setAttribute('uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array,2)
)
floor.rotation.x = - Math.PI /2
floor.position.y = 0
scene.add(floor)

const bushGeometry = new THREE.SphereGeometry(1,16,16);
const bushMaterial = new THREE.MeshStandardMaterial({color : "#89c854"});

const bush1 = new THREE.Mesh(bushGeometry,bushMaterial);
bush1.scale.set(0.5,0.5,0.5);
bush1.position.set(0.8,0.2,2.2);

const bush2 = new THREE.Mesh(bushGeometry,bushMaterial);
bush2.scale.set(0.25,0.25,0.25);
bush2.position.set(1.5,0.1,2.1);

const bush3 = new THREE.Mesh(bushGeometry,bushMaterial);
bush3.scale.set(0.4,0.4,0.4);
bush3.position.set(-0.8,0.1,2.1);

const bush4 = new THREE.Mesh(bushGeometry,bushMaterial);
bush4.scale.set(0.15,0.15,0.15);
bush4.position.set(-1,0.05,2.6);

house.add(bush1,bush2,bush3,bush4);

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6,0.8,0.2);
const graveMaterial = new THREE.MeshStandardMaterial({color:"#b2b6b1"});

for(let i=0;i<50;i++){
    const angle = Math.random() * Math.PI *2;
    const radius = 3 + Math.random() *6;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    


    const grave = new THREE.Mesh(graveGeometry,graveMaterial);
    grave.position.set(x,0.3,z);
    grave.rotation.y  = (Math.random() - 0.5) * 0.4;
    grave.rotation.z  = (Math.random() - 0.5) * 0.4;
    grave.castShadow = true;
    graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
moonLight.position.set(4, 5, - 2)

scene.add(moonLight)

const doorlight = new THREE.PointLight("#ff7d46",1,7)
doorlight.position.set(0,2.2,2.7);
house.add(doorlight)

const ghost1 = new THREE.PointLight("#ff00ff",2,3);
scene.add(ghost1);

const ghost2 = new THREE.PointLight("#00ffff",2,3);
scene.add(ghost2);

const ghost3 = new THREE.PointLight("#ffff00",2,3);
scene.add(ghost3);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)



/**
 * Renderer
 */
const canvas = document.querySelector('canvas')

const renderer = new THREE.WebGLRenderer({
    canvas,antialias:true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#262837");


/*
 shadows
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type =  THREE.PCFSoftShadowMap;

moonLight.castShadow = true;
doorlight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true;
bush1.castShadow = true;
bush2.castShadow = true;
bush3.castShadow = true;
bush4.castShadow = true;

floor.receiveShadow = true;


moonLight.shadow.mapSize.width = 256;
moonLight.shadow.mapSize.height = 256;
moonLight.shadow.camera.far = 14;

doorlight.shadow.mapSize.width = 256;
doorlight.shadow.mapSize.height = 256;
doorlight.shadow.camera.far = 7;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 7;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 7;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 7;


// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Animate
 */
const clock = new THREE.Clock()

const animate = () =>
{
    const elapsedTime = clock.getElapsedTime()

    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle)*4;
    ghost1.position.z = Math.sin(ghost1Angle)*4;
    ghost1.position.y = Math.sin(elapsedTime*3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle)*5;
    ghost2.position.z = Math.sin(ghost2Angle)*5;
    ghost2.position.y = Math.sin(elapsedTime*4)+Math.sin(elapsedTime*2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) *(7+Math.sin(elapsedTime*0.32))
    ghost3.position.z = Math.sin(ghost3Angle) *(7+Math.sin(elapsedTime*0.5))
    ghost3.position.y = Math.sin(elapsedTime*4)+Math.sin(elapsedTime*2.5);
    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()