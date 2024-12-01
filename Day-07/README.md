# Haunted House Scene

This project showcases a spooky, interactive 3D Haunted House scene using **Three.js**, a JavaScript 3D library. The scene includes detailed models, animated ghosts, lighting effects, shadows, and user interaction via OrbitControls.

---

## Key Topics and Features

### 1. **Base Setup**
- **Scene:** A container for all objects, lights, and cameras.
- **Fog:** Added to enhance the eerie atmosphere. `new THREE.Fog("#262837", 0, 15)`.

### 2. **Model Loading**
- **GLTFLoader:** Used to load external `.glb` models, such as a tree. Example:
  ```javascript
  const Modelloader = new GLTFLoader();
  Modelloader.load('./tree.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(0.03, 0.04, 0.03);
      model.position.set(-3, 0, 4.5);
      scene.add(model);
  });
  ```

### 3. **Textures**
- **TextureLoader:** Loads textures for materials (e.g., door, bricks, grass).
- **Repeat and Wrapping:** Grass textures are repeated to cover the ground area using `THREE.RepeatWrapping`.
- Example of setting texture properties:
  ```javascript
  grassColorTexture.repeat.set(8, 8);
  grassColorTexture.wrapS = THREE.RepeatWrapping;
  grassColorTexture.wrapT = THREE.RepeatWrapping;
  ```

### 4. **Custom Text Geometry**
- **FontLoader and TextGeometry:** Used to create custom 3D text.
  ```javascript
  const loader = new FontLoader();
  loader.load('./font.json', (font) => {
      const geometry = new TextGeometry('Haunted House', {
          font: font,
          size: 1,
          depth: 0.2,
          bevelEnabled: true,
          bevelThickness: 0.02,
          bevelSize: 0.02,
      });
      const material = new THREE.MeshMatcapMaterial({ matcap: matcaptexture });
      const text = new THREE.Mesh(geometry, material);
      text.scale.set(0.3, 0.3, 0.3);
      text.position.set(-1, 2.8, 2);
      scene.add(text);
  });
  ```

### 5. **House Creation**
- **Walls:** BoxGeometry textured with bricks.
- **Roof:** ConeGeometry with a custom color.
- **Door:** PlaneGeometry with multiple textures (e.g., color, ambient occlusion, normal).
- **Bushes:** SphereGeometry scaled and positioned around the house.
- **Graves:** Randomly positioned using loops and trigonometric functions.

### 6. **Lighting**
- **Ambient Light:** Soft overall illumination.
- **Directional Light:** Simulating moonlight.
- **Point Lights:** For the door and moving ghosts.
  ```javascript
  const doorlight = new THREE.PointLight("#ff7d46", 1, 7);
  doorlight.position.set(0, 2.2, 2.7);
  house.add(doorlight);
  ```

### 7. **Shadows**
- Enabled shadow maps for realistic lighting.
- Configured shadow properties for lights and objects.
  ```javascript
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  ```

### 8. **Animation**
- **Clock:** Tracks elapsed time for smooth ghost animations.
- **Ghost Movement:** Circular motion using trigonometry.
  ```javascript
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 4;
  ghost1.position.z = Math.sin(ghost1Angle) * 4;
  ghost1.position.y = Math.sin(elapsedTime * 3);
  ```

### 9. **Interactivity**
- **OrbitControls:** Allows the user to rotate, pan, and zoom the scene interactively.
  ```javascript
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  ```

### 10. **Responsive Design**
- Adjusts canvas size and camera aspect ratio on window resize events.
  ```javascript
  window.addEventListener('resize', () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
  });
  ```

---

## How to Run the Project
1. Clone the repository and navigate to the project folder.
2. Install dependencies using `npm install`.
3. Run a local server using `npm run dev`.
4. Open the project in your browser.

---

## Future Enhancements
- Add more animated objects or ghosts.
- Include sound effects for a more immersive experience.
- Optimize for better performance on low-end devices.

## Output

### Screenshot of the Haunted House Scene:

![Haunted House](./output/image.png.)

> A spooky haunted house scene with interactive lighting, fog, and ghost animations. 🎃👻


