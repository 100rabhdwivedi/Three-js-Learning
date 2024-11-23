# 3D Room with Interactive Video and Mouse Movement

This project is a 3D virtual room built using **Three.js**, featuring interactive elements like a video-playing TV, textured walls, and mouse-responsive 3D model rotation.

---

## Project Highlights

1. **Realistic 3D Room**:
   - Textured walls, ceiling, and floor using custom textures.
   - Loaded 3D models such as a sofa, flower pot, and light using GLTFLoader.

2. **Interactive Video Screen**:
   - A TV screen displays a video texture.
   - Clicking toggles the video playback between play and pause.

3. **Mouse-Based Interaction**:
   - The 3D model dynamically rotates based on mouse movements, enhancing interactivity.

4. **Realistic Lighting**:
   - HDRI environment map for lighting and reflections using **RGBELoader**.

---

## Day-Wise Learning Process

### **Day 1: Basic 3D Graphics**
- Set up the Three.js scene, camera, and renderer.
- Added basic geometries for floor, walls, and ceiling.
- Applied custom textures using **TextureLoader**.

### **Day 2: Loading 3D Models**
- Integrated GLTF models (`sofa_chair.glb`, `flower_model.glb`, etc.) using **GLTFLoader**.
- Positioned, scaled, and rotated the models to fit into the room layout.
- Added a TV model with a video texture using **VideoTexture**.

### **Day 3: HDRI Lighting**
- Used **RGBELoader** to load an HDRI map.
- Applied the HDRI as the environment map for realistic reflections and lighting.

### **Day 4: Mouse Movement and Interactivity**
- Implemented mouse movement to rotate a 3D model using `mousemove` events.
- Added raycasting to detect clicks on the TV and toggle video playback.

---

## How It Works

### **Interactive TV**
Clicking on the TV toggles the video between play and pause using **Raycaster**:

```javascript
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


 Output Preview
A realistic 3D room with:
Interactive 3D models.
Dynamic lighting effects.
A clickable TV that plays or pauses a video.
Mouse movement controls the rotation of a model inside the scene.


Technologies Used
Three.js for creating the 3D environment.
GLTFLoader for importing 3D models.
RGBELoader for environment lighting.
Raycaster for interactive click handling.
VideoTexture for rendering videos on 3D objects.