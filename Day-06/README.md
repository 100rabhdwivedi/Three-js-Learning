# Three.js Example: 3D Text and Donuts

This project demonstrates how to use Three.js to create a 3D scene with text and donuts. The code uses the Three.js library to render 3D objects and text, along with textures, camera controls, and animation.

## File Breakdown:

### Importing Dependencies

```javascript
import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
```

- **THREE**: Imports the core Three.js library.
- **TextGeometry**: Imports the class used for creating 3D text geometries.
- **FontLoader**: Loads fonts for creating text in Three.js.
- **OrbitControls**: Adds mouse-based controls to navigate the scene (zoom, rotate, pan).

---

### Scene and Camera Setup

```javascript
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
```

- **scene**: Creates a new Three.js scene to hold all the objects, lights, and cameras.
- **camera**: Defines the camera properties. Here, a perspective camera is used with a field of view of 75, aspect ratio based on the window size, and near and far clipping planes set to 0.1 and 1000.

---

### Loading Textures

```javascript
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load("./matcap.jpg");

console.log(texture);
```

- **textureLoader**: Creates a loader to load textures (in this case, matcap.jpg).
- **texture**: Loads the matcap texture, which is a special type of texture that can give a 3D object a more interesting appearance without lighting.
- **console.log(texture)**: Logs the texture object to the console for debugging purposes.

---

### Loading and Creating 3D Text

```javascript
const loader = new FontLoader();

loader.load("./xyz.json", function (font) {
  const material = new THREE.MeshMatcapMaterial({ matcap: texture });
  const textLines = [
    "Dream in 3D",
    "Code with Saurabh",
    "Explore Three.js",
  ];
  let lineHeight = 2.5;
  textLines.forEach((line, index) => {
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
  });
});
```

- **FontLoader**: Loads a custom font from the file `xyz.json` (should be a JSON format font created from a tool like facetype.js).
- **load()**: Asynchronously loads the font file and uses a callback function once the font is ready.
- **MeshMatcapMaterial**: Creates a material using the loaded matcap texture.
- **textLines**: Defines an array of text lines to display.
- **forEach()**: Iterates over each line and creates a 3D text mesh for it.
- **TextGeometry**: Creates 3D geometry from the provided text line, using the loaded font.
- **geometry.center()**: Centers the geometry within the mesh.
- **position.y**: Vertically spaces the text lines.
- **text.scale.set(2, 2, 2)**: Scales up the text for better visibility.
- **scene.add(text)**: Adds the text mesh to the scene.

---

### Creating Donuts (Torus Geometries)

```javascript
const donutgeometry = new THREE.TorusGeometry(0.8, 0.4, 17, 45);
console.time("donuts");

for (let i = 0; i < 200; i++) {
  const donut = new THREE.Mesh(donutgeometry, material);
  
  donut.position.x = (Math.random() - 0.5) * 20;
  donut.position.y = (Math.random() - 0.5) * 20;
  donut.position.z = (Math.random() - 0.5) * 20;
  
  donut.rotation.x = Math.random() * Math.PI;
  donut.rotation.y = Math.random() * Math.PI;
  
  const scale = Math.random();
  donut.scale.set(scale, scale, scale);

  scene.add(donut);
}

console.timeEnd("donuts");
```

- **donutgeometry**: Defines the geometry for a torus (donut shape).
- **console.time("donuts")**: Starts a timer to measure the performance of donut creation.
- **for loop**: Creates 200 donuts and positions, scales, and rotates them randomly within a defined range.
- **position.x, y, z**: Randomly places each donut within a cube of size 20.
- **rotation.x, y**: Randomly rotates each donut.
- **scale.set()**: Randomly scales each donut between 0 and 1.
- **scene.add(donut)**: Adds the donut mesh to the scene.
- **console.timeEnd("donuts")**: Ends the timer and logs the time taken to create the donuts.

---

### Rendering the Scene and Animating the Camera

```javascript
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
```

- **camera.position.z = 15**: Moves the camera away from the origin so that the objects are visible.
- **canvas**: Gets the canvas element from the HTML to render the scene.
- **renderer.setSize()**: Sets the renderer size to match the window dimensions.
- **OrbitControls**: Initializes the orbit controls for camera interaction (rotate, zoom, pan).
- **animate()**: A function that repeatedly renders the scene and updates the controls for smooth interaction.
- **renderer.render(scene, camera)**: Renders the current scene from the camera's perspective.
- **window.requestAnimationFrame(animate)**: Continuously calls `animate()` to create an animation loop.
- **controls.update()**: Updates the camera's position and orientation based on user input.

---

## Output

- **3D Text**: The text "Dream in 3D", "Code with Saurabh", and "Explore Three.js" will appear, each on a separate line, with a glowing or shiny appearance, thanks to the matcap texture.
- **Donuts**: 200 randomly positioned and scaled donuts (tori) will populate the scene, each with random rotations. These donuts will be displayed within a 3D space, with the camera positioned to view them.