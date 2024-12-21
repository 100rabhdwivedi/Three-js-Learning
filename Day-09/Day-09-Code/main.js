import './style.css';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Scene and Camera setup
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

// Textures
const texture = new THREE.TextureLoader();
const earthtext = texture.load('/textures/earth/map.jpg');
const venus = texture.load('/textures/venus/map.jpg');
const csilla = texture.load('/textures/csilla/color.png');
const volcanic = texture.load('/textures/volcanic/color.png');

const maps = [csilla, earthtext, venus, volcanic];

// Planets
const radius = 1;
const segments = 64;
const spheres = new THREE.Group();
let planets = [];
let earth;
for (let i = 0; i < 4; i++) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    maps[i].colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: maps[i] });
    const mesh = new THREE.Mesh(geometry, material);
    const angle = (Math.PI * i) / 2;
    mesh.position.x = 7.2 * Math.cos(angle);
    mesh.position.z = 7.2 * Math.sin(angle);

    planets.push(mesh);
    spheres.add(mesh);
}
scene.add(spheres);
earth = planets[1];

camera.position.z = 9;
camera.position.y = 1.2;

// Render
const canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// Responsive
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (window.innerWidth < 768) {
        // For smaller screens
        camera.position.z = 12; // Move the camera further away
    } else if (window.innerWidth < 1200) {
        // For medium screens
        camera.position.z = 10; // Set a moderate distance
    } else {
        // For larger screens
        camera.position.z = 9; // Default position
    }
});

let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    modelAnimate(scrollY);
});

function modelAnimate(scrollY) {
    const newSection = Math.round(scrollY / window.innerHeight);

    if (newSection !== currentSection) {
        currentSection = newSection;

        if (currentSection === 0) {
            // Default positions and visibility
            planets.forEach((planet, index) => {
                gsap.to(planet.position, {
                    x: 7.2 * Math.cos((Math.PI * index) / 2),
                    z: 7.2 * Math.sin((Math.PI * index) / 2),
                    y: 0,
                    duration: 1.2, // Increased duration
                    ease: 'power3.inOut',
                });
                gsap.to(planet.scale, {
                    x: 1,
                    y: 1,
                    z: 1,
                    duration: 1.2,
                    ease: 'power3.inOut',
                });
                planet.visible = true;
            });
        } else if (currentSection === 1) {
            // Animate Earth and hide others
            gsap.to(earth.position, {
                x: 1,
                y: 1,
                z: 5,
                duration: 1.2, // Increased duration
                ease: 'expo.inOut', // Smoother easing
            });
            gsap.to(earth.scale, {
                x: 1,
                y: 1,
                z: 1,
                duration: 1.2,
                ease: 'expo.inOut',
            });
            planets.forEach((planet, index) => {
                if (index !== 1) {
                    gsap.to(planet, {
                        duration: 0.8,
                        opacity: 0,
                        ease: 'power2.inOut',
                        onComplete: () => (planet.visible = false),
                    });
                }
            });
        } else if (currentSection === 2) {
            // Animate Earth and hide others
            gsap.to(earth.position, {
                x: 0,
                y: 1,
                z: 6,
                duration: 1.2, // Increased duration
                ease: 'expo.inOut',
            });
            gsap.to(earth.scale, {
                x: 2,
                y: 2,
                z: 2,
                duration: 1.2,
                ease: 'expo.inOut',
            });
           
           
            planets.forEach((planet, index) => {
                if (index !== 1) {
                    gsap.to(planet, {
                        duration: 0.6,
                        opacity: 0,
                        ease: 'power2.inOut',
                        onComplete: () => (planet.visible = false),
                    });
                }
                   
            });
        }
    }
}

// Animate
const clock = new THREE.Clock();
let previous  = 0;
function animate() {

    window.requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    const deltaTime =elapsedTime - previous;
    previous = elapsedTime;
    planets.forEach((planet, index) => {
        planet.rotation.y += deltaTime *0.2;
       
    })
    renderer.render(scene, camera);
}
animate();
