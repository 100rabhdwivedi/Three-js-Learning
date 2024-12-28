import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Initial camera position
camera.position.z = calculateCameraZ(window.innerWidth);

// Light setup
const light = new THREE.AmbientLight("white", 1); // soft white light
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Load GLTF model
const loader = new GLTFLoader();

let model;
loader.load('/3dModel/speaker.glb', (gltf) => {
  model = gltf.scene;
  model.scale.set(20, 20, 20);
  model.rotation.y = -1.3;
  model.position.x = 2;

  scene.add(model);
  setScrollAnimation();
}, undefined, (error) => {
  console.error(error);
});

// Renderer setup
const canvas = document.querySelector('#canvas');
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Adjust the camera's z position based on screen size
  camera.position.z = calculateCameraZ(window.innerWidth);
});

// Function to calculate camera z position based on screen width
function calculateCameraZ(width) {
  if (width < 768) {  // For mobile screens
    return 10;
  } else if (width < 1024) {  // For tablet screens
    return 6;
  } else {  // For desktop screens
    return 5;
  }
}

// Object scroll animation setup
function setScrollAnimation() {
  // First section animation
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-2',
      start: 'top 90%',
      end: 'top 10%',
      scrub: 2,
    },
  });

  tl.to(model.position, {
    x: -0.5,
    z: -1.5,
    ease: 'power4.out',
  })
    .to(
      model.rotation,
      {
        y: 1,
        x: 0.5,
        ease: 'power4.out',
      },
      '<'
    );

  // Second section animation
  const tl2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.section-3',
      start: 'top 90%',
      end: 'top 0%',
      scrub: 2,
    },
  });

  tl2.to(
    model.position,
    {
      x: 0,
      z: 1.5,
      y: 1,
      ease: 'power4.out',
    },
    'b'
  ).to(
    model.rotation,
    { 
      x: 2,
      y: Math.PI * 2,
      ease: 'power4.out',
    },
    'b'
  );

  // Change body background color/gradient during scroll
  gsap.to('body', {
    background: '#0e0f0d', // Background color change on scroll
    scrollTrigger: {
      trigger: '.section-3',
      start: 'top 90%',
      end: 'top 10%',
      scrub: 2,
    },
  });

  // Change nav text color during scroll
  gsap.to('.nav', {
    color: '#6d6d6d', // Text color change on scroll
    scrollTrigger: {
      trigger: '.section-3',
      start: 'top 90%',
      end: 'top 10%',
      scrub: 2,
    },
  });

  // Optional: You can also change specific nav items by targeting them, for example:
  gsap.to('.navbtn', {
    color: '#6d6d6d',
    background:"none",
    scrollTrigger: {
      trigger: '.section-3',
      start: 'top 90%',
      end: 'top 10%',
      scrub: 2,
    },
  });
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
}
animate();
